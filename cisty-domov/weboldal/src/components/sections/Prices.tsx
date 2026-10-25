import { PRICES } from "@/lib/content";
import { PRICE_LIST, formatEur } from "@/lib/prices";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { Check } from "@/components/graphics/Icons";

/**
 * The price list — or, until there is one, the quote promise.
 *
 * Reads `lib/prices.ts`. While that list is empty the section shows what the
 * business does offer for certain (a free fixed quote), so the page is finished
 * either way and never shows a figure nobody gave.
 */
export default function Prices() {
  const hasPrices = PRICE_LIST.length > 0;

  return (
    <section id="arak" className="relative isolate overflow-hidden py-section" aria-labelledby="prices-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{PRICES.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="prices-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              {PRICES.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">{PRICES.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          {hasPrices ? (
            <div className="rounded-[1.75rem] border-2 border-ink p-6 sm:p-10">
              <ul className="flex flex-col divide-y divide-line">
                {PRICE_LIST.map((row) => (
                  <li key={row.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                    <div>
                      <p className="flex items-center gap-3 font-display text-lg font-extrabold tracking-[-0.02em]">
                        {row.name}
                        {row.featured ? (
                          <span className="label rounded-full bg-accent px-2.5 py-1 text-white">Népszerű</span>
                        ) : null}
                      </p>
                      {row.detail ? <p className="mt-1 text-sm text-slate-600">{row.detail}</p> : null}
                    </div>
                    <p className="font-display text-2xl font-extrabold tracking-[-0.02em] text-accent">
                      {formatEur(row.price)}
                      {row.from ? "-tól" : ""}
                      <span className="ml-1 text-sm font-semibold text-slate-500">/ {row.unit}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">{PRICES.note}</p>
              <Button href="#kapcsolat" withArrow className="mt-8">
                {PRICES.cta}
              </Button>
            </div>
          ) : (
            /* The introductory offer, as on the poster: the one figure the
               business has published, shown where a price list would be. */
            <div className="relative overflow-hidden rounded-[1.75rem] bg-accent p-8 text-white sm:p-12">
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -bottom-20 w-80 text-white/10 sm:w-96"
              >
                <path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
              </svg>
              <div className="relative">
                <p className="label text-white/70">{PRICES.offerEyebrow}</p>
                <p className="mt-5 text-xl font-medium text-white/90">{PRICES.offerLead}</p>
                <p className="mt-1 font-display text-[clamp(4.5rem,13vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.06em]">
                  {PRICES.offerValue}
                  <span className="text-accent-lift">%</span>
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/90">{PRICES.offerText}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {PRICES.pendingItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium">
                      <Check className="mt-px size-5 shrink-0 text-white" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href="#kapcsolat" variant="onDark" withArrow className="mt-10">
                  {PRICES.cta}
                </Button>
                <p className="mt-6 max-w-md text-xs leading-relaxed text-white/65">{PRICES.offerTerms}</p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
