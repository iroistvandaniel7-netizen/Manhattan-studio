import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import Reveal from "@/components/ui/Reveal";
import StudyScene from "@/components/graphics/StudyScene";
import { FlagMark } from "@/components/graphics/Flags";

/**
 * What comes with a course, on an ink ground.
 *
 * The items are laid out as a hanging editorial list, not a card grid: the
 * heading sits flush, the description hangs in a narrow measure beside it,
 * and alternate rows step in from the left so the column has a rhythm rather
 * than a rule of equal boxes. The study scene runs along the base.
 */
export default function Why({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="why"
      className="on-dark relative isolate overflow-hidden bg-ink py-section text-white"
      aria-labelledby="why-title"
    >
      <Landmarks scene={2} tone="dark" />

      {/* The desk of people along the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <StudyScene tone="dark" className="h-[34vw] max-h-64 w-full opacity-[0.16]" />
      </div>

      <div className="container-x relative pb-32 sm:pb-40">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow invert>{dict.why.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="why-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              {dict.why.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 sm:mt-20">
          {dict.why.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={Math.min(i, 5) * 55}
              /* Alternate rows step in, so the column is never a plain stack. */
              className={`group/item border-t border-white/20 py-6 last:border-b sm:py-7 ${
                i % 2 === 1 ? "lg:pl-[12%]" : ""
              }`}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-10">
                <h3 className="flex items-center gap-3 font-display text-[clamp(1.25rem,2.6vw,1.875rem)] font-extrabold leading-tight tracking-[-0.018em] lg:w-[46%] lg:shrink-0">
                  <FlagMark className="h-[0.8rem] w-[1.2rem]" />
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-1.5">
                    {item.title}
                  </span>
                </h3>
                <p className="max-w-md pl-[1.95rem] text-sm leading-relaxed text-white/70 lg:pl-0">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
