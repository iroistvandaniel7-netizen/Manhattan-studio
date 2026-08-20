import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import { BENEFIT_ICONS } from "@/components/graphics/Icons";

/**
 * Each benefit tile takes a colour from the palette. The cycle is longer than
 * any single screenful, so a scrolling reader never sees the same pairing
 * twice in a row.
 */
const BENEFIT_ACCENTS = [
  { tile: "border-park-600 bg-park-100", icon: "text-park-800" },
  { tile: "border-gold-500 bg-gold-200", icon: "text-gold-600" },
  { tile: "border-lake-600 bg-lake-300/40", icon: "text-lake-700" },
  { tile: "border-sunset-500 bg-sunset-300/35", icon: "text-sunset-700" },
] as const;

export default function Benefits({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="why"
      className="border-t border-graphite-200 bg-cream py-section"
      aria-labelledby="why-title"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky headline column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>{dict.benefits.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="why-title"
                  className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em]"
                >
                  <NoBreak>{dict.benefits.title}</NoBreak>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-graphite-600">
                  {dict.benefits.lead}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Benefit list */}
          <ul className="lg:col-span-7">
            {dict.benefits.items.map((item, i) => {
              const Icon = BENEFIT_ICONS[i] ?? BENEFIT_ICONS[0];
              const accent = BENEFIT_ACCENTS[i % BENEFIT_ACCENTS.length];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(i % 4) * 70}
                  className="group/row border-t border-graphite-300/70 last:border-b"
                >
                  <div className="flex items-start gap-5 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 sm:gap-8 sm:py-9">
                    <span
                      className={`relative mt-0.5 flex size-11 shrink-0 items-center justify-center border transition-all duration-500 group-hover/row:scale-105 sm:size-12 ${accent.tile}`}
                    >
                      <Icon className={`size-5 sm:size-[1.375rem] ${accent.icon}`} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-[-0.02em] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-600">
                        {item.desc}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="ml-auto hidden self-center text-graphite-300 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1 group-hover/row:text-sunset-600 group-hover/row:opacity-100 sm:block"
                    >
                      →
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
