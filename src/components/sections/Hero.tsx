import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import StudyScene from "@/components/graphics/StudyScene";
import { FlagMark } from "@/components/graphics/Flags";
import heroImage from "../../../public/manhattan-skyline-sunset.jpg";

/**
 * Full-bleed Manhattan photograph as a blue duotone: the image is desaturated
 * to luminance and composited over a flat blue ground, which recolours the
 * whole frame in one hue so the picture belongs to the palette.
 *
 * The desk of people sits along the bottom edge, cut off by the fold, so the
 * first thing below the headline is somebody studying.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="on-dark relative isolate flex min-h-[94svh] items-end overflow-hidden pt-28 pb-40 sm:pb-48"
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
          className="animate-slow-zoom object-cover object-[50%_42%] mix-blend-luminosity motion-reduce:animate-none"
        />
      </div>

      {/* Contrast scrim, weighted to the bottom where the copy sits */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(6,8,15,0.94)_0%,rgba(6,8,15,0.76)_32%,rgba(6,8,15,0.4)_60%,rgba(6,8,15,0.3)_100%)]"
      />

      {/* Figures along the fold */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <StudyScene tone="dark" className="h-[36vw] max-h-72 w-full opacity-40" />
      </div>

      {/* The photograph is decorative; its description belongs to the region. */}
      <span className="sr-only">{dict.hero.photoAlt}</span>

      <div className="container-x relative">
        <Reveal>
          <p className="label text-shadow-strong flex items-center gap-3 text-white/85">
            <FlagMark className="h-[0.75rem] w-[1.15rem]" />
            {dict.hero.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1
            id="hero-title"
            className="text-shadow-strong mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.045em] text-white sm:mt-8"
          >
            {dict.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-shadow-strong mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {dict.hero.lead}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <Button href="#courses" variant="onDark" withArrow className="mt-9">
            {dict.hero.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
