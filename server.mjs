import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const maximumBodyBytes = 8 * 1024 * 1024;
const maximumImageCharacters = 6 * 1024 * 1024;
const maximumMessages = 20;
const maximumMessageCharacters = 10_000;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maximumBodyBytes) throw new HttpError(413, 'Request body is too large');
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, 'Request body must be valid JSON');
  }
}

function validateChatRequest(body) {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new HttpError(400, 'Request body must be an object');
  }
  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > maximumMessages) {
    throw new HttpError(400, `messages must contain between 1 and ${maximumMessages} items`);
  }
  if (typeof body.stream !== 'boolean') {
    throw new HttpError(400, 'stream must be a boolean');
  }
  if ('format' in body && (typeof body.format !== 'object' || body.format === null || Array.isArray(body.format))) {
    throw new HttpError(400, 'format must be a JSON schema object');
  }

  let totalCharacters = 0;
  for (const message of body.messages) {
    if (
      typeof message !== 'object' ||
      message === null ||
      !['system', 'user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.length > maximumMessageCharacters
    ) {
      throw new HttpError(400, 'Each message must have a supported role and content under 10,000 characters');
    }
    totalCharacters += message.content.length;
    if (totalCharacters > maximumMessages * maximumMessageCharacters) {
      throw new HttpError(400, 'Combined message content is too large');
    }

    if (message.images !== undefined) {
      if (message.role !== 'user' || !Array.isArray(message.images) || message.images.length > 1) {
        throw new HttpError(400, 'Images are allowed only on a user message, with at most one image');
      }
      for (const image of message.images) {
        if (
          typeof image !== 'string' ||
          image.length > maximumImageCharacters ||
          !/^[A-Za-z0-9+/]+={0,2}$/.test(image)
        ) {
          throw new HttpError(400, 'Image data must be valid base64 under 6 MB');
        }
      }
    }
  }

  return {
    stream: body.stream,
    keep_alive: '30m',
    options: { temperature: body.format ? 0.3 : 0.5 },
    ...(body.format ? { format: body.format } : {}),
    messages: body.messages,
  };
}

function isLocalDevelopmentOrigin(origin) {
  try {
    const hostname = new URL(origin).hostname;
    return ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
  } catch {
    return false;
  }
}

function checkOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return;
  const requestHost = request.headers.host;
  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new HttpError(403, 'Request origin is not allowed');
  }
  if (originHost !== requestHost && !isLocalDevelopmentOrigin(origin)) {
    throw new HttpError(403, 'Request origin is not allowed');
  }
}

function contentType(path) {
  const types = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
  };
  return types[extname(path)] ?? 'application/octet-stream';
}

function serveStaticFile(request, response, staticRoot) {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const requestedPath = pathname === '/' ? '/index.html' : decodeURIComponent(pathname);
  const filePath = resolve(staticRoot, `.${requestedPath}`);
  if (filePath !== staticRoot && !filePath.startsWith(`${staticRoot}${sep}`)) {
    sendJson(response, 403, { error: 'Path is not allowed' });
    return;
  }

  const resolvedPath = existsSync(filePath) && statSync(filePath).isFile()
    ? filePath
    : resolve(staticRoot, 'index.html');
  if (!existsSync(resolvedPath)) {
    sendJson(response, 404, { error: 'Built application not found; run npm run build first' });
    return;
  }

  response.writeHead(200, {
    'Content-Type': contentType(resolvedPath),
    'Cache-Control': resolvedPath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  createReadStream(resolvedPath).pipe(response);
}

export function createBackendServer({
  fetchImpl = fetch,
  ollamaBaseUrl = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434',
  model = process.env.GEMMA_MODEL ?? 'gemma3:4b',
  serveStatic = false,
  staticRoot = resolve(projectRoot, 'dist'),
} = {}) {
  const baseUrl = ollamaBaseUrl.replace(/\/+$/, '');

  return createHttpServer(async (request, response) => {
    let pathname;
    try {
      pathname = new URL(request.url, 'http://localhost').pathname;
      if (pathname === '/api/gemma/status' && request.method === 'GET') {
        try {
          const tagsResponse = await fetchImpl(`${baseUrl}/api/tags`, {
            signal: AbortSignal.timeout(2500),
          });
          if (!tagsResponse.ok) {
            sendJson(response, 200, { available: false });
            return;
          }
          const tags = await tagsResponse.json();
          const available = Array.isArray(tags.models) && tags.models.some(
            (item) => item && (item.name === model || item.model === model),
          );
          sendJson(response, 200, { available, model });
        } catch {
          sendJson(response, 200, { available: false });
        }
        return;
      }

      if (pathname === '/api/gemma/chat' && request.method === 'POST') {
        checkOrigin(request);
        const body = await readJsonBody(request);
        const payload = validateChatRequest(body);
        payload.model = model;

        const controller = new AbortController();
        request.on('aborted', () => controller.abort());
        response.on('close', () => {
          if (!response.writableEnded) controller.abort();
        });

        let upstream;
        try {
          upstream = await fetchImpl(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
        } catch (error) {
          if (controller.signal.aborted) return;
          const message = error instanceof Error ? error.message : 'Could not connect to Ollama';
          sendJson(response, 502, { error: `Gemma backend unavailable: ${message}` });
          return;
        }

        if (!upstream.ok) {
          const detail = (await upstream.text()).slice(0, 500);
          sendJson(response, 502, {
            error: detail || `Gemma request failed (${upstream.status})`,
          });
          return;
        }
        if (!upstream.body) {
          sendJson(response, 502, { error: 'Gemma returned an empty response' });
          return;
        }

        response.writeHead(200, {
          'Content-Type': body.stream ? 'application/x-ndjson' : 'application/json',
          'Cache-Control': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
        });
        for await (const chunk of upstream.body) {
          if (!response.write(chunk)) {
            await new Promise((resolveDrain) => {
              response.once('drain', resolveDrain);
              response.once('close', resolveDrain);
            });
          }
        }
        response.end();
        return;
      }

      if (pathname.startsWith('/api/')) {
        sendJson(response, 404, { error: 'API route not found' });
        return;
      }

      if (serveStatic && request.method === 'GET') {
        serveStaticFile(request, response, staticRoot);
        return;
      }
      sendJson(response, 404, { error: 'Route not found' });
    } catch (error) {
      if (response.headersSent) {
        response.destroy(error instanceof Error ? error : undefined);
        return;
      }
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof Error ? error.message : 'Unexpected backend error';
      sendJson(response, status, { error: message });
    }
  });
}

async function start() {
  const production = process.argv.includes('--production');
  const server = createBackendServer({ serveStatic: production });
  const port = Number(process.env.PORT ?? 3001);
  const host = process.env.HOST ?? '127.0.0.1';
  server.listen(port, host, () => {
    process.stdout.write(`WonderLens backend listening at http://${host}:${port}\n`);
  });
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => server.close(() => process.exit(0)));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  start();
}
