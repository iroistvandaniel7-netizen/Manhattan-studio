import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

/**
 * The course formats. Deliberately an unnumbered list: these are parallel
 * options, not a sequence, so numbering them would imply an order that isn't
 * there.
 */
export default function Courses({ dict }: { dict: Dictionary }) {
  return (
    <section id="courses" className="bg-blue-soft py-section" aria-labelledby="courses-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{dict.courses.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2
                id="courses-title"
                className="mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.035em]"
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

          <ul className="lg:col-span-7">
            {dict.courses.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={Math.min(i, 6) * 40}
                className="group/row border-t border-slate-300 last:border-b"
              >
                <a
                  href="#contact"
                  className="flex items-center gap-5 py-4 transition-colors duration-200 hover:text-blue sm:py-5"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 bg-blue transition-transform duration-200 group-hover/row:scale-150"
                  />
                  <span className="text-base font-medium sm:text-lg">{item}</span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-blue opacity-0 transition-opacity duration-200 group-hover/row:opacity-100"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* A moving band of the five languages */}
      <div className="mt-16 border-y border-slate-300 bg-white py-4 sm:mt-20">
        <Marquee
          text={dict.languages.items.map((l) => l.name).join("  ·  ") + "  ·  "}
          repeat={3}
          className="edge-fade"
          itemClassName="whitespace-pre px-2 text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase tracking-[-0.01em] text-blue"
        />
      </div>
    </section>
  );
}
