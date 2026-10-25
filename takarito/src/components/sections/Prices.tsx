import { PRICES } from "@/lib/content";
import { PRICE_LIST, formatHuf } from "@/lib/prices";
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
                      {formatHuf(row.price)}
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
            <div className="relative overflow-hidden rounded-[1.75rem] bg-accent p-8 text-white sm:p-12">
              <div aria-hidden="true" className="stripe-field pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative">
                <p className="label text-white/70">{PRICES.pendingTitle}</p>
                <p className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
                  0 Ft
                </p>
                <p className="mt-2 text-sm text-white/80">az ajánlatkérés és a felmérés</p>
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
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
