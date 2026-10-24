import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createBackendServer } from './server.mjs';

async function withServer(options, run) {
  const server = createBackendServer(options);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

test('Gemma status checks whether the configured model is installed', async () => {
  await withServer({
    model: 'gemma3:4b',
    fetchImpl: async () => new Response(JSON.stringify({
      models: [{ name: 'gemma3:4b' }],
    })),
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/status`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { available: true, model: 'gemma3:4b' });
  });
});

test('Gemma status reports an uninstalled model as unavailable', async () => {
  await withServer({
    model: 'gemma3:4b',
    fetchImpl: async () => new Response(JSON.stringify({ models: [{ name: 'llama3' }] })),
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/status`);
    assert.deepEqual(await response.json(), { available: false, model: 'gemma3:4b' });
  });
});

test('chat validates uploaded images before forwarding the request', async () => {
  let forwarded = false;
  await withServer({
    fetchImpl: async () => {
      forwarded = true;
      return new Response('{}');
    },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'assistant', content: 'Look at this', images: ['aW1hZ2U='] }],
        stream: false,
      }),
    });
    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /Images are allowed only on a user message/);
    assert.equal(forwarded, false);
  });
});

test('chat forwards the server-configured model to Ollama', async () => {
  let forwardedPayload;
  await withServer({
    model: 'gemma3:4b',
    fetchImpl: async (_url, options) => {
      forwardedPayload = JSON.parse(options.body);
      return new Response('{"message":{"content":"Hello"},"done":true}\n', {
        headers: { 'Content-Type': 'application/x-ndjson' },
      });
    },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello Gemma' }],
        stream: true,
      }),
    });
    assert.equal(response.status, 200);
    assert.match(await response.text(), /"content":"Hello"/);
    assert.equal(forwardedPayload.model, 'gemma3:4b');
    assert.equal(forwardedPayload.messages[0].content, 'Hello Gemma');
    assert.equal(forwardedPayload.stream, true);
  });
});

test('chat forwards image data and a schema for vision scans', async () => {
  let forwardedPayload;
  const format = {
    type: 'object',
    properties: { subject: { type: 'string' } },
    required: ['subject'],
  };
  await withServer({
    model: 'gemma3:4b',
    fetchImpl: async (_url, options) => {
      forwardedPayload = JSON.parse(options.body);
      return new Response(JSON.stringify({ message: { content: '{"subject":"leaf"}' } }));
    },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Describe this', images: ['aGVsbG8='] }],
        stream: false,
        format,
      }),
    });
    assert.equal(response.status, 200);
    assert.equal(forwardedPayload.messages[0].images[0], 'aGVsbG8=');
    assert.deepEqual(forwardedPayload.format, format);
    assert.equal(forwardedPayload.model, 'gemma3:4b');
  });
});

test('chat rejects cross-origin requests outside the local development server', async () => {
  await withServer({
    fetchImpl: async () => {
      throw new Error('Unexpected Ollama request');
    },
  }, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/gemma/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://untrusted.example',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        stream: false,
      }),
    });
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { error: 'Request origin is not allowed' });
  });
});
