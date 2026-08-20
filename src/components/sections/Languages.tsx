import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LanguageMap from "./LanguageMap";

/**
 * What the studio teaches, put on a map.
 *
 * A list of seven names says how many languages there are; it does not say
 * what they reach. The board does — pick English and it opens onto four
 * continents, pick Slovak and it closes onto one point twenty kilometres from
 * the classroom. The section is the map, and the header only introduces it.
 */
export default function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="languages"
      className="relative isolate overflow-hidden py-section"
      aria-labelledby="languages-title"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>{dict.languages.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2
                id="languages-title"
                className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
              >
                {dict.languages.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130}>
            <p className="max-w-sm text-base leading-relaxed text-slate-600 lg:text-right">
              {dict.languages.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={170}>
          <LanguageMap dict={dict.languages} city={dict.contact.city} />
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="label text-slate-500">{dict.languages.levels}</p>
          <a
            href="#contact"
            className="group/cta inline-flex items-center gap-3 text-sm font-semibold tracking-[-0.01em]"
          >
            <span className="link-underline">{dict.nav.cta}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
