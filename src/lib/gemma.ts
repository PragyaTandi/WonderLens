const API = '/api/gemma';

export type ChatMsg = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
};

async function responseError(response: Response): Promise<Error> {
  try {
    const body: unknown = await response.json();
    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'string'
    ) {
      return new Error(body.error);
    }
  } catch {
    // Keep the HTTP status as the actionable fallback when no JSON error was returned.
  }
  return new Error(`Gemma request failed (${response.status})`);
}

export async function isGemmaAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API}/status`, { signal: AbortSignal.timeout(2500) });
    if (!response.ok) throw await responseError(response);
    const status: unknown = await response.json();
    return (
      typeof status === 'object' &&
      status !== null &&
      'available' in status &&
      status.available === true
    );
  } catch {
    return false;
  }
}

export async function gemmaChat(opts: {
  messages: ChatMsg[];
  onToken?: (token: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  const response = await fetch(`${API}/chat`, {
    method: 'POST',
    signal: opts.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: opts.messages, stream: true }),
  });
  if (!response.ok) throw await responseError(response);
  if (!response.body) throw new Error('Gemma returned an empty response');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';

  function readLine(line: string) {
    if (!line.trim()) return;
    const chunk: unknown = JSON.parse(line);
    if (typeof chunk !== 'object' || chunk === null) {
      throw new Error('Gemma returned an invalid response');
    }
    if ('error' in chunk && typeof chunk.error === 'string') {
      throw new Error(chunk.error);
    }
    if (
      'message' in chunk &&
      typeof chunk.message === 'object' &&
      chunk.message !== null &&
      'content' in chunk.message &&
      typeof chunk.message.content === 'string'
    ) {
      const token = chunk.message.content;
      full += token;
      opts.onToken?.(token);
    }
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) readLine(line);
  }
  buffer += decoder.decode();
  readLine(buffer);
  return full;
}

export async function gemmaJSON<T>(opts: {
  messages: ChatMsg[];
  schema: object;
  signal?: AbortSignal;
}): Promise<T> {
  const response = await fetch(`${API}/chat`, {
    method: 'POST',
    signal: opts.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: opts.messages,
      stream: false,
      format: opts.schema,
    }),
  });
  if (!response.ok) throw await responseError(response);

  const result: unknown = await response.json();
  if (
    typeof result !== 'object' ||
    result === null ||
    !('message' in result) ||
    typeof result.message !== 'object' ||
    result.message === null ||
    !('content' in result.message) ||
    typeof result.message.content !== 'string'
  ) {
    throw new Error('Gemma returned an invalid structured response');
  }
  return JSON.parse(result.message.content) as T;
}
