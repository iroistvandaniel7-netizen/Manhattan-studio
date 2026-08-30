"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import { PHOTOS } from "@/lib/gallery";

/**
 * The studio's photographs, and the viewer that opens one full size.
 *
 * Each picture is a link to the image file itself, and the script intercepts
 * the click to open the viewer instead. That ordering matters: with no
 * scripting the links still work and still lead to the full photograph, so the
 * gallery degrades to a plain gallery rather than to four pictures wired to a
 * handler that never runs.
 *
 * The grid is twelve columns and each photograph claims five or seven of them,
 * alternating. The four are different shapes — two tall portraits, a near
 * square, another portrait — and a uniform grid can only fit them by cropping.
 * Giving each its own width lets every one keep the frame it was taken in, and
 * the alternation is what stops four unequal pictures reading as a mistake.
 */
export default function GalleryGrid({ dict }: { dict: Dictionary }) {
  const copy = dict.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /* Where the focus came from, so Escape can put it back on the right picture. */
  const openerRef = useRef<HTMLAnchorElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback((by: number) => {
    setOpen((current) =>
      current === null
        ? current
        : (current + by + PHOTOS.length) % PHOTOS.length,
    );
  }, []);

  /* Lock the page, trap the focus, and take the arrow keys — the same contract
     the basket and the menu keep, because a viewer over the page is the same
     kind of thing. */
  useEffect(() => {
    if (open === null) return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href]",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, step]);

  const shown = open === null ? null : PHOTOS[open];

  return (
    <>
      <ul className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-12">
        {PHOTOS.map((photo, index) => (
          <li
            key={photo.id}
            className={photo.span === 5 ? "lg:col-span-5" : "lg:col-span-7"}
          >
            <Reveal delay={index % 2 === 0 ? 0 : 80}>
              <a
                href={photo.image.src}
                data-photo={photo.id}
                onClick={(event) => {
                  /* Let a modified click do what the reader asked — open the
                     file in a new tab — rather than swallowing it. */
                  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                  event.preventDefault();
                  openerRef.current = event.currentTarget;
                  setOpen(index);
                }}
                aria-label={copy.open}
                className="group relative block overflow-hidden rounded-[1.5rem] bg-accent-soft"
              >
                <Image
                  src={photo.image}
                  alt={copy.photos[photo.id]}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                {/*
                  A magenta wash that lifts on hover. It is the only affordance
                  a photograph can carry without putting furniture on top of it
                  — an icon in the corner of every picture would be four pieces
                  of chrome competing with the pictures they sit on.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/12 group-focus-visible:bg-accent/12"
                />
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      {/*
        Rendered into the body, not where it sits in the markup.

        The gallery section is `isolate`, which is a stacking context, so a
        `z-[70]` child of it does not compete with the page — it competes with
        its siblings, and the whole section then sits below the header at
        `z-50`. The first build of this had the sticky bar drawn across the top
        of the photograph. A portal puts the viewer at the root, where its z
        index means what it says.
      */}
      {shown
        ? createPortal(
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={copy.title}
              data-lightbox
              /* Opaque, not a 95% scrim. The sticky header is a white bar with
                 a magenta button in it, and five per cent of that reads as a
                 bright band across the top of the photograph — a leak rather
                 than a glimpse of the page behind. A viewer for one picture
                 should have nothing else in it. */
              className="fixed inset-0 z-[70] flex flex-col bg-ink p-4 sm:p-6"
            >
              <div className="flex shrink-0 items-center justify-between gap-4">
                <p className="font-mono text-xs font-semibold text-white/55">
                  {(open ?? 0) + 1} / {PHOTOS.length}
                </p>
                <button
                  type="button"
                  onClick={close}
                  data-lightbox-close
                  className="label flex items-center gap-3 px-4 py-3 text-white transition-colors hover:text-accent-lift"
                >
                  {copy.close}
                  <span aria-hidden="true" className="text-lg leading-none">
                    ×
                  </span>
                </button>
              </div>

              {/*
                `fill` with `object-contain`, not an intrinsic image with a
                max height: next/image writes the source's own width and
                height onto the element, and those win the flex negotiation
                over `max-h-full` — a 1080x1440 photograph then runs off the
                top and bottom of a short window.

                `min-h-0` on this row for the same reason: without it the
                image's height wins over the flex basis and pushes the
                caption and the arrows off the bottom of the screen.
              */}
              <div className="relative min-h-0 flex-1 py-4">
                <Image
                  key={shown.id}
                  src={shown.image}
                  alt={copy.photos[shown.id]}
                  fill
                  sizes="90vw"
                  priority
                  className="quiz-in object-contain"
                />
              </div>

              <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-xl text-[0.8125rem] leading-relaxed text-white/70">
                  {copy.photos[shown.id]}
                </p>
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={copy.previous}
                    data-lightbox-prev
                    className="flex size-12 items-center justify-center rounded-full border border-white/25 text-lg leading-none text-white transition-colors hover:border-accent-lift hover:bg-accent-lift hover:text-ink"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={copy.next}
                    data-lightbox-next
                    className="flex size-12 items-center justify-center rounded-full border border-white/25 text-lg leading-none text-white transition-colors hover:border-accent-lift hover:bg-accent-lift hover:text-ink"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
