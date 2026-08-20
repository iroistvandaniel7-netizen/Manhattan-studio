import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import ContactForm from "./ContactForm";
import { IconClock, IconPhone, IconPin, IconPrinter } from "@/components/graphics/Icons";
import { FAX, LOCATIONS, PHONES, mapsUrl } from "@/lib/site";

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
      className="border-t border-graphite-200 bg-cream py-section"
      aria-labelledby="contact-title"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="contact-title"
                className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
              >
                <NoBreak>{dict.contact.title}</NoBreak>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-graphite-600">
                {dict.contact.lead}
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-10">
              {/* Locations */}
              <Reveal delay={200}>
                <DetailBlock icon={<IconPin className="size-4" />} title={dict.contact.locationsTitle}>
                  <ul className="flex flex-col gap-5">
                    {LOCATIONS.map((location) => {
                      const label = dict.contact.locations[location.id];
                      return (
                        <li key={location.id}>
                          <p className="text-sm font-semibold">{label.name}</p>
                          {/* Postal address stays in Hungarian in every locale. */}
                          <address className="mt-1 text-sm not-italic leading-relaxed text-graphite-600">
                            <span lang="hu">{location.address}</span>
                            <br />
                            {label.note}
                          </address>
                          <a
                            href={mapsUrl(location.mapQuery)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline mt-2 inline-block text-xs font-semibold tracking-[0.02em] text-lake-700 hover:text-sunset-600"
                          >
                            {dict.contact.openMap} ↗
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </DetailBlock>
              </Reveal>

              {/* Phone + fax */}
              <Reveal delay={250}>
                <DetailBlock icon={<IconPhone className="size-4" />} title={dict.contact.phoneTitle}>
                  <ul className="flex flex-col gap-1.5">
                    {PHONES.map((phone) => (
                      <li key={phone.href}>
                        <a
                          href={`tel:${phone.href}`}
                          className="link-underline text-lg font-semibold tracking-[-0.01em] sm:text-xl"
                        >
                          {phone.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex items-center gap-2 text-xs text-graphite-500">
                    <IconPrinter className="size-3.5" />
                    <span>
                      {dict.contact.faxTitle}: {FAX.label}
                    </span>
                  </p>
                </DetailBlock>
              </Reveal>

              {/* Opening hours */}
              <Reveal delay={300}>
                <DetailBlock icon={<IconClock className="size-4" />} title={dict.contact.hoursTitle}>
                  <dl className="flex flex-col">
                    {dict.contact.hours.map((row) => (
                      <div
                        key={row.d}
                        className="flex items-baseline justify-between gap-4 border-b border-graphite-100 py-2.5 last:border-b-0"
                      >
                        <dt className="text-sm text-graphite-600">{row.d}</dt>
                        <dd className="text-sm font-semibold tabular-nums">{row.h}</dd>
                      </div>
                    ))}
                  </dl>
                </DetailBlock>
              </Reveal>
            </div>
          </div>

          {/* Form — stretched so it squares off against the details column. */}
          <Reveal delay={140} className="lg:col-span-7">
            <div className="h-full">
              <ContactForm dict={dict} locale={locale} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 border-b border-graphite-200 pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-graphite-500">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}
