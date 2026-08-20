"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` the first time it enters the viewport.
 *
 * Renders the final value on the server and under reduced motion, so the
 * number is never missing and the layout never shifts.
 */
export default function Counter({
  value,
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined" ||
      value === 0
    ) {
      return;
    }

    /*
     * `display` starts at the final value so the server-rendered markup is
     * correct and the layout never shifts. The count-up begins inside the
     * observer callback, whose first animation frame sets it to zero — no
     * state is written synchronously from the effect body.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo, so the number lands softly rather than stopping dead.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
