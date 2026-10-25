import { STEPS } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/** Four steps, joined by one rule that fills as the row reveals. */
export default function Steps() {
  return (
    <section className="relative isolate overflow-hidden py-section" aria-labelledby="steps-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{STEPS.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="steps-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              {STEPS.title}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {STEPS.items.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent font-display text-xl font-extrabold text-white">
                  {i + 1}
                </span>
                {i < STEPS.items.length - 1 ? (
                  <span aria-hidden="true" className="hidden h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,var(--color-sky)_0_8px,transparent_8px_14px)] lg:block" />
                ) : null}
              </div>
              <h3 className="mt-6 text-xl tracking-[-0.02em] sm:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
