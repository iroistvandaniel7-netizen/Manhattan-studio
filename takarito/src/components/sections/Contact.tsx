import { CONTACT } from "@/lib/content";
import { AREA, EMAIL, HOURS, PHONE } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="kapcsolat" className="relative isolate overflow-hidden py-section" aria-labelledby="contact-title">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 id="contact-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
                {CONTACT.title}
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{CONTACT.lead}</p>
            </Reveal>

            <Reveal delay={180} className="mt-10 border-t border-line pt-6">
              <h3 className="label text-slate-600">{CONTACT.phoneTitle}</h3>
              <a
                href={`tel:${PHONE.href}`}
                className="link-underline mt-4 inline-block font-display text-2xl font-extrabold tracking-[-0.025em] text-accent sm:text-3xl"
              >
                {PHONE.label}
              </a>
            </Reveal>

            <Reveal delay={220} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">{CONTACT.emailTitle}</h3>
              <a href={`mailto:${EMAIL}`} className="link-underline mt-4 inline-block text-sm font-semibold text-accent sm:text-base">
                {EMAIL}
              </a>
            </Reveal>

            <Reveal delay={260} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">{CONTACT.areaTitle}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{AREA}</p>
            </Reveal>

            <Reveal delay={300} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">{CONTACT.hoursTitle}</h3>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <p className="text-sm text-slate-600">{HOURS.label}</p>
                <p className="text-sm font-bold tabular-nums">
                  {HOURS.opens}–{HOURS.closes}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="h-full">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
