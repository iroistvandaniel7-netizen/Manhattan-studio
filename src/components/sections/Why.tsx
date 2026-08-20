import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SectionDecor from "@/components/ui/SectionDecor";

/** What the studio includes — one flat grid, no icons, no cards. */
export default function Why({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="why"
      className="relative isolate overflow-hidden py-section"
      aria-labelledby="why-title"
    >
      <SectionDecor flag="IT" side="right" accent="dots" />

      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.why.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="why-title"
              className="mt-5 text-[clamp(1.875rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]"
            >
              {dict.why.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-x-12 gap-y-0 sm:mt-14 sm:grid-cols-2">
          {dict.why.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={Math.min(i, 5) * 50}
              className="border-t border-line py-6 sm:py-7"
            >
              <h3 className="flex items-baseline gap-3 text-lg font-bold tracking-[-0.02em]">
                <span aria-hidden="true" className="size-2 shrink-0 bg-blue" />
                {item.title}
              </h3>
              <p className="mt-2 pl-5 text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
