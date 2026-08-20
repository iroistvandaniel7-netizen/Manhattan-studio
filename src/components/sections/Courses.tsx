import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import { EXAMS } from "@/lib/site";

/**
 * One accent per language, so a card is identifiable before you read it and
 * the grid carries colour without needing decoration. `bar` paints the rule
 * across the top of the card; `wash` is what floods it on hover.
 */
const COURSE_ACCENTS = [
  { bar: "bg-gold-500", wash: "bg-gold-500", ink: "text-ink" },
  { bar: "bg-sunset-500", wash: "bg-sunset-500", ink: "text-cream" },
  { bar: "bg-lake-600", wash: "bg-lake-600", ink: "text-cream" },
  { bar: "bg-park-600", wash: "bg-park-600", ink: "text-cream" },
  { bar: "bg-sunset-700", wash: "bg-sunset-700", ink: "text-cream" },
] as const;

export default function Courses({ dict }: { dict: Dictionary }) {
  return (
    <section id="courses" className="bg-paper py-section" aria-labelledby="courses-title">
      <div className="container-x">
        {/* Section header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{dict.courses.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="courses-title"
                className="mt-6 text-[clamp(2rem,5.2vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.035em]"
              >
                <NoBreak>{dict.courses.title}</NoBreak>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5 lg:pt-4">
            <p className="text-base leading-relaxed text-graphite-600">
              {dict.courses.lead}
            </p>
          </Reveal>
        </div>

        {/* Course cards */}
        <ul className="mt-14 grid gap-px border border-graphite-200 bg-graphite-200 sm:mt-20 sm:grid-cols-2 xl:grid-cols-3">
          {dict.courses.items.map((course, i) => {
            const accent = COURSE_ACCENTS[i % COURSE_ACCENTS.length];
            return (
              <Reveal as="li" key={course.code} delay={(i % 3) * 90} className="bg-paper">
                <a
                  href="#contact"
                  className={`group/card relative flex h-full flex-col justify-between gap-10 overflow-hidden p-8 sm:p-10 ${accent.ink === "text-cream" ? "hover:text-cream" : "hover:text-ink"}`}
                >
                  {/* Colour wash rising from the base of the card on hover */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-y-100 ${accent.wash}`}
                  />
                  {/* The language's colour, always visible along the top edge */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-0 ${accent.bar}`}
                  />

                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-graphite-500 transition-colors duration-500 group-hover/card:text-current group-hover/card:opacity-60">
                        {course.code}
                      </span>
                      <span className="text-[0.6875rem] font-medium tracking-[0.02em] text-graphite-500 transition-colors duration-500 group-hover/card:text-current group-hover/card:opacity-60">
                        {dict.courses.levels}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
                      {course.name}
                    </h3>

                    <p className="mt-5 text-sm leading-relaxed text-graphite-600 transition-colors duration-500 group-hover/card:text-current group-hover/card:opacity-80">
                      {course.desc}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-graphite-200 px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.02em] text-graphite-500 transition-colors duration-500 group-hover/card:border-current/30 group-hover/card:text-current group-hover/card:opacity-75"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.02em]">
                    {dict.courses.more}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-x-2"
                    >
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}

          {/*
           * The last cell carries a conversion panel rather than more course
           * copy: it keeps the grid square and gives the section an exit.
           */}
          <Reveal
            as="li"
            delay={180}
            className="relative isolate overflow-hidden bg-midnight text-cream"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_90%_at_20%_0%,rgba(240,169,59,0.28),transparent_62%),radial-gradient(80%_80%_at_100%_100%,rgba(228,87,46,0.24),transparent_60%)]"
            />
            <a
              href="#contact"
              className="group/panel flex h-full flex-col justify-between gap-10 p-8 sm:p-10"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 bg-gold-400"
                />
                <p className="mt-6 text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                  {dict.cta.title}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-cream/65">
                  {dict.hero.badge}
                </p>
              </div>
              <span className="flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
                {dict.nav.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/panel:translate-x-2"
                >
                  →
                </span>
              </span>
            </a>
          </Reveal>
        </ul>

        {/* Course formats */}
        <Reveal className="mt-16 border-t border-graphite-200 pt-12 sm:mt-24 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                <NoBreak>{dict.courses.formatsTitle}</NoBreak>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite-600">
                {dict.courses.formatsLead}
              </p>
            </div>
            <ul className="columns-1 gap-x-10 sm:columns-2 lg:col-span-7">
              {dict.courses.formats.map((format) => (
                <li
                  key={format}
                  className="flex break-inside-avoid items-start gap-3 border-b border-graphite-200 py-3 text-sm leading-snug text-graphite-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.5rem] inline-block size-1 shrink-0 bg-sunset-500"
                  />
                  {format}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Accredited exam centre */}
        <Reveal className="mt-16 border-t border-graphite-200 pt-12 sm:mt-24 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                <NoBreak>{dict.courses.examsTitle}</NoBreak>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite-600">
                {dict.courses.examsLead}
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-px self-start border border-graphite-200 bg-graphite-200 sm:grid-cols-3 lg:col-span-7">
              {EXAMS.map((exam) => (
                <li
                  key={exam}
                  className="flex items-center justify-center bg-paper px-4 py-7 text-center text-sm font-semibold tracking-[0.06em] transition-colors duration-400 hover:bg-park-800 hover:text-cream sm:py-9"
                >
                  {exam}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
