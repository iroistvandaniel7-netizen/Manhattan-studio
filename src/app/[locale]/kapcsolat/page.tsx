import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { ADDRESS, EMAIL, PHONES, SITE_URL, mapsUrl } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.contactPage.title,
    description: dict.contactPage.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/kapcsolat`,
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}/kapcsolat`]),
      ),
    },
  };
}

/**
 * The contact page.
 *
 * The home page keeps its own contact section — it is the end of that page's
 * argument and the thing every in-page call to action points at — so this one
 * has to be worth the extra load rather than the same block again. It is
 * arranged the other way round: the details lead, at the size of a headline,
 * and the form follows. Somebody who navigated here from the menu usually
 * wants a phone number or an address, not a form; somebody ready to write
 * already scrolled to the one on the home page.
 *
 * Every detail comes from `lib/site.ts`, the same file the home page and the
 * structured data read, so there is one address on this site rather than two
 * that can drift.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const copy = dict.contactPage;

  const block = "border-t border-line pt-6";

  return (
    <section className="relative isolate overflow-hidden pb-section pt-32 sm:pt-40">
      <Landmarks scene={3} />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">{copy.title}</h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{copy.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* --- The details, at headline size --------------------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="label text-slate-600">{copy.findUs}</h2>
            </Reveal>

            {/*
              The phone first and largest. On a page reached from a menu item
              that says "contact", it is the single most likely thing the
              reader came for, and a number set at headline size is also a
              tap target on the device most people are reading this on.
            */}
            <Reveal delay={60} className="mt-6">
              <ul className="flex flex-col gap-2">
                {PHONES.map((phone) => (
                  <li key={phone.href}>
                    <a
                      href={`tel:${phone.href}`}
                      className="link-underline font-display text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold leading-none tracking-[-0.02em] text-accent"
                    >
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={110} className={`mt-9 ${block}`}>
              <h3 className="label text-slate-500">{dict.contact.emailTitle}</h3>
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline mt-3 inline-block text-base font-semibold text-accent"
              >
                {EMAIL}
              </a>
            </Reveal>

            <Reveal delay={150} className={`mt-8 ${block}`}>
              <h3 className="label text-slate-500">{dict.contact.addressTitle}</h3>
              {/* The street name is Slovak and stays Slovak in every locale. */}
              <address className="mt-3 text-lg not-italic leading-relaxed">
                <span lang="sk">{ADDRESS.street}</span>
                <br />
                {ADDRESS.postalCode} {dict.contact.city}
              </address>
              <a
                href={mapsUrl(ADDRESS.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="label group/map mt-5 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-white transition-colors duration-200 hover:bg-accent"
              >
                {dict.contact.openMap}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/map:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </Reveal>

            <Reveal delay={190} className={`mt-8 ${block}`}>
              <h3 className="label text-slate-500">{dict.contact.hoursTitle}</h3>
              <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <p className="text-sm text-slate-600">{dict.contact.hoursDays}</p>
                <p className="text-base font-bold tabular-nums">{dict.contact.hoursTime}</p>
              </div>
            </Reveal>
          </div>

          {/* --- The form ------------------------------------------------ *
              No heading of its own: the form already renders one ("write to
              us"), and a section title above it says the same words twice. */}
          <Reveal delay={100} className="lg:col-span-7">
            <ContactForm dict={dict} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
