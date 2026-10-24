import { gemmaJSON } from '@/lib/gemma';

export interface GeneratedDiscovery {
  title: string;
  category: string;
  summary: string;
  explanation: string;
  interestingFacts: string[];
  followUpQuestions: string[];
}

const discoverySchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    category: { type: 'string' },
    summary: { type: 'string' },
    explanation: { type: 'string' },
    interestingFacts: {
      type: 'array',
      items: { type: 'string' },
    },
    followUpQuestions: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: [
    'title',
    'category',
    'summary',
    'explanation',
    'interestingFacts',
    'followUpQuestions',
  ],
};

export async function generateDiscovery(
  userPrompt: string,
): Promise<GeneratedDiscovery> {
  const prompt = userPrompt.trim();

  if (!prompt) {
    throw new Error('Enter a topic or question to generate a discovery.');
  }

  const result = await gemmaJSON<GeneratedDiscovery>({
    messages: [
      {
        role: 'system',
        content: `You are WonderLens, an AI-powered science discovery guide.
Generate an original discovery based on the user's topic.
Do not select an existing discovery from a predefined list.
Make the content accurate, engaging, and understandable to a curious teenager.
Provide a specific title, a 1-2 sentence summary, a clear explanation,
exactly 3 interesting facts, and 3 follow-up questions.
Do not invent scientific evidence.
Return only content matching the requested JSON schema.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    schema: discoverySchema,
  });

  if (
    !result ||
    typeof result.title !== 'string' ||
    typeof result.category !== 'string' ||
    typeof result.summary !== 'string' ||
    typeof result.explanation !== 'string' ||
    !Array.isArray(result.interestingFacts) ||
    !Array.isArray(result.followUpQuestions)
  ) {
    throw new Error('Gemma returned an invalid discovery. Please try again.');
  }

  return result;
}
