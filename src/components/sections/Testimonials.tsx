"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";

/**
 * Editorial quote carousel.
 *
 * The `author` field on each quote is optional: with it the slide renders an
 * attribution line, without it just the role/source label. That lets real,
 * attributed testimonials be dropped into the dictionaries later without any
 * change here.
 */
export default function Testimonials({ dict }: { dict: Dictionary }) {
  const quotes = dict.method.quotes;
  const count = quotes.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  /* Autoplay, paused on hover, focus, tab-away and reduced motion. */
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  };

  return (
    <section
      id="method"
      className="on-ink relative isolate overflow-hidden bg-park-900 py-section text-cream"
      aria-labelledby="method-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_15%_0%,rgba(47,154,114,0.28),transparent_60%),radial-gradient(60%_80%_at_92%_100%,rgba(240,169,59,0.14),transparent_58%)]"
      />

      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow invert>{dict.method.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="method-title"
                className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em]"
              >
                <NoBreak>{dict.method.title}</NoBreak>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p className="text-base leading-relaxed text-cream/70">
              {dict.method.lead}
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal delay={120} className="mt-14 sm:mt-20">
          <div
            ref={regionRef}
            role="group"
            aria-roledescription="carousel"
            aria-label={dict.method.title}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
              touchStart.current = null;
            }}
            className="relative border-t border-cream/20"
          >
            {/* Oversized opening quotation mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-0 select-none text-[clamp(6rem,14vw,12rem)] font-extrabold leading-none tracking-[-0.06em] text-gold-400/30 sm:-top-10"
            >
              &ldquo;
            </span>

            <div className="relative pt-16 sm:pt-24">
              {/*
               * All slides stay mounted so the container keeps the height of
               * the tallest quote — no layout shift as slides change.
               */}
              <div className="grid">
                {quotes.map((quote, i) => {
                  const current = i === index;
                  return (
                    <figure
                      key={i}
                      aria-hidden={current ? undefined : "true"}
                      className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        current
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0"
                      }`}
                    >
                      <blockquote>
                        <p className="max-w-4xl text-[clamp(1.375rem,3.6vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.025em] text-cream">
                          {quote.text}
                        </p>
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 sm:mt-10">
                        <span aria-hidden="true" className="h-px w-8 bg-gold-400" />
                        {quote.author ? (
                          <span className="text-cream">
                            {quote.author}
                            {quote.role ? (
                              <span className="ml-2 font-medium text-cream/60">
                                {quote.role}
                              </span>
                            ) : null}
                          </span>
                        ) : (
                          <span>{quote.role}</span>
                        )}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-12 flex items-center justify-between gap-6 border-t border-cream/20 pt-6 sm:mt-16">
              <ol className="flex items-center gap-2.5">
                {quotes.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={dict.method.goTo.replace("{n}", String(i + 1))}
                      aria-current={i === index ? "true" : undefined}
                      className="group/dot flex h-6 items-center px-0.5"
                    >
                      <span
                        className={`block h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          i === index
                            ? "w-10 bg-gold-400"
                            : "w-5 bg-cream/40 group-hover/dot:w-8 group-hover/dot:bg-cream"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ol>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label={dict.method.prev}
                  className="flex size-12 items-center justify-center border border-cream/30 transition-colors duration-400 hover:border-gold-400 hover:bg-gold-400 hover:text-ink"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label={dict.method.next}
                  className="flex size-12 items-center justify-center border border-cream/30 transition-colors duration-400 hover:border-gold-400 hover:bg-gold-400 hover:text-ink"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Announces slide changes to screen readers. */}
            <p aria-live="polite" className="sr-only">
              {index + 1} / {count}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
