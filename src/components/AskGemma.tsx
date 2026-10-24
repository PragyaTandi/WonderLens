import { useRef, useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import type { Topic } from '@/data/types';
import { gemmaChat, type ChatMsg } from '@/lib/gemma';

export function AskGemma({ topic }: { topic: Topic }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const [streaming, setStreaming] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const context = [
    `Topic: ${topic.question}`,
    `Short answer: ${topic.shortAnswer}`,
    ...topic.discovery.explanationSections.map((s) => `${s.heading}: ${s.body}`),
  ].join('\n');

  const system = `You are the WonderLens guide. Answer the learner's questions about this topic clearly and concisely, for a curious teenager. Prefer the material below; if a question goes beyond it, say so briefly before answering. Keep answers under 120 words.\n\n${context}`;

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const next: ChatMsg[] = [...history, { role: 'user', content: q }];
    setHistory(next);
    setInput('');
    setStreaming('');
    setError(null);
    setLoading(true);
    try {
      const reply = await gemmaChat({
        messages: [{ role: 'system', content: system }, ...next],
        onToken: (t) => setStreaming((s) => s + t),
        signal: controller.signal,
      });
      setHistory([...next, { role: 'assistant', content: reply }]);
      setStreaming('');
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError('Gemma could not answer. Is Ollama running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-editorial pb-12">
      <div className="rounded-xl border border-ink/10 bg-page p-5">
        <h2 className="flex items-center gap-2 font-serif text-xl text-ink mb-3">
          <Sparkles className="w-4 h-4 text-mustard" /> Ask Gemma about this
        </h2>

        <div className="space-y-3 mb-4">
          {history.map((m, i) => (
            <p
              key={i}
              className={`text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user' ? 'text-ink font-medium' : 'text-ink-muted'
              }`}
            >
              {m.content}
            </p>
          ))}
          {streaming && <p className="text-sm leading-relaxed text-ink-muted whitespace-pre-wrap">{streaming}</p>}
          {error && <p className="text-sm text-terracotta">{error}</p>}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Why does this happen? What if…?"
            className="flex-1 rounded-lg border border-ink/10 bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
          />
          <button
            onClick={send}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-medium text-paper hover:bg-forest-dark disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}