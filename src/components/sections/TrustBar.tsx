import type { Dictionary } from "@/i18n";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

export default function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label={dict.trust.title} className="border-y border-graphite-200">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 90}
              /*
               * `dl > div > (dt, dd…)` is the valid grouping wrapper. The
               * number is rendered after the term in the DOM and lifted above
               * it with `order`, so the markup stays valid while the figure
               * reads first.
               */
              className={`flex h-full flex-col py-10 sm:py-14 lg:py-16 ${
                i % 2 === 1
                  ? "border-l border-graphite-200 pl-6 sm:pl-10"
                  : "pr-6 sm:pr-10"
              } ${i > 1 ? "border-t border-graphite-200 lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-graphite-200 lg:pl-10" : ""
              }`}
            >
              <dt className="order-2 mt-auto pt-6 text-sm font-semibold tracking-[0.01em]">
                {item.label}
              </dt>
              <dd className="order-1 text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums">
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
              <dd className="order-3 mt-1.5 max-w-[26ch] text-xs leading-relaxed text-graphite-500">
                {item.sub}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
