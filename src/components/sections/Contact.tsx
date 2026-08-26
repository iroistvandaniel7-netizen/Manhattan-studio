import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";
import { ADDRESS, EMAIL, PHONES, mapsUrl } from "@/lib/site";

export default function Contact({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-section"
      aria-labelledby="contact-title"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2
                id="contact-title"
                className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
              >
                {dict.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {dict.contact.lead}
              </p>
            </Reveal>

            {/* Phone and email */}
            <Reveal delay={180} className="mt-10 border-t border-line pt-6">
              <h3 className="label text-slate-600">
                {dict.contact.phoneTitle}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {PHONES.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={`tel:${phone.href}`}
                      className="link-underline font-display text-2xl font-extrabold tracking-[-0.03em] text-accent sm:text-3xl"
                    >
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={220} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">
                {dict.contact.emailTitle}
              </h3>
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline mt-4 inline-block font-mono text-sm font-semibold text-accent sm:text-base"
              >
                {EMAIL}
              </a>
            </Reveal>

            {/* Address */}
            <Reveal delay={260} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">
                {dict.contact.addressTitle}
              </h3>
              {/* The street name is Slovak and stays Slovak in every locale. */}
              <address className="mt-4 text-base not-italic leading-relaxed text-slate-600">
                <span lang="sk">{ADDRESS.street}</span>
                <br />
                {ADDRESS.postalCode} {dict.contact.city}
              </address>
              <a
                href={mapsUrl(ADDRESS.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-2 inline-block text-xs font-semibold text-accent"
              >
                {dict.contact.openMap} ↗
              </a>
            </Reveal>

            {/* Opening hours */}
            <Reveal delay={300} className="mt-8 border-t border-line pt-6">
              <h3 className="label text-slate-600">
                {dict.contact.hoursTitle}
              </h3>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <p className="font-mono text-sm text-slate-600">{dict.contact.hoursDays}</p>
                <p className="font-mono text-sm font-bold tabular-nums">{dict.contact.hoursTime}</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="h-full">
              <ContactForm dict={dict} locale={locale} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
