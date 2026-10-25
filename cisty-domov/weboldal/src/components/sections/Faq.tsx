import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import FaqGame from "./FaqGame";

/** The questions, played as bubbles — see `FaqGame`. The structured data lists them all. */
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

        <FaqGame copy={copy} />
      </div>
    </section>
  );
}
