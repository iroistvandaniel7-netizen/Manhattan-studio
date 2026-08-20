import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { FLAGS } from "@/components/graphics/Flags";
import { GREETINGS } from "@/lib/site";

/**
 * The seven languages as full-width rows rather than a card grid.
 *
 * Each row is a line of a departures board: the flag as a block on the left,
 * the language set large in the display face, its greeting sitting out on the
 * right in the mono face. Hovering floods the row blue and slides the
 * greeting across — the row itself is the interaction, not a button inside a
 * box. The flag is decoration; the language name is what identifies it.
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

        <ul className="mt-12 border-t-2 border-ink sm:mt-16">
          {dict.languages.items.map((language, i) => {
            const Flag = FLAGS[language.code];
            return (
              <Reveal
                as="li"
                key={language.code}
                delay={Math.min(i, 5) * 45}
                className="border-b border-line"
              >
                <a
                  href="#contact"
                  className="group/row relative flex items-center gap-5 py-5 transition-colors duration-300 hover:text-white sm:gap-8 sm:py-7"
                >
                  {/* Blue floods in from the left on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-[max(1.25rem,5vw)] -right-[max(1.25rem,5vw)] -z-10 origin-left scale-x-0 bg-blue transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-x-100"
                  />

                  {/* Flag block */}
                  {Flag ? (
                    <span
                      aria-hidden="true"
                      className="w-12 shrink-0 overflow-hidden shadow-[0_0_0_1px_rgba(6,8,15,0.15)] transition-transform duration-300 group-hover/row:scale-110 sm:w-16"
                    >
                      <Flag className="block h-auto w-full" />
                    </span>
                  ) : null}

                  <span className="label w-9 shrink-0 text-slate-500 transition-colors duration-300 group-hover/row:text-white/70">
                    {language.code}
                  </span>

                  <span className="font-display text-[clamp(1.5rem,4.2vw,2.75rem)] font-extrabold leading-none tracking-[-0.04em]">
                    {language.name}
                  </span>

                  {/* Greeting, sliding in from the right edge */}
                  <span className="ml-auto flex items-center gap-4 sm:gap-6">
                    <span className="hidden font-mono text-sm text-slate-500 transition-all duration-400 group-hover/row:translate-x-0 group-hover/row:text-white sm:block sm:translate-x-3">
                      {GREETINGS[language.code]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl transition-transform duration-300 group-hover/row:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={200}>
          <p className="label mt-6 text-slate-500">{dict.languages.levels}</p>
        </Reveal>
      </div>
    </section>
  );
}
