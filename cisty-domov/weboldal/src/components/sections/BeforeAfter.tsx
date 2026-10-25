"use client";

import { useId, useState } from "react";
import { BEFORE_AFTER } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { Check } from "@/components/graphics/Icons";

/**
 * One living room drawn twice — as found, and as left — with a handle to drag
 * between them. The control underneath is a real range input stretched over
 * the picture, so mouse, touch and arrow keys all work and a screen reader
 * hears a slider.
 *
 * An illustration on purpose: it shows what changes without pretending to be
 * a photograph of a customer's flat. Real before/after photos belong in the
 * gallery once there are some.
 */
export default function BeforeAfter() {
  const uid = useId();
  const [value, setValue] = useState(52);

  return (
    <section className="relative isolate overflow-hidden bg-paper py-section" aria-labelledby="ba-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>{BEFORE_AFTER.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="ba-title" className="mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98]">
              {BEFORE_AFTER.title}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {BEFORE_AFTER.points.map((point, i) => (
              <Reveal as="li" key={point.title} delay={120 + i * 60} className="flex gap-3.5">
                <Check className="mt-0.5 size-6 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.02em]">{point.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate-600">{point.desc}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(11,45,91,0.16)] ring-1 ring-line">
            <div className="relative aspect-[8/5] select-none">
              <Room className="absolute inset-0 size-full" />
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
                aria-hidden="true"
              >
                <Room dirty className="absolute inset-0 size-full" />
              </div>

              {/* Tags */}
              <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {BEFORE_AFTER.before}
              </span>
              <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white">
                {BEFORE_AFTER.after}
              </span>

              {/* Handle */}
              <div
                aria-hidden="true"
                className="ba-handle pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(11,45,91,0.15)]"
                style={{ left: `${value}%` }}
              >
                <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-accent shadow-[0_8px_24px_rgba(11,45,91,0.25)]">
                  <svg viewBox="0 0 24 24" fill="none" className="size-5">
                    <path d="M9 7 4 12l5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <label htmlFor={`${uid}-ba`} className="sr-only">
                {BEFORE_AFTER.sliderLabel}
              </label>
              <input
                id={`${uid}-ba`}
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                className="absolute inset-0 size-full cursor-ew-resize opacity-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The living room. `dirty` adds what a cleaning takes away. */
function Room({ dirty = false, className = "" }: { dirty?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {/* Wall and floor */}
      <rect width="800" height="360" fill="#EAF2FD" />
      <rect y="360" width="800" height="140" fill="#D6E5FA" />
      <path d="M0 360h800" stroke="#BFD7FA" strokeWidth="6" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${i * 120 - 40} 500 L${i * 100 + 20} 360`} stroke="#C7DAF6" strokeWidth="2" />
      ))}

      {/* Window */}
      <rect x="470" y="60" width="210" height="200" rx="6" fill="#7FB0F5" />
      <circle cx="630" cy="110" r="26" fill="#FFF6D6" />
      <path d="M470 220 Q540 190 600 212 T680 205 V260 H470Z" fill="#BFD7FA" />
      <rect x="470" y="60" width="210" height="200" rx="6" fill="none" stroke="#0B2D5B" strokeWidth="10" />
      <path d="M575 60v200M470 160h210" stroke="#0B2D5B" strokeWidth="7" />
      <rect x="458" y="258" width="234" height="12" rx="3" fill="#0B2D5B" />

      {/* Picture on the wall: the house mark */}
      <g transform={dirty ? "rotate(-9 230 140)" : undefined}>
        <rect x="170" y="90" width="120" height="100" rx="4" fill="#FFFFFF" stroke="#0B2D5B" strokeWidth="7" />
        <path d="M230 112 252 130v38h-44v-38Z" fill="#1B63D6" stroke="#1B63D6" strokeWidth="6" strokeLinejoin="round" />
        <path d="M230 134c.8 7 2.4 8.6 9.4 9.4-7 .8-8.6 2.4-9.4 9.4-.8-7-2.4-8.6-9.4-9.4 7-.8 8.6-2.4 9.4-9.4Z" fill="#FFFFFF" />
      </g>

      {/* Lamp */}
      <path d="M90 360V200" stroke="#0B2D5B" strokeWidth="6" />
      <path d="M58 200h64l-12-46H70Z" fill="#1B63D6" />
      <ellipse cx="90" cy="362" rx="30" ry="6" fill="#0B2D5B" />

      {/* Sofa */}
      <rect x="160" y="270" width="290" height="80" rx="20" fill="#1B63D6" />
      <rect x="140" y="250" width="50" height="110" rx="20" fill="#144AA3" />
      <rect x="420" y="250" width="50" height="110" rx="20" fill="#144AA3" />
      <rect x="180" y="240" width="120" height="50" rx="16" fill="#3A7BE0" />
      <rect x="310" y="240" width="120" height="50" rx="16" fill="#3A7BE0" />
      <rect x="200" y="226" width="56" height="44" rx="12" fill={dirty ? "#9CA9BC" : "#FFFFFF"} transform={dirty ? "rotate(18 228 248)" : "rotate(-8 228 248)"} />
      <path d="M170 360v14M440 360v14" stroke="#0B2D5B" strokeWidth="8" strokeLinecap="round" />

      {/* Rug */}
      <ellipse cx="320" cy="430" rx="210" ry="40" fill="#BFD7FA" />
      <ellipse cx="320" cy="430" rx="170" ry="28" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="10 10" />

      {/* Plant */}
      <path d="M690 380h60l-8 70h-44Z" fill="#0B2D5B" />
      <g fill={dirty ? "#7C9AC4" : "#1B63D6"}>
        <path d="M720 380c-6-50-44-70-64-72 4 34 28 62 64 72Z" />
        <path d="M720 380c4-56 34-86 60-92 0 40-24 76-60 92Z" />
        <path d="M720 380c-2-36 6-66 0-96-14 30-16 64 0 96Z" opacity=".8" />
      </g>

      {dirty ? (
        <g>
          {/* A grey film over everything */}
          <rect width="800" height="500" fill="#6E6450" opacity=".16" />
          {/* Smears on the glass */}
          <g fill="#8A7E66" opacity=".45">
            <ellipse cx="520" cy="110" rx="34" ry="18" />
            <ellipse cx="620" cy="200" rx="40" ry="16" />
            <ellipse cx="540" cy="222" rx="22" ry="10" />
          </g>
          <path d="M490 80l40 30M600 90l50 40M500 180l50 30" stroke="#8A7E66" strokeWidth="5" strokeLinecap="round" opacity=".5" />
          {/* Cobweb in the corner */}
          <g stroke="#7D8794" strokeWidth="1.6" fill="none" opacity=".8">
            <path d="M0 0l80 80M0 0l100 30M0 0l30 100M0 0l60 110" />
            <path d="M24 8c6 10 12 16 22 18M40 14c10 14 20 22 36 26M8 26c10 6 16 14 18 24M14 46c14 8 22 18 26 34" />
          </g>
          {/* Floor: stains, crumbs, dust, scattered paper, a sock */}
          <g fill="#8A7E66" opacity=".5">
            <ellipse cx="230" cy="420" rx="40" ry="11" />
            <ellipse cx="560" cy="460" rx="54" ry="12" />
            <ellipse cx="420" cy="392" rx="26" ry="8" />
          </g>
          <g fill="#6E6450">
            {[
              [300, 405], [312, 412], [330, 400], [520, 440], [532, 448], [610, 420], [150, 450], [640, 470], [360, 470], [372, 462],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
            ))}
          </g>
          <g fill="#A49B88" opacity=".9">
            <circle cx="120" cy="400" r="12" />
            <circle cx="132" cy="394" r="8" />
            <circle cx="770" cy="470" r="10" />
          </g>
          <rect x="470" y="470" width="60" height="40" rx="2" fill="#FFFFFF" transform="rotate(-14 500 490)" stroke="#C7CDD6" strokeWidth="2" />
          <rect x="590" y="380" width="50" height="34" rx="2" fill="#FFFFFF" transform="rotate(12 615 397)" stroke="#C7CDD6" strokeWidth="2" />
          <path d="M260 470c10-14 30-14 34 0l-4 14h-24Z" fill="#9CA9BC" />
          {/* Dust on the lamp shade and the sofa */}
          <path d="M66 162h52M64 176h56" stroke="#A49B88" strokeWidth="4" strokeDasharray="3 6" />
          <path d="M190 300h240" stroke="#A49B88" strokeWidth="5" strokeDasharray="2 9" />
        </g>
      ) : (
        <g fill="#FFFFFF">
          {/* Glints on the clean glass and floor */}
          {[
            [540, 100, 10],
            [650, 196, 7],
            [610, 440, 9],
            [250, 410, 7],
          ].map(([x, y, s]) => (
            <path
              key={`${x}-${y}`}
              d={`M${x} ${y - s}c${s * 0.12} ${s * 0.7} ${s * 0.3} ${s * 0.88} ${s} ${s}c${-s * 0.7} ${s * 0.12} ${-s * 0.88} ${s * 0.3} ${-s} ${s}c${-s * 0.12} ${-s * 0.7} ${-s * 0.3} ${-s * 0.88} ${-s} ${-s}c${s * 0.7} ${-s * 0.12} ${s * 0.88} ${-s * 0.3} ${s} ${-s}Z`}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
