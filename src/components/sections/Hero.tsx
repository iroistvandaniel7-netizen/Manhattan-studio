import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import heroImage from "../../../public/manhattan-skyline-sunset.jpg";

/**
 * Full-bleed Manhattan skyline at sunset, with the title and the single
 * primary action centred over it.
 *
 * Contrast: the photograph runs from a dark sky through a bright sunset band
 * to dark water, so white type cannot rely on the image alone. Two scrims sit
 * between the photo and the copy — a vertical gradient that anchors the top
 * and bottom, and a soft radial that dims the bright band right where the
 * headline sits. Both are tuned to keep the towers and the colour readable.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  const lines = dict.hero.titleLines;

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden py-32 text-center"
      aria-labelledby="hero-title"
    >
      {/* --- Photograph -------------------------------------------------- */}
      <Parallax speed={0.08} className="absolute inset-0 -z-20">
        <Image
          src={heroImage}
          alt={dict.hero.sceneAlt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          quality={82}
          /* Biased above centre so the skyline survives the crop on tall,
             narrow viewports instead of filling with water. */
          className="object-cover object-[50%_42%]"
        />
      </Parallax>

      {/* Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(8,16,28,0.78)_0%,rgba(8,16,28,0.34)_28%,rgba(8,16,28,0.30)_52%,rgba(6,14,24,0.70)_82%,rgba(5,12,20,0.88)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_44%_at_50%_46%,rgba(6,14,24,0.62),transparent_72%)]"
      />

      {/* --- Copy -------------------------------------------------------- */}
      <div className="container-x relative flex flex-col items-center">
        <Reveal>
          <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-gold-400">
            <span aria-hidden="true" className="inline-block size-1.5 bg-gold-500" />
            {dict.hero.eyebrow}
          </p>
        </Reveal>

        <h1
          id="hero-title"
          className="mt-7 max-w-5xl text-[clamp(2.5rem,7.4vw,6.5rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-white [text-shadow:0_4px_40px_rgba(4,10,18,0.75)] sm:mt-9"
        >
          {lines.map((line, i) => (
            <Reveal key={line} className="line-mask" delay={i * 110}>
              <span>{line}</span>
            </Reveal>
          ))}
        </h1>

        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/85 [text-shadow:0_2px_20px_rgba(4,10,18,0.8)] sm:text-lg">
            {dict.hero.lead}
          </p>
        </Reveal>

        {/* The single primary action */}
        <Reveal delay={240}>
          <Button href="#courses" variant="sunset" withArrow className="mt-10">
            {dict.hero.ctaPrimary}
          </Button>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-6 flex items-center gap-2.5 text-xs font-medium text-white/75">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 animate-float bg-park-300 motion-reduce:animate-none"
            />
            {dict.hero.badge}
          </p>
        </Reveal>
      </div>

      {/* Scroll cue, pinned to the bottom edge */}
      <Reveal
        delay={420}
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-white/70">
          {dict.hero.scroll}
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/30">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-cue bg-gold-400 motion-reduce:animate-none"
          />
        </span>
      </Reveal>
    </section>
  );
}
