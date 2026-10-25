import { FACTS } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

/**
 * The four promises, on a deep-blue band. Each figure sits a little lower
 * than the one before, so the row reads as a hand-set line rather than four
 * equal boxes.
 */
export default function Facts() {
  const step = ["lg:mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-30"];

  return (
    <section aria-label="Röviden rólunk" className="on-dark relative isolate overflow-hidden bg-accent-deep text-white">
      <div
        aria-hidden="true"
        className="stripe-field pointer-events-none absolute inset-0 -z-10 animate-stripes opacity-60 motion-reduce:animate-none"
      />

      <div className="container-x relative pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pb-36">
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {FACTS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 80}
              className={`border-t-2 border-white/40 pt-5 ${step[i % step.length]}`}
            >
              <dt className="label text-accent-lift">{item.label}</dt>
              <dd className="text-shadow-lift mt-3 font-display text-[clamp(3rem,7vw,5rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
                {item.value}
              </dd>
              <dd className="mt-4 max-w-[24ch] text-sm leading-relaxed text-white/80">{item.note}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
