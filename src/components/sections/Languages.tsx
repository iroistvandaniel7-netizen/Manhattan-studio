import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LanguageGlobe from "./LanguageGlobe";

/**
 * What the studio teaches — a globe, and nothing else.
 *
 * The section runs full-bleed on ink from one edge to the other, so the sphere
 * has the whole screen and no white ground to sit on. There is no list beside
 * it: a list of seven names says how many languages there are and nothing about
 * what they reach, and every one of them is written on the globe anyway.
 */
export default function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="languages"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      aria-labelledby="languages-title"
    >
      <div className="container-x relative z-10 pt-28 sm:pt-32">
        <Reveal>
          <Eyebrow invert>{dict.languages.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2
            id="languages-title"
            className="mt-5 max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
          >
            {dict.languages.title}
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
            {dict.languages.lead}
          </p>
        </Reveal>
        {/* Next to the lead rather than under the sphere: at the foot of a
            full-height section the hint sits on the fold and is missed. */}
        <Reveal delay={190}>
          <p className="label mt-7 flex items-center gap-2.5 text-white/60">
            <span aria-hidden="true" className="text-sm leading-none">
              ↔
            </span>
            {dict.languages.map.drag}
          </p>
        </Reveal>
      </div>

      <LanguageGlobe dict={dict.languages} city={dict.contact.city} />
    </section>
  );
}
