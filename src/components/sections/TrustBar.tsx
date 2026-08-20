import type { Dictionary } from "@/i18n";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

/**
 * Deep park-green band directly under the bright hero. The hard tonal jump
 * is the point: it reads as stepping from the open sky into the shade of the
 * trees, and it stops the page settling into one continuous cream wash.
 */
export default function TrustBar({ dict }: { dict: Dictionary }) {
  /* Each figure takes its own accent, cycling through the palette. */
  const accents = ["text-gold-400", "text-park-300", "text-sunset-300", "text-lake-300"];

  return (
    <section
      aria-label={dict.trust.title}
      className="on-ink relative isolate overflow-hidden bg-park-900 text-cream"
    >
      {/* Canopy light filtering through from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_28%_-20%,rgba(111,196,161,0.22),transparent_62%),radial-gradient(60%_100%_at_88%_0%,rgba(240,169,59,0.16),transparent_60%)]"
      />

      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 90}
              className={`flex h-full flex-col py-10 sm:py-14 lg:py-16 ${
                i % 2 === 1 ? "border-l border-cream/15 pl-6 sm:pl-10" : "pr-6 sm:pr-10"
              } ${i > 1 ? "border-t border-cream/15 lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:border-cream/15 lg:pl-10" : ""
              }`}
            >
              <dt className="order-2 mt-auto pt-6 text-sm font-semibold text-cream">
                {item.label}
              </dt>
              <dd
                className={`order-1 text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums ${accents[i % accents.length]}`}
              >
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
              <dd className="order-3 mt-1.5 max-w-[26ch] text-xs leading-relaxed text-cream/60">
                {item.sub}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
