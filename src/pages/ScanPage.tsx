import { useEffect, useRef, useState } from 'react';
import { Camera, Upload, Loader2, Sparkles, FlaskConical, ArrowRight } from 'lucide-react';
import type { PageRoute } from '@/data/types';
import { getTopic } from '@/data/topics';
import { prepareImage } from '@/lib/imageUtils';
import { scanImage, type ScanResult } from '@/lib/scan';

export function ScanPage({ navigate }: { navigate: (r: PageRoute) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleFile(file?: File) {
    if (!file) return;
    abortRef.current?.abort();
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file to scan.');
      setLoading(false);
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Choose an image smaller than 15 MB.');
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      const { base64, previewUrl } = await prepareImage(file);
      setPreview(previewUrl);
      setResult(await scanImage(base64, controller.signal));
    } catch (e) {
      if (controller.signal.aborted) return;
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Scan failed. Check that Ollama is running and the configured Gemma model is installed.');
      }
    } finally {
      if (abortRef.current === controller) setLoading(false);
    }
  }

  return (
    <div className="container-editorial py-10 animate-fade-in max-w-4xl">
      <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">Scan a discovery</h1>
      <p className="text-ink-muted text-lg mb-8">
        Photograph or upload anything — a leaf, a bridge, a soap bubble — and see the science hiding in it.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          e.currentTarget.value = '';
          void handleFile(file);
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className="flex min-h-[260px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-page paper-texture transition-colors hover:bg-forest-pale/40"
      >
        {preview ? (
          <img src={preview} alt="Scanned subject" className="max-h-[420px] w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-ink-muted">
            <div className="flex gap-3"><Camera strokeWidth={1.5} /><Upload strokeWidth={1.5} /></div>
            <span className="text-sm">Tap to take a photo, or drop an image here</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-6 flex items-center gap-3 text-ink-muted">
          <Loader2 className="w-5 h-5 animate-spin" />
          Gemma is studying your image. This can take a while on CPU…
        </div>
      )}
      {error && <p className="mt-6 text-terracotta">{error}</p>}

      {result && (
        <section className="mt-10 space-y-8 animate-fade-up">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink-faint">Spotted</p>
            <h2 className="font-serif text-3xl text-ink">{result.subject}</h2>
            <p className="mt-2 text-ink-muted">{result.summary}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {result.discoveries.map((d, i) => (
              <article key={i} className="rounded-xl border border-ink/10 bg-page p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-forest">{d.field}</span>
                <h3 className="mt-1 flex items-center gap-2 font-serif text-xl text-ink">
                  <Sparkles className="w-4 h-4 text-mustard" /> {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.explanation}</p>
              </article>
            ))}
          </div>

          <div className="rounded-xl bg-mustard-pale p-5 space-y-3 text-sm text-ink">
            <p><strong>Fun fact:</strong> {result.funFact}</p>
            <p className="flex gap-2">
              <FlaskConical className="w-4 h-4 mt-0.5 shrink-0 text-terracotta" />
              <span><strong>Try this:</strong> {result.tryThis}</span>
            </p>
          </div>

          {result.relatedTopicIds.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-ink mb-3">Go deeper</h3>
              <div className="flex flex-wrap gap-2">
                {result.relatedTopicIds.map((id) => (
                  <button
                    key={id}
                    onClick={() => navigate({ name: 'discovery', topicId: id })}
                    className="flex items-center gap-2 rounded-lg bg-forest-pale px-4 py-2 text-sm font-medium text-forest hover:bg-forest hover:text-paper transition-colors"
                  >
                    {getTopic(id)?.question} <ArrowRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-ink-faint font-serif italic">
            AI-generated and can be wrong — treat it as a starting point for curiosity.
          </p>
        </section>
      )}
    </div>
  );
}