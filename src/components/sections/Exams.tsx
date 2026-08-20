import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { EXAMS } from "@/lib/site";

/** The six accredited exam systems, as plain wordmarks on a blue ground. */
export default function Exams({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="exams"
      className="on-dark bg-ink py-section text-white"
      aria-labelledby="exams-title"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow invert>{dict.exams.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="exams-title"
              className="mt-5 text-[clamp(1.875rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]"
            >
              {dict.exams.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              {dict.exams.lead}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px border border-white/20 bg-white/20 sm:mt-14 sm:grid-cols-3">
          {EXAMS.map((exam, i) => (
            <Reveal
              as="li"
              key={exam}
              delay={i * 50}
              className="flex items-center justify-center bg-ink px-4 py-9 text-center text-base font-bold tracking-[0.04em] transition-colors duration-200 hover:bg-blue sm:py-11 sm:text-lg"
            >
              {exam}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
