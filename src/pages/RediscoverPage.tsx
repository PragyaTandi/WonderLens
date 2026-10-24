import { useState, useMemo } from 'react';
import type { PageRoute, AcademicField } from '@/data/types';
import { conceptCards } from '@/data/concepts';

interface RediscoverPageProps {
  navigate: (r: PageRoute) => void;
}

const fields: (AcademicField | 'All')[] = [
  'All',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Artificial Intelligence',
  'Engineering',
  'Statistics',
];

const fieldColors: Record<string, { text: string; bg: string; border: string }> = {
  Mathematics: { text: 'text-forest', bg: 'bg-forest-pale', border: 'border-forest/20' },
  Physics: { text: 'text-dusty', bg: 'bg-dusty-pale', border: 'border-dusty/20' },
  Chemistry: { text: 'text-terracotta', bg: 'bg-terracotta-pale', border: 'border-terracotta/20' },
  Biology: { text: 'text-forest', bg: 'bg-forest-pale', border: 'border-forest/20' },
  'Computer Science': { text: 'text-dusty', bg: 'bg-dusty-pale', border: 'border-dusty/20' },
  'Artificial Intelligence': { text: 'text-mustard', bg: 'bg-mustard-pale', border: 'border-mustard/20' },
  Engineering: { text: 'text-ink-muted', bg: 'bg-paper', border: 'border-ink/15' },
  Statistics: { text: 'text-terracotta', bg: 'bg-terracotta-pale', border: 'border-terracotta/20' },
};

export function RediscoverPage({ navigate }: RediscoverPageProps) {
  const [activeField, setActiveField] = useState<AcademicField | 'All'>('All');

  const filtered = useMemo(() => {
    if (activeField === 'All') return conceptCards;
    return conceptCards.filter((c) => c.field === activeField);
  }, [activeField]);

  return (
    <div className="animate-fade-in">
      <section className="container-editorial pt-10 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
          Rediscover a Concept
        </h1>
        <p className="text-ink-muted text-lg mb-8 max-w-2xl">
          Formal concepts, made intuitive. Each entry begins with the underlying problem before
          introducing the definition — so understanding comes first, notation second.
        </p>

        <div className="flex flex-wrap gap-2">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setActiveField(field)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeField === field
                  ? 'bg-forest text-paper'
                  : 'bg-page text-ink-muted border border-ink/10 hover:border-ink/20'
              }`}
            >
              {field}
            </button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((concept) => {
            const colors = fieldColors[concept.field] ?? fieldColors.Engineering;
            return (
              <article
                key={concept.id}
                onClick={() => navigate({ name: 'discovery', topicId: concept.topicId })}
                className="group cursor-pointer bg-page rounded-xl overflow-hidden border border-ink/8 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={concept.image}
                    alt={concept.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span
                    className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
                  >
                    {concept.field}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-ink mb-2">{concept.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {concept.question}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-muted text-lg">
              No concepts in this field yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
