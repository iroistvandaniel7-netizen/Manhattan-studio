import { HERO } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import CleanScene from "@/components/graphics/CleanScene";

/**
 * A full-bleed blue ground with soft light pooling across it, large bubbles
 * drifting behind the headline, and the cleaning shelf along the fold — so the
 * first thing below the headline is the work itself.
 */
export default function Hero() {
  return (
    <section
      className="on-dark relative isolate flex min-h-[94svh] items-end overflow-hidden bg-accent pt-28 pb-52 text-white sm:pb-72"
      aria-labelledby="hero-title"
    >
      {/* Light pooling across the blue, brightest top-right like a window. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_85%_10%,#5aa7ff_0%,transparent_60%),radial-gradient(60%_50%_at_0%_100%,#073f96_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="stripe-field pointer-events-none absolute inset-0 -z-20 animate-stripes opacity-40 motion-reduce:animate-none"
      />

      {/* Big soft bubbles. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {[
          "right-[8%] top-[16%] size-56 sm:size-80",
          "right-[34%] top-[8%] size-24 sm:size-32 [animation-delay:-2s]",
          "left-[58%] top-[42%] size-16 sm:size-20 [animation-delay:-4s]",
          "right-[4%] top-[58%] size-28 [animation-delay:-1s]",
        ].map((position) => (
          <span
            key={position}
            className={`absolute animate-float rounded-full border border-white/35 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.02)_70%)] shadow-[inset_-8px_-10px_30px_rgba(255,255,255,0.12)] motion-reduce:animate-none ${position}`}
          />
        ))}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <CleanScene tone="dark" className="h-[36vw] max-h-72 w-full opacity-50" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <Eyebrow invert>{HERO.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h1
            id="hero-title"
            className="mt-6 max-w-4xl text-[clamp(2.9rem,8.4vw,7rem)] leading-[0.92] tracking-[-0.04em]"
          >
            <span className="shine-text">{HERO.title}</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{HERO.lead}</p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#kapcsolat" variant="onDark" withArrow>
              {HERO.primary}
            </Button>
            <Button href="#szolgaltatasok" variant="ghostDark">
              {HERO.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
