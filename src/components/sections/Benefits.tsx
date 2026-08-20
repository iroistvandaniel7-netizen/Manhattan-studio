import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import { BENEFIT_ICONS } from "@/components/graphics/Icons";

export default function Benefits({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="why"
      className="border-t border-graphite-200 bg-bone py-section"
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
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(i % 4) * 70}
                  className="group/row border-t border-graphite-300/70 last:border-b"
                >
                  <div className="flex items-start gap-5 py-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 sm:gap-8 sm:py-9">
                    <span className="relative mt-0.5 flex size-11 shrink-0 items-center justify-center border border-graphite-300 transition-colors duration-500 group-hover/row:border-ink group-hover/row:bg-ink sm:size-12">
                      <Icon className="size-5 transition-colors duration-500 group-hover/row:text-paper sm:size-[1.375rem]" />
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
                      className="ml-auto hidden self-center text-graphite-300 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-1 group-hover/row:text-ink group-hover/row:opacity-100 sm:block"
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
