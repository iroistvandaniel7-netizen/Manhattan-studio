import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

/**
 * The three tempos, shown as a pace meter.
 *
 * The one thing that genuinely separates the formats is how fast they run, so
 * each is drawn with a filled bar — one segment, two, three. That encodes the
 * real difference; it is not decoration, and it is why the formats are ranked
 * here when nothing else on the page is.
 *
 * The normal course's published terms sit underneath as a wide specification
 * strip in the mono face, rather than as a pricing card.
 */
export default function Courses({ dict }: { dict: Dictionary }) {
  const SEGMENTS = 3;

  return (
    <section
      id="courses"
      className="relative isolate overflow-hidden bg-accent-soft py-section"
      aria-labelledby="courses-title"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.courses.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="courses-title"
              className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
            >
              {dict.courses.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {dict.courses.lead}
            </p>
          </Reveal>
        </div>

        {/* Pace meter */}
        <ul className="mt-14 sm:mt-20">
          {dict.courses.formats.map((format, i) => (
            <Reveal
              as="li"
              key={format.name}
              delay={i * 90}
              className="group/pace border-t-2 border-ink/15 py-7 last:border-b-2 sm:py-9"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
                <h3 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.04em] lg:w-[28%] lg:shrink-0">
                  {format.name}
                </h3>

                {/* Filled segments = relative pace */}
                <div
                  className="flex gap-1.5 lg:w-[26%] lg:shrink-0"
                  aria-hidden="true"
                >
                  {Array.from({ length: SEGMENTS }, (_, seg) => (
                    <span
                      key={seg}
                      className={`h-3 flex-1 transition-all duration-500 ${
                        seg <= i
                          ? "bg-accent group-hover/pace:h-5"
                          : "bg-ink/10 group-hover/pace:h-4"
                      }`}
                      style={{ transitionDelay: `${seg * 70}ms` }}
                    />
                  ))}
                </div>

                <p className="max-w-md text-base leading-relaxed text-slate-600">
                  {format.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Specification strip for the normal course */}
        <Reveal delay={120} className="mt-12 sm:mt-16">
          <div className="flex flex-col gap-8 bg-ink p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:gap-12">
            <div className="lg:shrink-0">
              <p className="label text-white/60">{dict.courses.planTitle}</p>
              <p className="font-display mt-2 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.05em]">
                {dict.courses.planPrice}
              </p>
            </div>

            <dl className="flex flex-1 flex-wrap gap-x-10 gap-y-5">
              {dict.courses.planRows.map((row) => (
                <div key={row.k} className="min-w-32">
                  <dt className="label text-white/55">{row.k}</dt>
                  <dd className="mt-1.5 font-mono text-base font-semibold">{row.v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#contact"
              className="group/cta label inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-ink transition-colors duration-200 hover:bg-accent hover:text-white lg:shrink-0"
            >
              {dict.courses.planCta}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Moving band of the seven languages */}
      <div className="mt-16 border-y-2 border-ink bg-white py-4 sm:mt-20">
        <Marquee
          text={dict.languages.items.map((l) => l.name).join("  ·  ") + "  ·  "}
          repeat={2}
          className="edge-fade"
          itemClassName="whitespace-pre px-2 font-display text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase tracking-[-0.02em] text-accent"
        />
      </div>
    </section>
  );
}
