import { useState, useEffect, useRef } from 'react';
import type { PageRoute } from '@/data/types';
import { getTopic } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';

interface CollectionPageProps {
  savedIds: string[];
  navigate: (r: PageRoute) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

export function CollectionPage({ savedIds, navigate, isSaved, toggleSave }: CollectionPageProps) {
  const savedTopics = savedIds
    .map((id) => getTopic(id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (savedTopics.length === 0) {
    return (
      <div className="container-editorial py-20 animate-fade-in">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-paper border border-ink/8 flex items-center justify-center">
            <svg className="w-7 h-7 text-ink-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-ink mb-3">Your collection is empty</h1>
          <p className="text-ink-muted mb-6">
            As you explore discoveries, save the ones that intrigue you. They will appear here
            in your personal journal.
          </p>
          <button
            onClick={() => navigate({ name: 'explore' })}
            className="px-5 py-2.5 bg-forest text-paper rounded-lg text-sm font-medium transition-all hover:bg-forest-dark"
          >
            Start exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section className="container-editorial pt-10 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">
          Your Collection
        </h1>
        <p className="text-ink-muted text-lg max-w-2xl mb-2">
          A personal journal of saved discoveries — {savedTopics.length} {savedTopics.length === 1 ? 'entry' : 'entries'} collected so far.
        </p>
        <p className="text-sm text-ink-faint font-serif italic">
          Saved entries persist locally in your browser.
        </p>
      </section>

      <section className="container-editorial pb-12">
        <div className="masonry sm:columns-2 lg:columns-3 xl:columns-4">
          {savedTopics.map((topic, i) => (
            <DiscoveryCard
              key={topic.id}
              topic={topic}
              navigate={navigate}
              isSaved={isSaved(topic.id)}
              onToggleSave={toggleSave}
              variant={['default', 'tall', 'wide', 'default'][i % 4] as any}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
