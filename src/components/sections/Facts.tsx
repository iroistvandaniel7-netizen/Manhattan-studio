import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import StudyScene from "@/components/graphics/StudyScene";

/**
 * The figures band. A full-bleed accent ground with the study scene running
 * along its base and the four figures stepped across it — each one dropped a
 * little lower than the last, so the row reads as a hand-set line of type
 * rather than four equal boxes.
 */
export default function Facts({ dict }: { dict: Dictionary }) {
  /* Each figure sits lower than the one before it. */
  const step = ["lg:mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-30"];

  return (
    <section
      aria-label={dict.facts.title}
      className="on-dark relative isolate overflow-hidden bg-accent text-white"
    >
      {/* Panning stripes */}
      <div
        aria-hidden="true"
        className="stripe-field pointer-events-none absolute inset-0 -z-10 animate-stripes motion-reduce:animate-none"
      />

      {/* The desk of people, silhouetted along the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <StudyScene
          tone="dark"
          className="h-[38vw] max-h-72 w-full opacity-[0.22]"
        />
      </div>

      <div className="container-x relative pt-16 pb-40 sm:pt-20 sm:pb-48 lg:pb-56">
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {dict.facts.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 80}
              className={`border-t-2 border-white/45 pt-5 ${step[i % step.length]}`}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-shadow-lift font-display text-[clamp(3rem,7vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.05em]">
                {item.value}
              </dd>
              <dd className="label mt-4 text-white" aria-hidden="true">
                {item.label}
              </dd>
              <dd className="mt-2 max-w-[22ch] text-sm leading-relaxed text-white/75">
                {item.note}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
