import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/** Native <details>, so every answer opens with or without scripting. */
export default function Faq({ copy }: { copy: Dictionary["faq"] }) {
  /* FAQPage structured data, from the same list the page renders. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="faq-title" className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02]">
            {copy.title}
          </h2>
        </Reveal>

        <Reveal delay={110}>
          <div className="mt-14 max-w-4xl border-t border-line">
            {copy.items.map((item) => (
              <details key={item.q} className="faq group border-b border-line">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8 py-7 text-[clamp(1.125rem,1.8vw,1.375rem)] font-bold tracking-[-0.015em] transition-colors hover:text-accent-ink">
                  {item.q}
                  <span aria-hidden="true" className="text-2xl font-thin text-accent-ink transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-8 text-base leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
