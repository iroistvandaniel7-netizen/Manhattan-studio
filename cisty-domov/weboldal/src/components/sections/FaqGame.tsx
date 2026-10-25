"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";

/* A bubble grows with its question, so long ones are not crammed. */
function sizeFor(question: string): string {
  if (question.length > 40) return "size-[10rem] sm:size-56";
  if (question.length > 26) return "size-[9.5rem] sm:size-52";
  return "size-[9rem] sm:size-44";
}

const POP_MS = 340;

/**
 * The FAQ as soap bubbles. Each question floats in its own bubble; pressing
 * one pops it and the answer drops into the list underneath, so every answer
 * stays readable once found. A counter tracks how many are cleared, and the
 * last pop ends on the way to the quote form.
 *
 * Bubbles are real buttons, so keyboard and screen readers can play. Without
 * scripting nothing can pop, so the plain question-and-answer list is shown
 * instead (`.game-bare`) — and the page's structured data carries the full
 * list for search engines either way.
 */
export default function FaqGame({ copy }: { copy: Dictionary["faq"] }) {
  const total = copy.items.length;
  const [popped, setPopped] = useState<number[]>([]);
  const [popping, setPopping] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const pop = (index: number) => {
    if (popping !== null || popped.includes(index)) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setPopped((list) => [...list, index]);
      return;
    }
    setPopping(index);
    timer.current = setTimeout(() => {
      setPopped((list) => [...list, index]);
      setPopping(null);
    }, POP_MS);
  };

  const reset = () => {
    setPopped([]);
    setPopping(null);
  };

  const done = popped.length === total;
  const remaining = copy.items.map((item, index) => ({ item, index })).filter(({ index }) => !popped.includes(index));
  /* Newest answer first: the one just popped is the one being read. */
  const found = [...popped].reverse();

  return (
    <>
      {/* Without scripting: the plain list. */}
      <dl className="game-bare mt-14 max-w-4xl border-t border-line">
        {copy.items.map((item) => (
          <div key={item.q} className="border-b border-line py-7">
            <dt className="text-[clamp(1.125rem,1.8vw,1.375rem)] font-bold tracking-[-0.015em]">{item.q}</dt>
            <dd className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{item.a}</dd>
          </div>
        ))}
      </dl>

      <div className="game-board">
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">{copy.lead}</p>
            <p className="rounded-full bg-accent-soft px-5 py-2.5 text-sm font-semibold text-ink tabular-nums" aria-live="polite">
              {popped.length} / {total} {copy.answered}
            </p>
          </div>
        </Reveal>

        {/* The bubbles */}
        <Reveal delay={140}>
          <div className="relative mt-10 rounded-[2rem] bg-paper px-2 py-8 sm:px-10 sm:py-14">
            {done ? (
              <div className="pop-in flex min-h-[18rem] flex-col items-center justify-center text-center">
                <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight">{copy.doneTitle}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate-600">{copy.doneText}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:bg-accent-deep"
                  >
                    {copy.cta}
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full px-8 py-4 text-[0.9375rem] font-semibold text-ink ring-1 ring-ink/25 transition-colors duration-200 hover:ring-ink"
                  >
                    {copy.again}
                  </button>
                </div>
              </div>
            ) : (
              <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-4 sm:gap-8">
                {remaining.map(({ item, index }) => (
                  <li key={item.q} className="bubble-float" style={{ animationDelay: `${-index * 1.3}s`, animationDuration: `${6 + (index % 3)}s` }}>
                    <button
                      type="button"
                      onClick={() => pop(index)}
                      aria-label={item.q}
                      className={`soap-bubble grid place-items-center rounded-full p-4 text-center text-[0.75rem] leading-snug font-semibold text-ink sm:p-7 sm:text-[0.9375rem] ${sizeFor(item.q)} ${
                        popping === index ? "bubble-pop" : ""
                      }`}
                    >
                      <span aria-hidden="true">{item.q}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        {/* What has been found so far, newest first. */}
        {found.length > 0 ? (
          <dl className="mt-10 max-w-4xl border-t border-line" aria-live="polite">
            {found.map((index, i) => {
              const item = copy.items[index];
              return (
                <div key={item.q} className={`border-b border-line py-7 ${i === 0 ? "pop-in" : ""}`}>
                  <dt className="text-[clamp(1.125rem,1.8vw,1.375rem)] font-bold tracking-[-0.015em]">{item.q}</dt>
                  <dd className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                    <span className="label mr-3 text-accent-ink">{copy.answerLabel}</span>
                    {item.a}
                  </dd>
                </div>
              );
            })}
          </dl>
        ) : null}
      </div>
    </>
  );
}
