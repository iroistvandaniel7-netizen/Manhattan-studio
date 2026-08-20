import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import heroImage from "../../../public/manhattan-skyline-sunset.jpg";

/**
 * Full-bleed Manhattan photograph, treated as a blue duotone so the picture
 * belongs to the palette instead of fighting it: the image is desaturated to
 * luminance and composited over a flat blue ground, which recolours the whole
 * frame in one hue. A black scrim underneath the copy carries the contrast.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top-hero"
      className="on-dark relative isolate flex min-h-[92svh] items-end overflow-hidden pt-32 pb-16 sm:pb-20"
      aria-labelledby="hero-title"
    >
      {/* Duotone photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-blue">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          quality={82}
          className="animate-slow-zoom object-cover object-[50%_45%] mix-blend-luminosity motion-reduce:animate-none"
        />
      </div>

      {/* Contrast scrim, weighted to the bottom where the copy sits */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(10,14,26,0.92)_0%,rgba(10,14,26,0.72)_30%,rgba(10,14,26,0.38)_58%,rgba(10,14,26,0.28)_100%)]"
      />

      {/* The photograph is decorative; its description belongs to the region. */}
      <span className="sr-only">{dict.hero.photoAlt}</span>

      <div className="container-x relative">
        <Reveal>
          <p className="text-shadow-strong flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/85">
            <span aria-hidden="true" className="inline-block size-2 bg-white" />
            {dict.hero.eyebrow}
          </p>
        </Reveal>

        {/*
         * A plain fade-up rather than the clipping line mask: the headline
         * wraps, and the mask's leading would open a gap between the lines.
         */}
        <Reveal delay={60}>
          <h1
            id="hero-title"
            className="text-shadow-strong mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:mt-8"
          >
            {dict.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-shadow-strong mt-7 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {dict.hero.lead}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <Button href="#courses" variant="onDark" withArrow className="mt-9">
            {dict.hero.cta}
          </Button>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <Reveal
        delay={300}
        className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <span className="relative block h-10 w-0.5 overflow-hidden bg-white/25">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-cue bg-white motion-reduce:animate-none"
          />
        </span>
      </Reveal>
    </section>
  );
}
