import type { Dictionary } from "@/i18n";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import Parallax from "@/components/ui/Parallax";
import Skyline from "@/components/graphics/Skyline";

export default function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="on-ink grain relative isolate overflow-hidden bg-ink py-section text-paper"
      aria-labelledby="cta-title"
    >
      <Parallax
        speed={0.09}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-[32vh] w-[160%] max-w-none text-paper opacity-[0.16] sm:h-[36vh] sm:w-[130%] lg:h-[44vh] lg:w-[112%]"
          variant="outline"
          strokeWidth={1}
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(95%_65%_at_50%_38%,var(--color-ink)_30%,transparent_84%)]"
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
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">
            {dict.cta.lead}
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#contact" variant="solid-invert" withArrow>
              {dict.cta.primary}
            </Button>
            <Button href="#contact" variant="outline-invert">
              {dict.cta.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
