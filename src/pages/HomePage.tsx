import { Compass, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import type { PageRoute } from '@/data/types';
import { topics } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';

interface HomePageProps {
  navigate: (r: PageRoute) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

const heroImages = [
  { src: 'https://images.pexels.com/photos/38149495/pexels-photo-38149495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Tree canopy', label: 'Biology' },
  { src: 'https://images.pexels.com/photos/32489613/pexels-photo-32489613.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Prism spectrum', label: 'Optics' },
  { src: 'https://images.pexels.com/photos/16184220/pexels-photo-16184220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Clock mechanism', label: 'Mechanics' },
  { src: 'https://images.pexels.com/photos/20881655/pexels-photo-20881655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Nebula', label: 'Astronomy' },
];

const cardVariants = ['default', 'tall', 'default', 'wide', 'default', 'tall', 'default', 'default', 'wide', 'default', 'tall', 'default'] as const;

export function HomePage({ navigate, isSaved, toggleSave }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-paper overflow-hidden">
        <div className="container-editorial pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <p className="text-sm font-mono text-forest tracking-wider uppercase mb-4">
                WonderLens
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-ink mb-6 text-balance">
                Understand the world by discovering how it works.
              </h1>
              <p className="text-lg text-ink-muted leading-relaxed mb-8 max-w-lg">
                Explore the science hidden in everyday life, rediscover the ideas in your textbooks,
                and follow your curiosity into the unexpected.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate({ name: 'explore' })}
                  className="flex items-center gap-2 px-5 py-2.5 bg-forest text-paper rounded-lg text-sm font-medium transition-all hover:bg-forest-dark hover:shadow-sm"
                >
                  <Compass className="w-4 h-4" strokeWidth={1.5} />
                  Explore the World
                </button>
                <button
                  onClick={() => navigate({ name: 'rediscover' })}
                  className="flex items-center gap-2 px-5 py-2.5 bg-paper text-ink border border-ink/15 rounded-lg text-sm font-medium transition-all hover:border-forest hover:text-forest hover:shadow-sm"
                >
                  <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                  Rediscover a Concept
                </button>
                <button
                  onClick={() => navigate({ name: 'explore' })}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-ink-muted text-sm font-medium transition-colors hover:text-mustard"
                >
                  <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                  Surprise Me
                </button>
              </div>
            </div>

            {/* Hero collage */}
            <div className="grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {heroImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-lg ${
                    i % 2 === 0 ? 'translate-y-0' : 'translate-y-6'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-xs font-mono text-paper bg-ink/40 backdrop-blur-sm px-2 py-0.5 rounded">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery board */}
      <section className="container-editorial py-12">
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-2">
            What have you always wondered about?
          </h2>
          <p className="text-ink-muted">
            A curated board of discoveries. Each card opens an encyclopedia entry with explanations,
            diagrams, and a guided learning journey.
          </p>
        </div>

        <div className="masonry sm:columns-2 lg:columns-3 xl:columns-4">
          {topics.map((topic, i) => (
            <DiscoveryCard
              key={topic.id}
              topic={topic}
              navigate={navigate}
              isSaved={isSaved(topic.id)}
              onToggleSave={toggleSave}
              variant={cardVariants[i % cardVariants.length] as any}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
