import { useState, useMemo } from 'react';
import { ArrowRight, Search, Sparkles, Loader2, X, Lightbulb } from 'lucide-react';
import type { PageRoute, SubjectCategory } from '@/data/types';
import { topics } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';
import { smartSearch } from '@/lib/smartSearch';
import { useGemmaAvailable } from '@/hooks/useGemmaAvailable';
import {
generateDiscovery,
type GeneratedDiscovery,
} from '@/lib/discoveryGenerator';

interface ExplorePageProps {
navigate: (r: PageRoute) => void;
isSaved: (id: string) => boolean;
toggleSave: (id: string) => void;
}

const categories: (SubjectCategory | 'All')[] = [
'All',
'Nature',
'Physics',
'Everyday Objects',
'Space',
'Human Body',
'Materials',
'Light & Sound',
];

export function ExplorePage({
navigate,
isSaved,
toggleSave,
}: ExplorePageProps) {
const [query, setQuery] = useState('');
const [activeCategory, setActiveCategory] =
useState<SubjectCategory | 'All'>('All');

const gemmaAvailable = useGemmaAvailable();

const [aiIds, setAiIds] = useState<string[] | null>(null);
const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState<string | null>(null);

const [generatedDiscovery, setGeneratedDiscovery] =
useState<GeneratedDiscovery | null>(null);
const [generationLoading, setGenerationLoading] = useState(false);
const [generationError, setGenerationError] = useState<string | null>(null);

const filtered = useMemo(() => {
let result = aiIds
? aiIds
.map((id) => topics.find((topic) => topic.id === id))
.filter(
(topic): topic is NonNullable<typeof topic> =>
topic !== undefined,
)
: topics;

 
if (activeCategory !== 'All') {
  result = result.filter(
    (topic) => topic.category === activeCategory,
  );
}

if (!aiIds && query.trim()) {
  const q = query.toLowerCase();

  result = result.filter(
    (topic) =>
      topic.question.toLowerCase().includes(q) ||
      topic.shortAnswer.toLowerCase().includes(q) ||
      topic.category.toLowerCase().includes(q),
  );
}

return result;
 

}, [query, activeCategory, aiIds]);

const handleSurprise = () => {
const random = topics[Math.floor(Math.random() * topics.length)];

 
if (random) {
  navigate({ name: 'discovery', topicId: random.id });
}
 

};

// Find relevant discoveries from the existing collection.
const handleSearch = async () => {
if (!query.trim() || aiLoading) return;

 
setAiLoading(true);
setAiError(null);
setAiIds(null);
setGeneratedDiscovery(null);
setGenerationError(null);

try {
  setAiIds(await smartSearch(query));
} catch (error) {
  setAiError(
    error instanceof Error
      ? error.message
      : 'Could not search the collection.',
  );
} finally {
  setAiLoading(false);
}
 

};

// Ask Gemma to CREATE a new discovery.
const handleGenerate = async () => {
if (!query.trim() || generationLoading) return;

 
setGenerationLoading(true);
setGenerationError(null);
setGeneratedDiscovery(null);
setAiError(null);

try {
  const discovery = await generateDiscovery(query);
  setGeneratedDiscovery(discovery);
} catch (error) {
  setGenerationError(
    error instanceof Error
      ? error.message
      : 'Gemma could not generate a discovery.',
  );
} finally {
  setGenerationLoading(false);
}
 

};

const handleFollowUp = (question: string) => {
setQuery(question);
setGeneratedDiscovery(null);
setGenerationError(null);
setAiIds(null);
};

return ( <div className="animate-fade-in"> <section className="container-editorial pt-10 pb-8"> <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
Explore the World </h1>

 
    <p className="text-ink-muted text-lg mb-8 max-w-2xl">
      Start with something you noticed — an object, a phenomenon, a
      question that caught your eye. Ask Gemma to create a new discovery,
      or explore the existing collection.
    </p>

    {/* Topic input and AI actions */}
    <div className="relative max-w-2xl">
      <textarea
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setAiIds(null);
          setAiError(null);
          setGeneratedDiscovery(null);
          setGenerationError(null);
        }}
        placeholder="Why do cats' eyes glow in the dark?"
        rows={2}
        className="w-full px-4 py-3 bg-page border border-ink/12 rounded-lg text-ink placeholder:text-ink-faint resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <p className="text-sm text-ink-faint">
          Explore an existing topic or generate something new.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {gemmaAvailable && (
            <>
              <button
                onClick={handleGenerate}
                disabled={!query.trim() || generationLoading}
                className="flex items-center gap-1.5 text-sm text-forest font-medium hover:text-forest-dark transition-colors disabled:opacity-40"
              >
                {generationLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles
                    className="w-3.5 h-3.5"
                    strokeWidth={1.5}
                  />
                )}
                {generationLoading
                  ? 'Creating discovery...'
                  : 'Generate with Gemma'}
              </button>

              <button
                onClick={handleSearch}
                disabled={!query.trim() || aiLoading}
                className="flex items-center gap-1.5 text-sm text-ink-muted font-medium hover:text-forest transition-colors disabled:opacity-40"
              >
                {aiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                Find existing
              </button>
            </>
          )}

          <button
            onClick={handleSurprise}
            className="flex items-center gap-1.5 text-sm text-mustard font-medium hover:text-mustard-light transition-colors"
          >
            Surprise Me
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {!gemmaAvailable && (
        <p className="mt-3 text-sm text-ink-muted">
          Gemma is unavailable right now. Start your WonderLens backend
          and make sure Ollama is running to generate discoveries.
        </p>
      )}

      {aiError && (
        <p className="mt-3 text-sm text-terracotta">{aiError}</p>
      )}

      {generationError && (
        <p className="mt-3 text-sm text-terracotta">
          {generationError}
        </p>
      )}

      {aiIds !== null && (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <Sparkles className="w-3.5 h-3.5 text-mustard" />
          Gemma found {aiIds.length}{' '}
          {aiIds.length === 1 ? 'matching discovery' : 'matching discoveries'}{' '}
          in your existing collection.
          <button
            onClick={() => setAiIds(null)}
            className="inline-flex items-center gap-1 text-forest hover:text-forest-dark"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        </p>
      )}
    </div>

    {/* Category filters */}
    <div className="flex flex-wrap gap-2 mt-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === category
              ? 'bg-forest text-paper'
              : 'bg-page text-ink-muted border border-ink/10 hover:border-ink/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </section>

  {/* Newly generated discovery */}
  {generatedDiscovery && (
    <section className="container-editorial pb-10">
      <article className="rounded-xl border border-forest/20 bg-paper p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-forest font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>New discovery generated by Gemma</span>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <Lightbulb
            className="w-7 h-7 text-mustard shrink-0 mt-1"
            strokeWidth={1.5}
          />

          <div>
            <p className="text-xs uppercase tracking-wider text-ink-faint mb-2">
              {generatedDiscovery.category}
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl text-ink">
              {generatedDiscovery.title}
            </h2>
          </div>
        </div>

        <p className="text-lg text-ink-muted leading-relaxed mb-6">
          {generatedDiscovery.summary}
        </p>

        <div className="mb-7">
          <h3 className="font-serif text-xl text-ink mb-2">
            How does it work?
          </h3>

          <p className="text-ink-muted leading-relaxed whitespace-pre-line">
            {generatedDiscovery.explanation}
          </p>
        </div>

        <div className="mb-7">
          <h3 className="font-serif text-xl text-ink mb-3">
            Interesting facts
          </h3>

          <ul className="space-y-3">
            {generatedDiscovery.interestingFacts.map((fact, index) => (
              <li
                key={`${index}-${fact}`}
                className="flex items-start gap-3 text-ink-muted"
              >
                <span className="text-mustard font-semibold">
                  {index + 1}.
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-ink mb-3">
            Keep exploring
          </h3>

          <div className="flex flex-col items-start gap-2">
            {generatedDiscovery.followUpQuestions.map(
              (question, index) => (
                <button
                  key={`${index}-${question}`}
                  onClick={() => handleFollowUp(question)}
                  className="text-left text-forest hover:text-forest-dark hover:underline transition-colors"
                >
                  {question} →
                </button>
              ),
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setGeneratedDiscovery(null);
            setGenerationError(null);
          }}
          className="mt-7 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
        >
          <X className="w-4 h-4" />
          Dismiss discovery
        </button>
      </article>
    </section>
  )}

  {/* Existing discovery collection */}
  <section className="container-editorial pb-12">
    <div className="flex items-center justify-between gap-3 mb-5">
      <h2 className="font-serif text-2xl text-ink">
        {aiIds !== null ? 'Matching discoveries' : 'Explore the collection'}
      </h2>

      {aiIds !== null && (
        <button
          onClick={() => setAiIds(null)}
          className="text-sm text-forest hover:text-forest-dark"
        >
          Show all
        </button>
      )}
    </div>

    {filtered.length === 0 ? (
      <div className="text-center py-20">
        <Search
          className="w-12 h-12 mx-auto text-ink-faint mb-4"
          strokeWidth={1}
        />

        <p className="text-ink-muted text-lg">
          No discoveries match your search yet.
        </p>

        <p className="text-ink-faint text-sm mt-1">
          Try another term, generate a new discovery, or browse all
          categories.
        </p>
      </div>
    ) : (
      <div className="masonry sm:columns-2 lg:columns-3 xl:columns-4">
        {filtered.map((topic, index) => (
          <DiscoveryCard
            key={topic.id}
            topic={topic}
            navigate={navigate}
            isSaved={isSaved(topic.id)}
            onToggleSave={toggleSave}
            variant={
              (['default', 'tall', 'wide', 'default'] as const)[
                index % 4
              ]
            }
          />
        ))}
      </div>
    )}
  </section>
</div>

);
}
