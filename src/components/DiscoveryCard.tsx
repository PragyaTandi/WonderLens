import { Bookmark } from 'lucide-react';
import type { Topic } from '@/data/types';
import type { PageRoute } from '@/data/types';

interface DiscoveryCardProps {
  topic: Topic;
  navigate: (r: PageRoute) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  variant?: 'default' | 'wide' | 'tall';
  showCaption?: boolean;
}

const categoryColors: Record<string, string> = {
  Nature: 'text-forest bg-forest-pale',
  Physics: 'text-dusty bg-dusty-pale',
  'Everyday Objects': 'text-terracotta bg-terracotta-pale',
  Space: 'text-dusty bg-dusty-pale',
  'Human Body': 'text-terracotta bg-terracotta-pale',
  Engineering: 'text-ink-muted bg-paper border border-ink/10',
  Materials: 'text-mustard bg-mustard-pale',
  'Light & Sound': 'text-dusty bg-dusty-pale',
  Mathematics: 'text-forest bg-forest-pale',
  'Computer Science': 'text-dusty bg-dusty-pale',
  'Artificial Intelligence': 'text-terracotta bg-terracotta-pale',
};

export function DiscoveryCard({
  topic,
  navigate,
  isSaved,
  onToggleSave,
  variant = 'default',
  showCaption = true,
}: DiscoveryCardProps) {
  const tagClass = categoryColors[topic.category] ?? 'text-ink-muted bg-paper border border-ink/10';

  const aspectClass =
    variant === 'wide' ? 'aspect-[16/10]' : variant === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <article
      className="group cursor-pointer animate-fade-up"
      onClick={() => navigate({ name: 'discovery', topicId: topic.id })}
    >
      <div className="relative overflow-hidden rounded-lg bg-paper shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
        <div className={`relative overflow-hidden ${aspectClass}`}>
          <img
            src={topic.image}
            alt={topic.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(topic.id);
          }}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-paper/90 backdrop-blur-sm shadow-sm transition-all hover:bg-paper hover:scale-105"
          aria-label={isSaved ? 'Remove from collection' : 'Save to collection'}
        >
          <Bookmark
            className={`w-4 h-4 transition-colors ${isSaved ? 'fill-mustard text-mustard' : 'text-ink-muted'}`}
            strokeWidth={1.5}
          />
        </button>

        <span
          className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${tagClass}`}
        >
          {topic.category}
        </span>

        <div className="p-4">
          <h3 className="font-serif text-lg leading-snug text-ink mb-1.5 text-balance">
            {topic.question}
          </h3>
          {showCaption && (
            <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
              {topic.caption}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
