import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";
import { FAX, LOCATIONS, PHONES, mapsUrl } from "@/lib/site";

export default function Contact({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="contact" className="py-section" aria-labelledby="contact-title">
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
                className="mt-5 text-[clamp(1.875rem,4.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em]"
              >
                {dict.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {dict.contact.lead}
              </p>
            </Reveal>

            {/* Phone */}
            <Reveal delay={180} className="mt-10 border-t border-line pt-6">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.contact.phoneTitle}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {PHONES.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={`tel:${phone.href}`}
                      className="link-underline text-xl font-bold tracking-[-0.01em] text-blue sm:text-2xl"
                    >
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                {dict.contact.faxTitle}: {FAX.label}
              </p>
            </Reveal>

            {/* Locations */}
            <Reveal delay={230} className="mt-8 border-t border-line pt-6">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.contact.locationsTitle}
              </h3>
              <ul className="mt-4 flex flex-col gap-5">
                {LOCATIONS.map((location) => {
                  const label = dict.contact.locations[location.id];
                  return (
                    <li key={location.id}>
                      <p className="text-sm font-bold">{label.name}</p>
                      {/* Hungarian postal addresses stay in Hungarian. */}
                      <address className="mt-1 text-sm not-italic leading-relaxed text-slate-600">
                        <span lang="hu">{location.address}</span>
                        <br />
                        {label.note}
                      </address>
                      <a
                        href={mapsUrl(location.mapQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline mt-1.5 inline-block text-xs font-semibold text-blue"
                      >
                        {dict.contact.openMap} ↗
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* Opening hours */}
            <Reveal delay={280} className="mt-8 border-t border-line pt-6">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.contact.hoursTitle}
              </h3>
              <dl className="mt-4 flex flex-col">
                {dict.contact.hours.map((row) => (
                  <div
                    key={row.d}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                  >
                    <dt className="text-sm text-slate-600">{row.d}</dt>
                    <dd className="text-sm font-bold tabular-nums">{row.h}</dd>
                  </div>
                ))}
              </dl>
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
