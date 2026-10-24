import { useEffect, useState } from 'react';
import { Compass, BookOpen, Sparkles } from 'lucide-react';
import type { PageRoute } from '@/data/types';
import { topics } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';

interface HomePageProps {
  navigate: (r: PageRoute) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

const heroImages = [
  {
    src: 'https://images.pexels.com/photos/38149495/pexels-photo-38149495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Tree canopy',
    label: 'Biology',
  },
  {
    src: 'https://images.pexels.com/photos/32489613/pexels-photo-32489613.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Prism spectrum',
    label: 'Optics',
  },
  {
    src: 'https://images.pexels.com/photos/16184220/pexels-photo-16184220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Clock mechanism',
    label: 'Mechanics',
  },
  {
    src: 'https://images.pexels.com/photos/20881655/pexels-photo-20881655.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Nebula',
    label: 'Astronomy',
  },
];

const backgroundScenes = [
  {
    name: 'Galaxy',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=85',
  },
  {
    name: 'Technology',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85',
  },
  {
    name: 'Mathematics',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=2400&q=85',
  },
  {
    name: 'Engineering',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=85',
  },
];

const cardVariants = [
  'default',
  'tall',
  'default',
  'wide',
  'default',
  'tall',
  'default',
  'default',
  'wide',
  'default',
  'tall',
  'default',
] as const;

export function HomePage({
  navigate,
  isSaved,
  toggleSave,
}: HomePageProps) {
  const [activeScene, setActiveScene] = useState(0);

  // Rotate the background every three seconds.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScene((current) => (current + 1) % backgroundScenes.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero with animated background */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Animated background images */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {backgroundScenes.map((scene, index) => (
            <div
              key={scene.name}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                activeScene === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url("${scene.image}")`,
                transform: activeScene === index ? 'scale(1.08)' : 'scale(1)',
                transition:
                  'opacity 1000ms ease-in-out, transform 4000ms ease-out',
              }}
            />
          ))}
        </div>

        {/* Dark overlays for text readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/50"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/20"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-transparent to-black/20"
          aria-hidden="true"
        />

        {/* Original hero content */}
        <div className="container-editorial relative z-[2] pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Headline and buttons */}
            <div className="animate-fade-up">
              <p className="mb-4 font-mono text-sm uppercase tracking-wider text-white/90">
                WonderLens
              </p>

              <h1 className="mb-6 font-serif text-4xl font-medium leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
                Understand the world by discovering how it works.
              </h1>

              <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/85">
                Explore the science hidden in everyday life, rediscover the
                ideas in your textbooks, and follow your curiosity into the
                unexpected.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate({ name: 'explore' })}
                  className="flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-paper transition-all hover:bg-forest-dark hover:shadow-sm"
                >
                  <Compass className="h-4 w-4" strokeWidth={1.5} />
                  Explore the World
                </button>

                <button
                  onClick={() => navigate({ name: 'rediscover' })}
                  className="flex items-center gap-2 rounded-lg border border-white/40 bg-white/95 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:bg-white hover:shadow-sm"
                >
                  <BookOpen className="h-4 w-4" strokeWidth={1.5} />
                  Rediscover a Concept
                </button>

                <button
                  onClick={() => navigate({ name: 'explore' })}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  Surprise Me
                </button>
              </div>
            </div>

            {/* Original four-image collage — preserved */}
            <div
              className="grid grid-cols-2 gap-3 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {heroImages.map((img, i) => (
                <div
                  key={img.label}
                  className={`relative overflow-hidden rounded-lg shadow-xl ring-1 ring-white/20 ${
                    i % 2 === 0 ? 'translate-y-0' : 'translate-y-6'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />

                  <span className="absolute bottom-2 left-2 rounded bg-black/55 px-2 py-0.5 font-mono text-xs text-white backdrop-blur-sm">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Original discovery board — preserved */}
      <section className="container-editorial py-12">
        <div className="mb-8">
          <h2 className="mb-2 font-serif text-2xl text-ink sm:text-3xl">
            What have you always wondered about?
          </h2>

          <p className="text-ink-muted">
            A curated board of discoveries. Each card opens an encyclopedia
            entry with explanations, diagrams, and a guided learning journey.
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