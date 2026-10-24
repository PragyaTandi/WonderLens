import { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import type { PageRoute, SubjectCategory } from '@/data/types';
import { topics } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';

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

const categoryIcons: Record<string, string> = {
  All: '◉',
  Nature: '🍃',
  Physics: '⚛',
  'Everyday Objects': '🔩',
  Space: '✦',
  'Human Body': '❤',
  Engineering: '⚙',
  Materials: '⬡',
  'Light & Sound': '◈',
};

export function ExplorePage({ navigate, isSaved, toggleSave }: ExplorePageProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SubjectCategory | 'All'>('All');

  const filtered = useMemo(() => {
    let result = topics;
    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.question.toLowerCase().includes(q) ||
          t.shortAnswer.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [query, activeCategory]);

  const handleSurprise = () => {
    const random = topics[Math.floor(Math.random() * topics.length)];
    navigate({ name: 'discovery', topicId: random.id });
  };

  return (
    <div className="animate-fade-in">
      <section className="container-editorial pt-10 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
          Explore the World
        </h1>
        <p className="text-ink-muted text-lg mb-8 max-w-2xl">
          Start with something you noticed — an object, a phenomenon, a question that caught your eye.
          Or browse the board below by subject.
        </p>

        {/* Input area */}
        <div className="relative max-w-2xl">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="I noticed something interesting..."
            rows={2}
            className="w-full px-4 py-3 bg-page border border-ink/12 rounded-lg text-ink placeholder:text-ink-faint resize-none focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-all"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-ink-faint">
              Describe what you saw, or search the collection.
            </p>
            <button
              onClick={handleSurprise}
              className="flex items-center gap-1.5 text-sm text-mustard font-medium hover:text-mustard-light transition-colors"
            >
              Surprise Me
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-forest text-paper'
                  : 'bg-page text-ink-muted border border-ink/10 hover:border-ink/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="container-editorial pb-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 mx-auto text-ink-faint mb-4" strokeWidth={1} />
            <p className="text-ink-muted text-lg">
              No discoveries match your search yet.
            </p>
            <p className="text-ink-faint text-sm mt-1">
              Try a different term or browse all categories.
            </p>
          </div>
        ) : (
          <div className="masonry sm:columns-2 lg:columns-3 xl:columns-4">
            {filtered.map((topic, i) => (
              <DiscoveryCard
                key={topic.id}
                topic={topic}
                navigate={navigate}
                isSaved={isSaved(topic.id)}
                onToggleSave={toggleSave}
                variant={(['default', 'tall', 'wide', 'default'] as const)[i % 4] as any}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
