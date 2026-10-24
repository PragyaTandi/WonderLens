import { topics } from '@/data/topics';
import { gemmaJSON } from '@/lib/gemma';

const schema = {
  type: 'object',
  properties: { ids: { type: 'array', items: { type: 'string' } } },
  required: ['ids'],
};

export async function smartSearch(query: string, signal?: AbortSignal): Promise<string[]> {
  const list = topics.map((t) => `${t.id}: ${t.question}`).join('\n');
  const result = await gemmaJSON<unknown>({
    schema,
    signal,
    messages: [
      {
        role: 'user',
        content: `A learner wrote: "${query}"\nPick up to 4 topic ids from the list that best match what they noticed or are curious about. Use only ids from the list; return an empty array if nothing fits.\n\n${list}`,
      },
    ],
  });
  if (
    typeof result !== 'object' ||
    result === null ||
    !('ids' in result) ||
    !Array.isArray(result.ids) ||
    !result.ids.every((id) => typeof id === 'string')
  ) {
    throw new Error('Gemma returned an invalid discovery selection');
  }
  const valid = new Set(topics.map((t) => t.id));
  return result.ids.filter((id): id is string => typeof id === 'string' && valid.has(id)).slice(0, 4);
}