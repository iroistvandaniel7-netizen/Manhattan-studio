"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A row of cards you swipe through, with the next one showing at the edge.
 *
 * The peek is the whole mechanism: a card cut off at the frame is the only
 * honest way a static row says "there is more this way", and it is what makes
 * the swipe discoverable without a caption telling people to swipe.
 *
 * Snapping is `proximity`, not `mandatory`. Mandatory fights a reader who
 * wants to stop between two cards and drags the rail out from under a slow
 * swipe; proximity tidies up an almost-aligned stop and otherwise stays out of
 * the way.
 *
 * The arrows are a convenience over the scroll, never a replacement for it:
 * everything they do can be done by swiping, by trackpad, or — because the
 * rail is focusable and carries a group role — by keyboard. They hide
 * themselves when every card already fits, which on a wide screen is most of
 * the time; two permanently dead buttons beside a heading are worse than none.
 */
export default function CardRail({
  label,
  previous,
  next,
  heading,
  intro,
  children,
  className = "",
  tone = "light",
}: {
  /** Names the rail for assistive technology — it is a scrollable region. */
  label: string;
  previous: string;
  next: string;
  /** Rendered to the left of the arrows. */
  heading?: React.ReactNode;
  /**
   * Rendered between the heading row and the rail. Standing copy belongs here
   * rather than inside `heading`: the arrows align to the bottom of that row,
   * so a paragraph in it drags them down away from the title they belong to.
   */
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  /*
   * `scrollWidth` and `clientWidth` differ by sub-pixel amounts on plenty of
   * layouts that do not actually overflow, so a bare `>` shows arrows for a
   * rail with nowhere to go. A couple of pixels of slack is the difference
   * between arrows that mean something and arrows that lie.
   */
  const measure = useCallback(() => {
    const element = rail.current;
    if (!element) return;
    const room = element.scrollWidth - element.clientWidth;
    setAtStart(element.scrollLeft <= 2);
    setAtEnd(room <= 2 || element.scrollLeft >= room - 2);
  }, []);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    measure();
    element.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    for (const child of Array.from(element.children)) observer.observe(child);
    return () => {
      element.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  const step = (direction: 1 | -1) => {
    const element = rail.current;
    if (!element) return;
    /* One card plus its gap, measured off the first card rather than assumed:
       the card width is a clamp and changes with the viewport. */
    const card = element.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    const by = card ? card.offsetWidth + gap : element.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({ left: by * direction, behavior: reduced ? "auto" : "smooth" });
  };

  const hidden = atStart && atEnd;

  const arrow =
    tone === "dark"
      ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-ink disabled:opacity-30"
      : "border-ink/25 text-ink hover:border-accent hover:bg-accent hover:text-white disabled:opacity-25";

  return (
    <div className={className}>
      {(heading || !hidden) && (
        <div className="flex items-end justify-between gap-6">
          {heading}
          {!hidden && (
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                data-rail-prev
                onClick={() => step(-1)}
                disabled={atStart}
                aria-label={previous}
                className={`flex size-12 items-center justify-center rounded-full border text-lg leading-none transition-colors duration-200 disabled:cursor-not-allowed ${arrow}`}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                data-rail-next
                onClick={() => step(1)}
                disabled={atEnd}
                aria-label={next}
                className={`flex size-12 items-center justify-center rounded-full border text-lg leading-none transition-colors duration-200 disabled:cursor-not-allowed ${arrow}`}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          )}
        </div>
      )}

      {intro}

      {/*
        `tabIndex={0}` because a scrollable box is only keyboard-reachable if it
        can hold focus, and a rail nobody can reach with the arrow keys is a
        rail some readers simply cannot see the end of.

        The negative margin and matching padding let the first card sit flush
        with the heading while the rail itself still bleeds to the edge of the
        screen — a card clipped by the container's padding reads as a mistake,
        one running off the screen reads as a row.

        `scroll-pl` has to match that padding. Snap alignment measures from the
        scrollport edge, not from the padding box, so without it the browser
        scrolls the rail 64px on load to align the first card — starting the
        row already nudged, and out of line with the heading above it.
      */}
      <div
        ref={rail}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-[clamp(1.25rem,5vw,4rem)] mt-8 flex snap-x snap-proximity gap-5 overflow-x-auto scroll-pl-[clamp(1.25rem,5vw,4rem)] scroll-smooth px-[clamp(1.25rem,5vw,4rem)] pb-2 sm:mt-10 sm:gap-6"
      >
        {children}
      </div>
    </div>
  );
}
