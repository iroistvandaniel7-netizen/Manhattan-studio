import { FAQ } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/** Native <details>, so every answer opens with or without scripting. */
export default function Faq() {
  /* FAQPage structured data, from the same list the page renders. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="gyik" className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>{FAQ.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="faq-title" className="mt-5 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
              {FAQ.title}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-8">
          <div className="flex flex-col gap-3">
            {FAQ.items.map((item) => (
              <details key={item.q} className="faq group rounded-[1.5rem] bg-paper px-6 py-5 ring-1 ring-line transition-shadow open:bg-white open:shadow-[0_16px_40px_rgba(11,45,91,0.1)] sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-base font-semibold tracking-[-0.015em] sm:text-lg">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute h-0.5 w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-0.5 bg-current" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
