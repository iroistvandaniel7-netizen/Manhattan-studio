import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";

/** Flat blue band of four figures, directly under the photograph. */
export default function Facts({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label={dict.facts.title} className="on-dark bg-blue text-white">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {dict.facts.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className={`py-10 sm:py-12 ${
                i % 2 === 1 ? "border-l border-white/25 pl-6 sm:pl-10" : "pr-6"
              } ${i > 1 ? "border-t border-white/25 lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-white/25 lg:pl-10" : ""
              }`}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] tabular-nums">
                {item.value}
              </dd>
              <dd className="mt-3 text-sm font-medium text-white/80" aria-hidden="true">
                {item.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
