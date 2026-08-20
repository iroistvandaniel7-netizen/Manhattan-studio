"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Very restrained parallax for the background graphics.
 *
 * Position is written straight to the element's transform inside a
 * requestAnimationFrame tick — no state, so no React re-render per scroll
 * frame. Disabled entirely under `prefers-reduced-motion: reduce` and on
 * coarse pointers, where it costs more than it adds.
 */
export default function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  /** Fraction of scroll distance to offset by. Keep well under 0.3. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(min-width: 768px)");
    if (reduced.matches || !fine.matches) return;

    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = node.getBoundingClientRect();
      // Distance of the element's centre from the viewport's centre.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      node.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(node);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
