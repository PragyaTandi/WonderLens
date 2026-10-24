import { getTopic, topics } from '@/data/topics';
import { gemmaJSON } from '@/lib/gemma';

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

const schema = {
  type: 'object',
  properties: {
    subject: { type: 'string' },
    summary: { type: 'string' },
    discoveries: {
      type: 'array',
      minItems: 3,
      maxItems: 4,
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
    relatedTopicIds: { type: 'array', maxItems: 3, items: { type: 'string' } },
  },
  required: ['subject', 'summary', 'discoveries', 'funFact', 'tryThis', 'relatedTopicIds'],
};

const topicList = topics.map((topic) => `${topic.id}: ${topic.question}`).join('\n');

const prompt = `Look at this image. Identify the main subject, then reveal the hidden science, math, or engineering behind it.
- "discoveries": 3 to 4 non-obvious insights about why it looks or works this way. Be specific and intuitive.
- "funFact": one surprising fact.
- "tryThis": one safe, simple observation or experiment.
- "relatedTopicIds": up to 3 ids from the list below that genuinely relate to the image, or an empty array. Use only ids from the list.
Write for a curious teenager. If the image is unclear, say so in "summary".

Topics:
${topicList}`;

function isScanResult(value: unknown): value is ScanResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    'subject' in value &&
    typeof value.subject === 'string' &&
    'summary' in value &&
    typeof value.summary === 'string' &&
    'discoveries' in value &&
    Array.isArray(value.discoveries) &&
    value.discoveries.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'title' in item &&
        typeof item.title === 'string' &&
        'explanation' in item &&
        typeof item.explanation === 'string' &&
        'field' in item &&
        typeof item.field === 'string',
    ) &&
    'funFact' in value &&
    typeof value.funFact === 'string' &&
    'tryThis' in value &&
    typeof value.tryThis === 'string' &&
    'relatedTopicIds' in value &&
    Array.isArray(value.relatedTopicIds) &&
    value.relatedTopicIds.every((id) => typeof id === 'string')
  );
}

export async function scanImage(base64: string, signal?: AbortSignal): Promise<ScanResult> {
  const result = await gemmaJSON<unknown>({
    messages: [{ role: 'user', content: prompt, images: [base64] }],
    schema,
    signal,
  });
  if (!isScanResult(result)) throw new Error('Gemma returned an incomplete scan result');

  result.relatedTopicIds = result.relatedTopicIds.filter((id) => getTopic(id));
  return result;
}
