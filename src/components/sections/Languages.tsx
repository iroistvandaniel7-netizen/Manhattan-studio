import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/**
 * The five languages, marked with round badges in the manner of a New York
 * subway line bullet. It is the one piece of Manhattan iconography on the
 * page, it is a flat blue circle with a letter in it, and it does real work:
 * the code identifies the language before the name is read.
 */
export default function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section id="languages" className="py-section" aria-labelledby="languages-title">
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

        <ul className="mt-12 grid gap-px border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-5">
          {dict.languages.items.map((language, i) => (
            <Reveal as="li" key={language.code} delay={i * 60} className="bg-white">
              <a
                href="#contact"
                className="group/lang flex h-full flex-col items-start gap-6 p-7 transition-colors duration-200 hover:bg-blue-soft sm:p-8"
              >
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
          ))}
        </ul>
      </div>
    </section>
  );
}
