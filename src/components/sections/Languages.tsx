import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SectionDecor from "@/components/ui/SectionDecor";
import { FLAGS } from "@/components/graphics/Flags";

/**
 * The seven languages, marked with round badges in the manner of a New York
 * subway line bullet. The badge code is what identifies the language; the
 * flag behind it is decoration only, faint enough to read as texture — a flag
 * stands for a country, not a language, so it is never asked to do the
 * identifying.
 */
export default function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="languages"
      className="relative isolate overflow-hidden py-section"
      aria-labelledby="languages-title"
    >
      <SectionDecor flag="EN" side="right" accent="dots" />

      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.languages.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="languages-title"
              className="mt-5 text-[clamp(1.875rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]"
            >
              {dict.languages.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {dict.languages.lead}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-px border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {dict.languages.items.map((language, i) => {
            const Flag = FLAGS[language.code];
            return (
              <Reveal as="li" key={language.code} delay={i * 55} className="bg-white">
                <a
                  href="#contact"
                  className="group/lang relative isolate flex h-full flex-col items-start gap-6 overflow-hidden p-7 transition-colors duration-200 hover:bg-blue-soft sm:p-8"
                >
                  {/* Decorative flag, brightening slightly on hover */}
                  {Flag ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-6 -top-4 -z-10 w-32 rotate-6 opacity-[0.09] saturate-[0.8] transition-opacity duration-300 group-hover/lang:opacity-[0.18]"
                    >
                      <Flag className="h-auto w-full" />
                    </span>
                  ) : null}

                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-full bg-blue text-sm font-bold tracking-[0.06em] text-white transition-transform duration-200 group-hover/lang:scale-110"
                  >
                    {language.code}
                  </span>
                  <span>
                    <span className="block text-xl font-bold tracking-[-0.02em]">
                      {language.name}
                    </span>
                    <span className="mt-1.5 block text-xs text-slate-500">
                      {dict.languages.levels}
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}

          {/*
           * Seven languages in a four-column grid leaves one cell over, which
           * would otherwise show as a bare grey gap. It carries the call to
           * action instead.
           */}
          <Reveal as="li" delay={400} className="bg-blue text-white">
            <a
              href="#contact"
              className="group/cta on-dark flex h-full flex-col justify-between gap-6 p-7 text-white transition-colors duration-200 hover:bg-blue-deep sm:p-8"
            >
              <span aria-hidden="true" className="block size-3 bg-white" />
              <span className="flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em]">
                {dict.nav.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/cta:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
