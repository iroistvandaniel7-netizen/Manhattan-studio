import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";

export default function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-section" aria-labelledby="process-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{dict.process.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="process-title"
                className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em]"
              >
                <NoBreak>{dict.process.title}</NoBreak>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <p className="text-base leading-relaxed text-graphite-600">
              {dict.process.lead}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-px border-y border-graphite-200 bg-graphite-200 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 100}
              className="group/step relative flex flex-col gap-7 bg-paper px-1 py-10 sm:px-6 sm:py-12"
            >
              {/* Progress rule that fills on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-1 top-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/step:scale-x-100 sm:inset-x-6"
              />

              <span className="text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.06em] text-graphite-200 transition-colors duration-500 group-hover/step:text-ink">
                {step.n}
              </span>

              <div>
                <h3 className="text-lg font-bold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-graphite-600">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
