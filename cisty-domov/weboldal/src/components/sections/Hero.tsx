import Image from "next/image";
import { HERO } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * The poster, made into a page: the brand blue full-bleed, the house mark
 * grown huge and pale behind the cleaner from the poster set, and the
 * headline split the way the posters split it — a bold first line, a light
 * second one.
 */
export default function Hero() {
  return (
    <section
      className="on-dark relative isolate flex min-h-[94svh] items-end overflow-hidden bg-accent pt-28 pb-16 text-white sm:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Light pooling across the blue, brightest top-right like a window. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_85%_10%,#4f8fef_0%,transparent_60%),radial-gradient(60%_50%_at_0%_100%,#144aa3_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="stripe-field pointer-events-none absolute inset-0 -z-20 animate-stripes opacity-30 motion-reduce:animate-none"
      />

      {/* The house mark, huge and pale, with its glint. */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute -right-[18%] -bottom-[12%] -z-10 w-[95vw] max-w-[60rem] text-white/[0.08] sm:-right-[8%] lg:right-[-4%] lg:w-[58vw]"
      >
        <path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
        <path
          d="M50 42 C51.8 56 55 59.6 69 61.5 C55 63.4 51.8 67 50 81 C48.2 67 45 63.4 31 61.5 C45 59.6 48.2 56 50 42 Z"
          className="origin-center animate-twinkle [animation-duration:5s] [transform-box:fill-box]"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>

      {/* Soft bubbles. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {[
          "right-[30%] top-[14%] size-20 sm:size-28",
          "right-[6%] top-[22%] size-14 sm:size-16 [animation-delay:-3s]",
          "left-[46%] top-[56%] size-10 [animation-delay:-5s]",
        ].map((position) => (
          <span
            key={position}
            className={`absolute animate-float rounded-full border border-white/35 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.02)_70%)] motion-reduce:animate-none ${position}`}
          />
        ))}
      </div>

      <div className="container-x relative grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="pb-4 lg:pb-16">
          <Reveal>
            <Eyebrow invert>{HERO.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1
              id="hero-title"
              className="mt-6 max-w-4xl text-[clamp(2.75rem,7.2vw,6.25rem)] leading-[0.98] tracking-[-0.045em]"
            >
              <span className="shine-text block">{HERO.title}</span>
              <span className="block font-normal text-sky">{HERO.titleSoft}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-xl">{HERO.lead}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#kapcsolat" variant="onDark" withArrow>
                {HERO.primary}
              </Button>
              <Button href="#szolgaltatasok" variant="ghostDark">
                {HERO.secondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <a
              href="#arak"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink/35 py-2 pr-5 pl-2 text-sm font-semibold backdrop-blur transition-colors duration-200 hover:bg-ink/50"
            >
              <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold text-accent">Új ügyfeleknek</span>
              {HERO.offer}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        {/* The cleaner from the poster set, in her on-blue colours. */}
        <Reveal delay={150} className="hidden justify-self-center lg:block">
          <Image
            src="/brand/takaritono-kek-hatteren.svg"
            alt=""
            width={400}
            height={800}
            priority
            unoptimized
            className="h-[min(68svh,36rem)] w-auto drop-shadow-[0_30px_40px_rgba(11,45,91,0.35)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
