import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import { FlagGB } from "@/components/graphics/Flags";

/**
 * Flat blue band of four figures, directly under the photograph.
 *
 * This is the page's motion piece. The background is animated rather than a
 * video file: panning diagonal stripes, a drifting Union Jack watermark and a
 * pulsing ring. It costs nothing to download, scales to any width and stops
 * dead under `prefers-reduced-motion`, none of which is true of a video.
 *
 * To use a real video instead, drop the file into `public/` and replace the
 * decorative block below with:
 *
 *   <video
 *     className="absolute inset-0 -z-10 size-full object-cover opacity-25"
 *     src="/your-file.mp4"
 *     autoPlay muted loop playsInline
 *     aria-hidden="true"
 *   />
 *
 * Keep it muted and looping, and keep the opacity low enough that the figures
 * stay legible on top of it.
 */
export default function Facts({ dict }: { dict: Dictionary }) {
  return (
    <section
      aria-label={dict.facts.title}
      className="on-dark relative isolate overflow-hidden bg-blue text-white"
    >
      {/* --- Animated background --------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Panning diagonal stripes */}
        <div className="stripe-field absolute inset-0 animate-stripes motion-reduce:animate-none" />

        {/* Drifting flag watermark */}
        <div className="absolute -right-[8%] top-1/2 w-[46vw] max-w-xl -translate-y-1/2 animate-flag-sway opacity-[0.1] saturate-[0.6] motion-reduce:animate-none">
          <FlagGB className="h-auto w-full" />
        </div>

        {/* Pulsing ring */}
        <div className="absolute -left-24 top-1/2 size-[26rem] -translate-y-1/2 animate-pulse-ring rounded-full border-2 border-white/25 motion-reduce:animate-none" />

        {/* Keeps the figures readable over the moving background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,57,166,0.85)_0%,rgba(0,57,166,0.55)_55%,rgba(0,57,166,0.35)_100%)]" />
      </div>

      {/* --- Figures ---------------------------------------------------- */}
      <div className="container-x relative">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {dict.facts.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className={`py-10 sm:py-12 ${
                i % 2 === 1 ? "border-l border-white/25 pl-6 sm:pl-10" : "pr-6"
              } ${i > 1 ? "border-t border-white/25 lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-white/25 lg:pl-10" : ""
              }`}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-shadow-lift text-[clamp(2.5rem,5.5vw,4rem)] font-extrabold leading-none tracking-[-0.05em] tabular-nums">
                {item.value}
              </dd>
              <dd className="text-shadow-lift mt-3 text-sm font-semibold" aria-hidden="true">
                {item.label}
              </dd>
              <dd className="text-shadow-lift mt-1 max-w-[24ch] text-xs leading-relaxed text-white/80">
                {item.note}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
