import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

/**
 * The three course formats, plus the published terms of the normal course.
 * The formats differ only in pace, so they are shown as three equal columns
 * rather than a tiered pricing table — nothing here implies one is better.
 */
export default function Courses({ dict }: { dict: Dictionary }) {
  return (
    <section id="courses" className="bg-blue-soft py-section" aria-labelledby="courses-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.courses.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="courses-title"
              className="mt-5 text-[clamp(1.875rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]"
            >
              {dict.courses.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {dict.courses.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* The three tempos */}
          <ul className="lg:col-span-7">
            {dict.courses.formats.map((format, i) => (
              <Reveal
                as="li"
                key={format.name}
                delay={i * 70}
                className="group/row border-t border-slate-300 py-6 last:border-b sm:py-7"
              >
                <h3 className="flex items-center gap-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 bg-blue transition-transform duration-200 group-hover/row:scale-150"
                  />
                  {format.name}
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-slate-600">
                  {format.note}
                </p>
              </Reveal>
            ))}
          </ul>

          {/* Published terms of the normal course */}
          <Reveal delay={140} className="lg:col-span-5">
            <div className="border-2 border-ink bg-white p-7 sm:p-8">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-600">
                {dict.courses.planTitle}
              </h3>
              <p className="mt-4 text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em] text-blue">
                {dict.courses.planPrice}
              </p>

              <dl className="mt-7">
                {dict.courses.planRows.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-3"
                  >
                    <dt className="text-sm text-slate-600">{row.k}</dt>
                    <dd className="text-sm font-bold">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="#contact"
                className="mt-7 inline-flex w-full items-center justify-center bg-blue px-6 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-blue-deep"
              >
                {dict.courses.planCta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* A moving band of the seven languages */}
      <div className="mt-16 border-y border-slate-300 bg-white py-4 sm:mt-20">
        <Marquee
          text={dict.languages.items.map((l) => l.name).join("  ·  ") + "  ·  "}
          repeat={2}
          className="edge-fade"
          itemClassName="whitespace-pre px-2 text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase tracking-[-0.01em] text-blue"
        />
      </div>
    </section>
  );
}
