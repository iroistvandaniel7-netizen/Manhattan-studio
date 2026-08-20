import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { ParkSky, ParkSkyline, ParkWater } from "@/components/graphics/CentralPark";

/**
 * Full-bleed Central Park at golden hour.
 *
 * The three scene layers parallax at increasing speeds, so the sky drifts
 * slowly behind a skyline that drifts behind the water.
 *
 * Contrast strategy: rather than dropping a heavy scrim over the whole frame
 * — which drains the colour the scene exists for — the headline sits in the
 * bright upper sky as dark ink with a soft light halo, and the supporting
 * copy sits in a frosted cream panel. The lake stays fully saturated.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  const lines = dict.hero.titleLines;

  return (
    // The heavier bottom padding on small screens lifts the card clear of the
    // foreground bank, so the park still reads underneath it.
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-14 lg:pt-36"
      aria-labelledby="hero-title"
    >
      {/* --- Scene ------------------------------------------------------ */}
      <div className="absolute inset-0 -z-10" role="img" aria-label={dict.hero.sceneAlt}>
        <Parallax speed={0.04} className="absolute inset-0">
          <ParkSky className="h-full w-full" />
        </Parallax>

        <Parallax speed={0.09} className="absolute inset-0">
          <ParkSkyline className="h-full w-full" />
        </Parallax>

        <Parallax speed={0.15} className="absolute inset-0">
          <ParkWater className="h-full w-full" />
        </Parallax>
      </div>

      {/* Warm poster wash tying the frame together. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light bg-[radial-gradient(70%_48%_at_62%_44%,rgba(255,198,105,0.55),transparent_72%)]"
      />

      {/* A light lift behind the header only, so the nav stays legible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,rgba(253,250,243,0.72),transparent)]"
      />

      {/* --- Headline, over the open sky -------------------------------- */}
      <div className="container-x relative">
        <Reveal>
          <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-park-900">
            <span aria-hidden="true" className="inline-block size-1.5 bg-sunset-600" />
            {dict.hero.eyebrow}
          </p>
        </Reveal>

        <h1
          id="hero-title"
          className="mt-5 text-[clamp(2.5rem,7.6vw,6.25rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-ink [text-shadow:0_2px_30px_rgba(253,250,243,0.7)] sm:mt-7"
        >
          {lines.map((line, i) => (
            <Reveal key={line} className="line-mask" delay={i * 110}>
              {/* The closing line takes the accent, so the eye lands there. */}
              <span className={i === lines.length - 1 ? "text-sunset-700" : undefined}>
                {line}
              </span>
            </Reveal>
          ))}
        </h1>
      </div>

      {/*
       * Frosted content card, deliberately kept to the left third so the
       * lake, the boats and the far shore stay in view beside it.
       */}
      <div className="container-x relative mt-8 flex items-end justify-between gap-8">
        <Reveal delay={160} className="w-full max-w-xl">
          <div className="border border-cream/60 bg-cream/85 p-5 shadow-[0_24px_60px_-30px_rgba(10,40,32,0.6)] backdrop-blur-xl sm:p-7">
            <p className="text-[0.9375rem] leading-relaxed text-graphite-700 sm:text-[1.0625rem]">
              {dict.hero.lead}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row">
              <Button href="#courses" variant="sunset" withArrow>
                {dict.hero.ctaPrimary}
              </Button>
              <Button href="#contact" variant="outline">
                {dict.hero.ctaSecondary}
              </Button>
            </div>

            <p className="mt-6 flex items-center gap-2.5 border-t border-graphite-200 pt-5 text-xs font-semibold text-park-800">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 animate-float bg-park-500 motion-reduce:animate-none"
              />
              {dict.hero.badge}
            </p>
          </div>
        </Reveal>

        {/* Scroll cue, sitting out on the open water */}
        <Reveal
          delay={260}
          className="hidden shrink-0 flex-col items-center gap-3 pb-2 lg:flex"
        >
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-cream [text-shadow:0_1px_10px_rgba(6,22,18,0.9)] [writing-mode:vertical-rl]">
            {dict.hero.scroll}
          </span>
          <span className="relative block h-14 w-px overflow-hidden bg-cream/40">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-cue bg-gold-400 motion-reduce:animate-none"
            />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
