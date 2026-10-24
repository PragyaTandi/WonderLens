const MODEL = 'gemma3:4b';
const BASE = '/ollama/api';

export type ChatMsg = { role: 'system' | 'user' | 'assistant'; content: string };

export async function isGemmaAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/tags`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function gemmaChat(opts: {
  messages: ChatMsg[];
  onToken?: (t: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    signal: opts.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      keep_alive: '30m',
      options: { temperature: 0.5 },
      messages: opts.messages,
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Gemma request failed: ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let full = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.trim()) continue;
      const token = JSON.parse(line).message?.content ?? '';
      full += token;
      opts.onToken?.(token);
    }
  }
  return full;
}

export async function gemmaJSON<T>(opts: {
  messages: ChatMsg[];
  schema: object;
  signal?: AbortSignal;
}): Promise<T> {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    signal: opts.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      keep_alive: '30m',
      format: opts.schema,
      options: { temperature: 0.3 },
      messages: opts.messages,
    }),
  });
  if (!res.ok) throw new Error(`Gemma request failed: ${res.status}`);
  const data = await res.json();
  return JSON.parse(data.message.content) as T;
}