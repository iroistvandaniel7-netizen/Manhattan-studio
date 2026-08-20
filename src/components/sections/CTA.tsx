import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import Parallax from "@/components/ui/Parallax";
import Skyline from "@/components/graphics/Skyline";

export default function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="grain relative isolate overflow-hidden bg-[linear-gradient(120deg,var(--color-gold-400)_0%,var(--color-gold-500)_28%,var(--color-sunset-500)_70%,var(--color-sunset-700)_100%)] py-section text-ink"
      aria-labelledby="cta-title"
    >
      <Parallax
        speed={0.09}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-[32vh] w-[160%] max-w-none text-park-900 opacity-[0.22] sm:h-[36vh] sm:w-[130%] lg:h-[44vh] lg:w-[112%]"
          variant="outline"
          strokeWidth={1}
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_36%,rgba(251,224,172,0.55),transparent_78%)]"
      />

      <div className="container-x relative text-center">
        <h2
          id="cta-title"
          className="mx-auto max-w-4xl text-[clamp(2.125rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
        >
          <Reveal className="line-mask">
            <span><NoBreak>{dict.cta.title}</NoBreak></span>
          </Reveal>
        </h2>

        <Reveal delay={130}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">
            {dict.cta.lead}
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#contact" variant="solid" withArrow>
              {dict.cta.primary}
            </Button>
            <Button href="#contact" variant="outline">
              {dict.cta.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
