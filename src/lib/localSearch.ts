import type { Topic } from '@/data/types';

const STOP = new Set([
  'a','an','the','and','or','but','of','to','in','on','at','by','for','with','from','up','out',
  'is','are','was','were','be','been','being','do','does','did','why','how','what','when','where',
  'which','who','my','me','i','it','its','this','that','these','those','can','could','would',
  'should','have','has','had','not','no','so','if','then','than','as','about','into','over','you',
  'your','after','before','while','there','their','they','them','like','just','really','very',
  'noticed','notice','saw','see','seen','something','interesting','thing','things','happens',
  'happen','work','works','make','makes','get','gets','some','any','all','too','also','wonder',
]);

// UK/US spellings and a few common everyday words mapped to the terms topics use.
const SYNONYMS: Record<string, string> = {
  colour: 'color',
  colours: 'color',
  coloured: 'color',
  grey: 'gray',
  centre: 'center',
  metre: 'meter',
  fog: 'condensation',
  foggy: 'condensation',
  mist: 'condensation',
  steam: 'condensation',
  stars: 'star',
  galaxy: 'nebula',
  space: 'nebula',
  ai: 'neural',
  magnet: 'magnetic',
  magnets: 'magnetic',
  electric: 'electricity',
  clock: 'clock',
  watch: 'clock',
};

function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => SYNONYMS[w] ?? w)
    .map(stem)
    .filter((w) => w.length > 2);
}

// 1 for an exact match, 0.6 for a partial one ("snow" ~ "snowflake"), otherwise 0.
function matchStrength(tokens: string[], word: string): number {
  let best = 0;
  for (const t of tokens) {
    if (t === word) return 1;
    if (word.length >= 4 && t.startsWith(word)) best = Math.max(best, 0.6);
    else if (t.length >= 4 && word.startsWith(t)) best = Math.max(best, 0.6);
  }
  return best;
}

function topicFields(t: Topic) {
  return {
    id: tokenize(t.id.replace(/-/g, ' ')),
    question: tokenize(t.question),
    short: tokenize(t.shortAnswer),
    category: tokenize(t.category),
    caption: tokenize(t.caption),
    body: tokenize(t.discovery.explanationSections.map((s) => `${s.heading} ${s.body}`).join(' ')),
  };
}

export function localSearch(query: string, all: Topic[]): Topic[] {
  const words = Array.from(new Set(tokenize(query)));
  if (words.length === 0) return [];

  const scored = all
    .map((t) => {
      const f = topicFields(t);
      let score = 0;
      for (const w of words) {
        score += 5 * matchStrength(f.id, w);
        score += 4 * matchStrength(f.question, w);
        score += 3 * matchStrength(f.short, w);
        score += 3 * matchStrength(f.category, w);
        score += 2 * matchStrength(f.caption, w);
        score += 1 * matchStrength(f.body, w);
      }
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];
  // Drop weak matches that trail far behind the best one.
  const cutoff = Math.max(1.5, scored[0].score * 0.35);
  return scored.filter((x) => x.score >= cutoff).map((x) => x.t);
}