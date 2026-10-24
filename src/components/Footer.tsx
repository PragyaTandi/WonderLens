import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/8 bg-paper">
      <div className="container-editorial py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-forest text-paper">
              <Leaf className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <span className="font-serif text-lg font-semibold text-ink">WonderLens</span>
          </div>
          <p className="text-sm text-ink-muted max-w-md">
            Understand the world by discovering how it works. A curated encyclopedia of questions,
            evidence, and the reasoning that connects them.
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-ink/5">
          <p className="text-xs text-ink-faint font-mono">
            Built for the curious. Photography via Pexels. Diagrams and editorial content original to WonderLens.
          </p>
        </div>
      </div>
    </footer>
  );
}
