import { topics, getTopic } from '@/data/topics';

export interface Discovery {
  title: string;
  explanation: string;
  field: string;
}

export interface ScanResult {
  subject: string;
  summary: string;
  discoveries: Discovery[];
  funFact: string;
  tryThis: string;
  relatedTopicIds: string[];
}

const MODEL = 'gemma3:4b';

const schema = {
  type: 'object',
  properties: {
    subject: { type: 'string' },
    summary: { type: 'string' },
    discoveries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          explanation: { type: 'string' },
          field: { type: 'string' },
        },
        required: ['title', 'explanation', 'field'],
      },
    },
    funFact: { type: 'string' },
    tryThis: { type: 'string' },
    relatedTopicIds: { type: 'array', items: { type: 'string' } },
  },
  required: ['subject', 'summary', 'discoveries', 'funFact', 'tryThis', 'relatedTopicIds'],
};

const topicList = topics.map((t) => `${t.id}: ${t.question}`).join('\n');

const PROMPT = `Look at this image. Identify the main subject, then reveal the hidden science, math, or engineering behind it.
- "discoveries": 3 to 4 non-obvious insights about why it looks or works this way. Be specific and intuitive.
- "funFact": one surprising fact.
- "tryThis": one safe, simple observation or experiment.
- "relatedTopicIds": up to 3 ids from the list below that genuinely relate to the image, or an empty array. Use only ids from the list.
Write for a curious teenager. If the image is unclear, say so in "summary".

Topics:
${topicList}`;

export async function scanImage(base64: string, signal?: AbortSignal): Promise<ScanResult> {
  const res = await fetch('/ollama/api/chat', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      format: schema,
      options: { temperature: 0.4 },
      messages: [{ role: 'user', content: PROMPT, images: [base64] }],
    }),
  });
  if (!res.ok) throw new Error(`Scan failed: ${res.status}`);
  const data = await res.json();
  const parsed = JSON.parse(data.message.content) as ScanResult;
  parsed.relatedTopicIds = (parsed.relatedTopicIds ?? []).filter((id) => getTopic(id));
  return parsed;
}