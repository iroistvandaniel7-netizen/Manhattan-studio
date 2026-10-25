import { STEPS } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/** The three steps as a numbered list, one per line, read top to bottom. */
export default function Steps() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="steps-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow>{STEPS.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="steps-title" className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02]">
            {STEPS.title} <span className="font-light text-accent">{STEPS.titleSoft}</span>
          </h2>
        </Reveal>

        <ol className="mt-16 border-t border-line">
          {STEPS.items.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="flex flex-col gap-3 border-b border-line py-9 sm:flex-row sm:items-baseline sm:gap-12"
            >
              <span className="text-[clamp(3rem,6vw,5rem)] leading-none font-light text-accent tabular-nums sm:w-28 sm:shrink-0">
                {i + 1}.
              </span>
              <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.025em] sm:w-[24rem] sm:shrink-0">
                {step.title}
              </span>
              <span className="max-w-md text-base leading-relaxed text-slate-600">{step.desc}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
