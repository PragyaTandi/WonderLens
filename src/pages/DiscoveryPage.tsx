import { useState } from 'react';
import { gemmaChat } from '@/lib/gemma';
import { ArrowLeft, Bookmark, Lightbulb, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import type { PageRoute } from '@/data/types';
import { getTopic } from '@/data/topics';
import { DiscoveryCard } from '@/components/DiscoveryCard';
import { AskGemma } from '@/components/AskGemma';

interface DiscoveryPageProps {
  topicId: string;
  navigate: (r: PageRoute) => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
}

const phases = ['Notice', 'Wonder', 'Predict', 'Explore', 'Discover', 'Formalise', 'Apply'];

export function DiscoveryPage({ topicId, navigate, isSaved, toggleSave }: DiscoveryPageProps) {
  const topic = getTopic(topicId);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());
  const [showHints, setShowHints] = useState<Set<number>>(new Set());

  const [generatedAnswers, setGeneratedAnswers] = useState<Record<number, string>>({});
  const [loadingAnswers, setLoadingAnswers] = useState<Set<number>>(new Set());
  const [answerErrors, setAnswerErrors] = useState<Record<number, string>>({});
  if (!topic) {
    return (
      <div className="container-editorial py-24 text-center">
        <h1 className="font-serif text-2xl text-ink mb-3">Discovery not found</h1>
        <p className="text-ink-muted mb-6">This topic may have been moved or removed.</p>
        <button
          onClick={() => navigate({ name: 'home' })}
          className="text-forest font-medium hover:underline"
        >
          Return to the discovery board
        </button>
      </div>
    );
  }

  const currentTopic = topic;
  const d = topic.discovery;
  const relatedTopics = d.relatedDiscoveryIds
    .map((id) => getTopic(id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  const toggleSet = (set: Set<number>, idx: number): Set<number> => {
    const next = new Set(set);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    return next;
  };

  async function handleReveal(index: number, phase: (typeof d.learningFlow)[number]) {
  // If the answer is already visible, hide it.
  if (revealedAnswers.has(index)) {
    setRevealedAnswers((previous) => {
      const next = new Set(previous);
      next.delete(index);
      return next;
    });
    return;
  }

  // Reuse an answer already generated for this phase.
  if (generatedAnswers[index]) {
    setRevealedAnswers((previous) => new Set(previous).add(index));
    return;
  }

  setLoadingAnswers((previous) => new Set(previous).add(index));

  setAnswerErrors((previous) => {
    const next = { ...previous };
    delete next[index];
    return next;
  });

  try {
    const answer = await gemmaChat({
      messages: [
        {
          role: 'system',
          content: [
            'You are the WonderLens AI science and STEM tutor.',
            'Teach curious students using clear, beginner-friendly language.',
            'Generate an original answer to the specific learning question.',
            'Use the topic context to make the answer relevant.',
            'Explain the reasoning rather than simply giving a one-line answer.',
            'Use a concrete example when helpful.',
            'Keep the answer under 120 words.',
            'Do not search for or select existing topics.',
            'Return only the educational answer.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [
            `Discovery topic: ${currentTopic.question}`,
            `Topic summary: ${currentTopic.shortAnswer}`,
            `Learning phase: ${phase.phase}`,
            `Question: ${phase.question}`,
            userAnswers[index]?.trim()
              ? `The student's answer: ${userAnswers[index]}`
              : 'The student has not provided an answer yet.',
            'Generate an educational response that explains this question.',
            'If the student provided an answer, respond to their reasoning constructively.',
          ].join('\n\n'),
        },
      ],
    });

    if (!answer.trim()) {
      throw new Error('Gemma returned an empty answer. Please try again.');
    }

    setGeneratedAnswers((previous) => ({
      ...previous,
      [index]: answer.trim(),
    }));

    setRevealedAnswers((previous) => new Set(previous).add(index));
  } catch (error) {
    setAnswerErrors((previous) => ({
      ...previous,
      [index]:
        error instanceof Error
          ? error.message
          : 'Gemma could not generate an answer. Please try again.',
    }));
  } finally {
    setLoadingAnswers((previous) => {
      const next = new Set(previous);
      next.delete(index);
      return next;
    });
  }
}
  return (
    <div className="animate-fade-in">
      {/* Back nav */}
      <div className="container-editorial pt-6 pb-2">
        <button
          onClick={() => navigate({ name: 'explore' })}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to discoveries
        </button>
      </div>

      {/* Title section */}
      <section className="container-editorial pt-4 pb-8">
        <span className="inline-block text-xs font-mono text-forest tracking-wider uppercase mb-3">
          {topic.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.15] mb-4 text-balance max-w-3xl">
          {topic.question}
        </h1>
        <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">{d.introQuestion}</p>
      </section>

      {/* Hero image with annotations */}
      <section className="container-editorial pb-8">
        <figure className="relative rounded-xl overflow-hidden bg-page shadow-sm">
          <img
            src={topic.image}
            alt={topic.imageAlt}
            className="w-full max-h-[520px] object-cover"
          />
          {d.annotations && (
            <div className="absolute inset-0 pointer-events-none">
              {d.annotations.map((ann, i) => {
                const positions = [
                  { top: '15%', left: '8%' },
                  { top: '50%', left: '85%' },
                  { top: '80%', left: '12%' },
                ];
                const pos = positions[i] ?? positions[0];
                return (
                  <div key={ann.number} className="absolute" style={pos}>
                    <div className="flex items-center gap-2 bg-paper/90 backdrop-blur-sm rounded-full pl-2 pr-3 py-1 shadow-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-forest text-paper text-xs font-mono font-semibold">
                        {ann.number}
                      </span>
                      <span className="text-xs text-ink font-medium whitespace-nowrap">
                        {ann.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </figure>
        <figcaption className="mt-3 text-sm text-ink-muted italic font-serif max-w-2xl">
          {d.imageCaption}
        </figcaption>
      </section>

      {/* Short answer + save */}
      <section className="container-editorial pb-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-forest-pale rounded-xl border border-forest/10">
          <p className="font-serif text-lg text-ink leading-relaxed flex-1">
            {topic.shortAnswer}
          </p>
          <button
            onClick={() => toggleSave(topic.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              isSaved(topic.id)
                ? 'bg-mustard text-paper'
                : 'bg-page text-ink-muted border border-ink/15 hover:border-forest hover:text-forest'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved(topic.id) ? 'fill-paper' : ''}`}
              strokeWidth={1.5}
            />
            {isSaved(topic.id) ? 'Saved' : 'Save'}
          </button>
        </div>
      </section>

      {/* Explanation sections */}
      <section className="container-editorial pb-8">
        <div className="max-w-2xl">
          {d.explanationSections.map((section, i) => (
            <div key={i} className="mb-8">
              <h2 className="font-serif text-xl text-ink mb-3">{section.heading}</h2>
              <p className="text-ink leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fact panels + equation */}
      <section className="container-editorial pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fact panels */}
          <div className="p-5 bg-page rounded-xl border border-ink/8">
            <h3 className="text-xs font-mono text-ink-muted tracking-wider uppercase mb-4">
              Key Facts
            </h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              {d.factPanels.map((fact, i) => (
                <div key={i}>
                  <dt className="text-xs text-ink-faint mb-1">{fact.label}</dt>
                  <dd className="font-serif text-base text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Equation */}
          {d.equation && (
            <div className="p-5 bg-ink rounded-xl text-paper">
              <h3 className="text-xs font-mono text-paper/60 tracking-wider uppercase mb-4">
                Equation
              </h3>
              <p className="font-mono text-lg text-paper mb-3">{d.equation.expression}</p>
              <p className="text-sm text-paper/70 leading-relaxed">{d.equation.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* Binary Search interactive demo */}
      {topic.id === 'binary-search' && (
        <section className="container-editorial pb-8">
          <BinarySearchDemo />
        </section>
      )}

      {/* Learning flow */}
      <section className="container-editorial pb-12">
        <div className="p-6 sm:p-8 bg-page rounded-xl border border-ink/8">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-ink mb-2">Guided Discovery</h2>
            <p className="text-sm text-ink-muted">
              Work through each phase in order. Answer the question, then reveal the response.
              Use a hint if you are stuck.
            </p>
          </div>

          {/* Phase progress bar */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto scrollbar-thin pb-1">
            {phases.map((phase, i) => {
              const isActive = revealedAnswers.has(i) || userAnswers[i]?.trim();
              return (
                <div key={phase} className="flex items-center whitespace-nowrap">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      isActive ? 'bg-forest text-paper' : 'bg-paper text-ink-faint border border-ink/8'
                    }`}
                  >
                    {isActive && <CheckCircle2 className="w-3 h-3" strokeWidth={2} />}
                    {phase}
                  </span>
                  {i < phases.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-ink-faint mx-0.5" strokeWidth={1.5} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Phases */}
          <div className="space-y-6">
            {d.learningFlow.map((phase, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border transition-colors ${
                  revealedAnswers.has(i)
                    ? 'border-forest/20 bg-forest-pale/50'
                    : 'border-ink/8 bg-paper'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-paper text-xs font-mono">
                    {i + 1}
                  </span>
                  <span className="text-xs font-mono text-ink-muted tracking-wider uppercase">
                    {phase.phase}
                  </span>
                </div>

                <p className="text-ink leading-relaxed mb-4">{phase.question}</p>

                <textarea
                  value={userAnswers[i] ?? ''}
                  onChange={(e) => setUserAnswers({ ...userAnswers, [i]: e.target.value })}
                  placeholder="Your response..."
                  rows={2}
                  className="w-full px-3 py-2 bg-paper border border-ink/10 rounded-lg text-sm text-ink placeholder:text-ink-faint resize-none focus:outline-none focus:border-forest transition-colors"
                />

                <div className="flex items-center gap-3 mt-3">
                  {phase.hint && (
                    <button
                      onClick={() => setShowHints(toggleSet(showHints, i))}
                      className="flex items-center gap-1 text-sm text-mustard hover:text-mustard-light transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {showHints.has(i) ? 'Hide hint' : 'Hint'}
                    </button>
                  )}
                  <button
                    onClick={() => handleReveal(i, phase)}
                    className="flex items-center gap-1 text-sm text-forest hover:text-forest-dark transition-colors font-medium"
                  >
                    {loadingAnswers.has(i)
  ? 'Gemma is thinking...'
  : revealedAnswers.has(i)
    ? 'Hide response'
    : 'Ask Gemma for an answer'}
    disabled={loadingAnswers.has(i)}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${revealedAnswers.has(i) ? 'rotate-180' : ''}`}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                {phase.hint && showHints.has(i) && (
                  <div className="mt-3 p-3 bg-mustard-pale/50 rounded-lg border border-mustard/15">
                    <p className="text-sm text-ink-muted">
                      <span className="font-medium text-mustard">Hint:</span> {phase.hint}
                    </p>
                  </div>
                )}

                {answerErrors[i] && (
  <div
    role="alert"
    className="mt-3 p-3 rounded-lg border border-terracotta/20 bg-page"
  >
    <p className="text-sm text-terracotta">
      {answerErrors[i]}
    </p>

    <button
      type="button"
      onClick={() => handleReveal(i, phase)}
      className="mt-2 text-sm font-medium text-forest hover:underline"
    >
      Try again
    </button>
  </div>
)}

{loadingAnswers.has(i) && (
  <div
    role="status"
    className="mt-3 p-3 rounded-lg border border-forest/15 bg-forest-pale"
  >
    <p className="text-sm text-ink-muted">
      Gemma is generating an explanation for this question...
    </p>
  </div>
)}

{revealedAnswers.has(i) && generatedAnswers[i] && (
  <div className="mt-3 p-3 bg-forest-pale rounded-lg border border-forest/15 animate-fade-in">
    <p className="text-xs font-mono uppercase tracking-wider text-forest mb-2">
      Generated by Gemma
    </p>

    <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
      {generatedAnswers[i]}
    </p>

    <p className="mt-3 text-xs text-ink-muted">
      AI-generated content can contain mistakes. Use it as a starting point
      for further exploration.
    </p>
  </div>
)}
              </div>
            ))}
          </div>
        </div>
      </section>
      <AskGemma topic={topic} />
      {/* Related discoveries */}
      {relatedTopics.length > 0 && (
        <section className="container-editorial pb-12">
          <h2 className="font-serif text-xl text-ink mb-4">Related Discoveries</h2>
          <div className="masonry sm:columns-2 lg:columns-3">
            {relatedTopics.map((t, i) => (
              <DiscoveryCard
                key={t.id}
                topic={t}
                navigate={navigate}
                isSaved={isSaved(t.id)}
                onToggleSave={toggleSave}
                variant={['default', 'tall'][i % 2] as any}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Interactive Binary Search demo component
function BinarySearchDemo() {
  const [array] = useState([3, 7, 12, 18, 24, 31, 42, 56, 68, 75, 83, 91]);
  const [target, setTarget] = useState(42);
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const steps = computeBinarySearchSteps(array, target);

  const currentStep = steps[Math.min(step, steps.length - 1)];

  const stepForward = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setAutoPlay(false);
  };

  const reset = () => {
    setStep(0);
    setAutoPlay(false);
  };

  
  return (
    <div className="p-6 sm:p-8 bg-page rounded-xl border border-ink/8">
      <h3 className="font-serif text-xl text-ink mb-2">Interactive: Binary Search in Action</h3>
      <p className="text-sm text-ink-muted mb-6">
        Watch how each comparison eliminates half the remaining array. Try different targets.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="text-sm text-ink-muted">Target:</label>
        <select
          value={target}
          onChange={(e) => {
            setTarget(Number(e.target.value));
            setStep(0);
            setAutoPlay(false);
          }}
          className="px-3 py-1.5 bg-paper border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-forest"
        >
          {array.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={stepForward}
            disabled={step >= steps.length - 1}
            className="px-3 py-1.5 bg-forest text-paper rounded-lg text-sm font-medium transition-all hover:bg-forest-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Step
          </button>
          <button
            onClick={() => { setAutoPlay(!autoPlay); if (step >= steps.length - 1) { setStep(0); setAutoPlay(true); } }}
            className="px-3 py-1.5 bg-paper text-ink-muted border border-ink/15 rounded-lg text-sm font-medium transition-all hover:border-forest hover:text-forest"
          >
            {autoPlay ? 'Pause' : 'Auto-play'}
          </button>
          <button
            onClick={reset}
            className="px-3 py-1.5 bg-paper text-ink-muted border border-ink/15 rounded-lg text-sm font-medium transition-all hover:border-ink/30"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {array.map((value, i) => {
          const isInRange = i >= currentStep.low && i <= currentStep.high;
          const isMid = i === currentStep.mid;
          const isFound = currentStep.found && i === currentStep.mid;
          const isEliminated = !isInRange && !isFound;

          return (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-center w-12 h-14 rounded-lg border-2 text-sm font-mono font-semibold transition-all duration-300 ${
                isFound
                  ? 'bg-forest text-paper border-forest scale-110 shadow-sm'
                  : isMid
                  ? 'bg-mustard text-paper border-mustard scale-105 shadow-sm'
                  : isInRange
                  ? 'bg-paper text-ink border-dusty/40'
                  : 'bg-paper text-ink-faint border-ink/5 opacity-30'
              }`}
            >
              {value}
              {isMid && !isFound && (
                <span className="absolute -bottom-5 text-[10px] font-sans text-mustard font-medium">
                  mid
                </span>
              )}
              {isFound && (
                <span className="absolute -bottom-5 text-[10px] font-sans text-forest font-medium">
                  found!
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Step info */}
      <div className="p-4 bg-forest-pale/50 rounded-lg border border-forest/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-ink-muted">
            Step {Math.min(step + 1, steps.length)} of {steps.length}
          </span>
        </div>
        <p className="text-sm text-ink leading-relaxed">
          {currentStep.message}
        </p>
        {!currentStep.found && step >= steps.length - 1 && currentStep.low > currentStep.high && (
          <p className="text-sm text-terracotta mt-2">
            Target {target} was not found in the array.
          </p>
        )}
      </div>
    </div>
  );
}

interface SearchStep {
  low: number;
  high: number;
  mid: number;
  found: boolean;
  message: string;
}

function computeBinarySearchSteps(arr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = arr.length - 1;

  steps.push({
    low,
    high,
    mid: -1,
    found: false,
    message: `Start: searching for ${target} in a sorted array of ${arr.length} elements. Range: [${low}, ${high}].`,
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      steps.push({
        low,
        high,
        mid,
        found: true,
        message: `Found! ${target} is at index ${mid}. It took ${steps.length} comparisons.`,
      });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        low,
        high,
        mid,
        found: false,
        message: `Mid value ${arr[mid]} < target ${target}. Eliminate the left half. New range: [${mid + 1}, ${high}].`,
      });
      low = mid + 1;
    } else {
      steps.push({
        low,
        high,
        mid,
        found: false,
        message: `Mid value ${arr[mid]} > target ${target}. Eliminate the right half. New range: [${low}, ${mid - 1}].`,
      });
      high = mid - 1;
    }
  }

  if (steps[steps.length - 1].found === false && steps[steps.length - 1].mid !== -1 && low > high) {
    steps.push({
      low,
      high,
      mid: -1,
      found: false,
      message: `Target ${target} is not in the array. Range is now empty.`,
    });
  }

  return steps;
}
