import { Compass, BookOpen, Bookmark, Leaf } from 'lucide-react';
import type { PageRoute } from '@/data/types';

interface NavProps {
  route: PageRoute;
  navigate: (r: PageRoute) => void;
  collectionCount: number;
}

export function Navigation({ route, navigate, collectionCount }: NavProps) {
  const isActive = (name: string) => route.name === name;

  const navItem = (label: string, icon: React.ReactNode, target: PageRoute, active: boolean) => (
    <button
      onClick={() => navigate(target)}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active ? 'text-forest bg-forest-pale' : 'text-ink-muted hover:text-ink hover:bg-paper'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-sm border-b border-ink/8">
      <div className="container-editorial flex items-center justify-between h-16">
        <button
          onClick={() => navigate({ name: 'home' })}
          className="flex items-center gap-2.5 group"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-forest text-paper transition-transform group-hover:scale-105">
            <Leaf className="w-4.5 h-4.5" strokeWidth={1.5} />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            WonderLens
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {navItem('Explore', <Compass className="w-4 h-4" strokeWidth={1.5} />, { name: 'explore' }, isActive('explore'))}
          {navItem('Rediscover', <BookOpen className="w-4 h-4" strokeWidth={1.5} />, { name: 'rediscover' }, isActive('rediscover'))}
          {navItem(
            'Collection',
            <Bookmark className="w-4 h-4" strokeWidth={1.5} />,
            { name: 'collection' },
            isActive('collection'),
          )}
          {collectionCount > 0 && (
            <span className="ml-0.5 text-xs font-mono text-mustard bg-mustard-pale px-1.5 py-0.5 rounded-full">
              {collectionCount}
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
