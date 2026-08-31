import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { EMAIL, PHONES } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import Reveal from "@/components/ui/Reveal";
import ClearBasket from "@/components/shop/ClearBasket";

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
    title: dict.thanks.title,
    description: dict.thanks.metaDescription,
    /* Nobody should arrive here from a search result: it is the end of one
       person's purchase, and the URL carries their order reference. */
    robots: { index: false, follow: false },
  };
}

/** A reference looks like MS-2608-KJPXR. Anything else did not come from us. */
const REFERENCE_RE = /^MS-\d{4}-[ACDEFHJKLMNPRTUVWXY349]{5}$/;

/**
 * Where Stripe returns the customer after a successful payment.
 *
 * It reports the order, and deliberately does not verify it: the page is
 * reached by a redirect the customer's browser follows, and a browser can be
 * told to go anywhere. What confirms an order is `/api/stripe/webhook`, which
 * Stripe signs. So this page thanks and informs; the studio's copy of the order
 * arrives by a route the customer cannot influence.
 *
 * The reference is shown only if it has the shape we issue. Without that check
 * the page prints whatever is in the query string back at the reader — which is
 * how a link that says "your order XYZ is cancelled, call this number" gets
 * made out of a page like this one.
 */
export default async function ThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const copy = dict.thanks;

  const raw = (await searchParams).ref;
  const candidate = Array.isArray(raw) ? raw[0] : raw;
  const reference = candidate && REFERENCE_RE.test(candidate) ? candidate : null;

  return (
    <section className="relative isolate overflow-hidden pb-section pt-32 sm:pt-40">
      <Landmarks scene={2} />
      <ClearBasket />

      <div className="container-x relative max-w-3xl">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.98]">{copy.title}</h1>
        </Reveal>
        <Reveal delay={130}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{copy.lead}</p>
        </Reveal>

        {reference ? (
          <Reveal delay={180}>
            <div className="mt-10 border-2 border-accent px-6 py-5">
              <p className="label text-slate-500">{dict.shop.orderRef}</p>
              <p className="font-display mt-2 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em] text-accent">
                {reference}
              </p>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={220}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600">{copy.next}</p>
        </Reveal>

        {/* If anything looks wrong, the studio is one tap away rather than
            behind another form. */}
        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8">
            {PHONES.map((phone) => (
              <a
                key={phone.href}
                href={`tel:${phone.href}`}
                className="link-underline text-lg font-bold text-accent"
              >
                {phone.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="link-underline text-base font-semibold text-accent"
            >
              {EMAIL}
            </a>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <Link
            href={`/${locale}`}
            className="label mt-10 inline-flex items-center gap-3 bg-ink px-7 py-4 text-white transition-colors duration-200 hover:bg-accent"
          >
            {dict.legal.backHome}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
