import { STEPS } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/**
 * Poster 4's three steps. A dashed trail runs behind the cards from the first
 * to the last, and only the last is filled — the one where the reader gets
 * home to a clean flat.
 */
export default function Steps() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="steps-title">
      <div aria-hidden="true" className="bg-cleaning pointer-events-none absolute inset-0 -z-10" />
      <div className="container-x">
        <Reveal>
          <Eyebrow>{STEPS.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="steps-title" className="mt-5 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95]">
            <span className="block">{STEPS.title}</span>
            <span className="block font-normal text-accent">{STEPS.titleSoft}</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 lg:mt-24">
          {/* The trail between the steps. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-[8%] top-12 hidden h-28 w-[84%] lg:block"
          >
            <path
              d="M0 60 C 200 -10, 400 130, 600 60 S 1000 -10, 1200 60"
              fill="none"
              stroke="#BFD7FA"
              strokeWidth="3"
              strokeDasharray="2 12"
              strokeLinecap="round"
            />
          </svg>

          <ol className="relative grid gap-5 lg:grid-cols-3 lg:gap-8">
            {STEPS.items.map((step, i) => {
              const last = i === STEPS.items.length - 1;
              return (
                <Reveal as="li" key={step.title} delay={i * 110}>
                  <div
                    className={`flex h-full flex-col rounded-[2rem] p-8 sm:p-10 ${
                      last ? "bg-accent text-white shadow-[0_24px_60px_rgba(27,99,214,0.35)]" : "bg-white ring-1 ring-line"
                    }`}
                  >
                    <span
                      className={`grid size-20 place-items-center rounded-full font-display text-4xl font-semibold ${
                        last ? "bg-white text-accent" : "bg-accent-soft text-accent"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mt-10 text-[clamp(1.625rem,2.4vw,2.25rem)] leading-[1.05]">{step.title}</h3>
                    <p className={`mt-4 text-base leading-relaxed ${last ? "text-white/85" : "text-slate-600"}`}>{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
