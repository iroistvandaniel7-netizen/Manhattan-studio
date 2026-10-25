"use client";

import { useEffect, useRef } from "react";
import { MARQUEE, VIDEO } from "@/lib/content";
import { Sparkle } from "@/components/graphics/Icons";

/**
 * The second screen: a full-bleed loop of glass being cleared, one line of
 * type over it and nothing else. The services run along its foot as a slow
 * ribbon.
 *
 * The video is muted, looped and inline, so every phone autoplays it. Under
 * reduced motion it never starts and the poster frame stands in. The file
 * names are all the page knows — drop real footage into `public/video/`
 * under the same names and nothing else changes.
 */
export default function VideoBand() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) {
      video.pause();
      return;
    }
    /* Play only while on screen — no reason to decode video nobody sees. */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const ribbon = [...MARQUEE, ...MARQUEE];

  return (
    <section aria-label={VIDEO.label} className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <div className="relative flex min-h-[86svh] items-center justify-center">
        <video
          ref={ref}
          className="absolute inset-0 -z-20 size-full object-cover"
          src="/video/takaritas.mp4"
          poster="/video/takaritas.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        />
        {/* Enough navy over the film for white type to read, never so much it goes grey. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_50%,rgba(7,31,66,0.35)_0%,rgba(7,31,66,0.7)_100%)]"
        />

        <div className="container-x py-32 text-center">
          <p className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.04em] [text-shadow:0_4px_40px_rgba(7,31,66,0.45)]">
            <span className="block font-semibold">{VIDEO.line}</span>
            <span className="block font-normal text-sky">{VIDEO.lineSoft}</span>
          </p>
          <p className="mx-auto mt-8 max-w-md text-base text-white/80 sm:text-lg">{VIDEO.caption}</p>
        </div>
      </div>

      {/* The services, as a ribbon along the foot of the film. */}
      <div className="relative overflow-hidden border-t border-white/15 bg-ink/80 py-5 backdrop-blur-sm" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap motion-reduce:animate-none">
          {ribbon.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10 font-display text-xl font-medium tracking-[-0.02em] text-white/90 sm:text-2xl">
              {item}
              <Sparkle className="size-4 text-accent-lift" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
