import type { Dictionary, Locale } from "@/i18n";
import { EMAIL, HOURS, PHONE } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

/** The close: the phone number set large, the rest in plain lines, the form beside. */
export default function Contact({
  locale,
  copy,
  services,
}: {
  locale: Locale;
  copy: Dictionary["contact"];
  services: Dictionary["services"]["items"];
}) {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-accent-soft py-section" aria-labelledby="contact-title">
      <div className="container-x flex flex-col gap-16 lg:flex-row lg:gap-20">
        <div className="lg:w-[38%] lg:shrink-0">
          <Reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="contact-title" className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02]">
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">{copy.lead}</p>
          </Reveal>

          <Reveal delay={170}>
            <a
              href={`tel:${PHONE.href}`}
              className="mt-12 block text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-accent-ink hover:text-accent-deep"
            >
              {PHONE.label}
            </a>
            <a href={`mailto:${EMAIL}`} className="link-underline mt-3 inline-block text-lg text-ink">
              {EMAIL}
            </a>
            <p className="mt-8 text-base leading-relaxed text-slate-600">
              {copy.area}
              <br />
              {copy.hours}, {HOURS.opens}–{HOURS.closes}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="lg:flex-1">
          <ContactForm locale={locale} copy={copy.form} services={services} />
        </Reveal>
      </div>
    </section>
  );
}
