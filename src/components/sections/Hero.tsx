import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import StudyScene from "@/components/graphics/StudyScene";
import heroImage from "../../../public/manhattan-skyline-sunset.jpg";

/**
 * Full-bleed Manhattan photograph as a duotone: the image is desaturated to
 * luminance and composited over a flat accent ground, which recolours the
 * whole frame in one hue so the picture belongs to the palette.
 *
 * The desk of people sits along the bottom edge, cut off by the fold, so the
 * first thing below the headline is somebody studying.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="on-dark relative isolate flex min-h-[94svh] items-end overflow-hidden pt-28 pb-52 sm:pb-80"
      aria-labelledby="hero-title"
    >
      {/* Duotone photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-accent">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          quality={82}
          className="animate-drone object-cover object-[50%_42%] mix-blend-luminosity motion-reduce:animate-none"
        />
      </div>

      {/* Contrast scrim, weighted to the bottom where the copy sits */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,7,16,0.95)_0%,rgba(11,7,16,0.82)_34%,rgba(11,7,16,0.52)_62%,rgba(11,7,16,0.34)_100%)]"
      />

      {/* Figures along the fold */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <StudyScene tone="dark" className="h-[36vw] max-h-72 w-full opacity-40" />
      </div>

      {/* The photograph is decorative; its description belongs to the region. */}
      <span className="sr-only">{dict.hero.photoAlt}</span>

      <div className="container-x relative">
        <Reveal delay={60}>
          <h1
            id="hero-title"
            className="text-shadow-strong max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.045em] text-white"
          >
            {dict.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-shadow-strong mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {dict.hero.lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
