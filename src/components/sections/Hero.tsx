import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import Skyline from "@/components/graphics/Skyline";
import GridMap from "@/components/graphics/GridMap";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* --- Background layer ------------------------------------------ */}

      {/* Street grid, bleeding off the right edge for an editorial crop. */}
      <Parallax
        speed={0.06}
        className="pointer-events-none absolute -right-[28%] -top-[14%] -z-10 w-[110vw] max-w-none text-graphite-300 opacity-[0.16] sm:-right-[18%] lg:right-[-8%] lg:w-[62vw] lg:opacity-[0.2]"
      >
        <GridMap className="h-auto w-full" strokeWidth={0.9} />
      </Parallax>

      {/* Skyline, deliberately running past the viewport edges. */}
      <Parallax
        speed={0.1}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-[38vh] w-[150%] max-w-none text-graphite-400 opacity-[0.28] sm:h-[42vh] sm:w-[128%] lg:h-[54vh] lg:w-[112%] lg:opacity-[0.22]"
          variant="outline"
          strokeWidth={1.1}
        />
      </Parallax>

      {/* Softens the graphics behind the text so contrast never suffers. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_18%_28%,var(--color-paper)_38%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-paper to-transparent"
      />

      {/* --- Content --------------------------------------------------- */}
      <div className="container-x">
        <Reveal>
          <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
        </Reveal>

        <h1
          id="hero-title"
          className="mt-7 text-[clamp(2.75rem,10.5vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] sm:mt-9"
        >
          {dict.hero.titleLines.map((line, i) => (
            <Reveal key={line} className="line-mask" delay={i * 110}>
              <span>{line}</span>
            </Reveal>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={140} className="lg:col-span-6 xl:col-span-5">
            <p className="max-w-xl text-base leading-relaxed text-graphite-600 sm:text-lg">
              {dict.hero.lead}
            </p>
          </Reveal>

          <Reveal
            delay={220}
            className="flex flex-col gap-5 lg:col-span-6 lg:items-end xl:col-span-7"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#courses" variant="solid" withArrow>
                {dict.hero.ctaPrimary}
              </Button>
              <Button href="#contact" variant="outline">
                {dict.hero.ctaSecondary}
              </Button>
            </div>

            <p className="flex items-center gap-2.5 text-xs font-medium tracking-[0.02em] text-graphite-500">
              <span aria-hidden="true" className="inline-block size-1.5 bg-taxi" />
              {dict.hero.badge}
            </p>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <Reveal
          delay={320}
          className="mt-16 hidden items-center gap-4 lg:mt-24 lg:flex"
        >
          <span className="relative block h-12 w-px overflow-hidden bg-graphite-200">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-cue bg-ink motion-reduce:animate-none"
            />
          </span>
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-graphite-400">
            {dict.hero.scroll}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
