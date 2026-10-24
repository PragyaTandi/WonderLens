import type { PageRoute } from '@/data/types';
import { topics } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';
import StemHero from '@/StemHero';

interface HomePageProps {
  navigate: (r: PageRoute) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

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

export function HomePage({ navigate, isSaved, toggleSave }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <StemHero navigate={navigate} />

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