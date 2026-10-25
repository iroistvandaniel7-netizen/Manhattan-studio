import Image from "next/image";
import { PRICES } from "@/lib/content";
import { PRICE_LIST, formatEur } from "@/lib/prices";
import { PHONE, WEB_LABEL } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/**
 * Poster 3 as a section: the introductory offer set huge, the cleaner beside
 * it, and the navy booking box. Below it, the price list — which reads
 * `lib/prices.ts` and simply does not render while that list is empty, so the
 * page never shows a figure nobody gave.
 */
export default function Prices() {
  return (
    <section id="arak" className="relative isolate overflow-hidden bg-accent-soft py-section" aria-labelledby="prices-title">
      <div aria-hidden="true" className="bg-cleaning pointer-events-none absolute inset-0 -z-10 opacity-70" />

      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Reveal>
              <Eyebrow className="bg-white">{PRICES.offerEyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="prices-title" className="mt-8 font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-none tracking-[-0.035em] text-accent">
                {PRICES.offerLead}
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p
                aria-label={`${PRICES.offerValue}%`}
                className="-ml-[0.04em] font-display text-[clamp(8.5rem,24vw,22rem)] font-bold leading-[0.82] tracking-[-0.07em] text-ink"
              >
                {PRICES.offerValue}
                <span className="text-[0.56em] text-accent">%</span>
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-lg text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-slate-600">{PRICES.offerText}</p>
            </Reveal>
          </div>

          <Reveal delay={140} className="hidden justify-self-end lg:block">
            <Image
              src="/brand/takaritono-illusztracio.svg"
              alt=""
              width={400}
              height={800}
              unoptimized
              className="h-[34rem] w-auto"
            />
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">{PRICES.offerTerms}</p>
          <Reveal delay={200}>
            <div className="inline-flex flex-col gap-5 rounded-[20px] bg-ink p-7 text-white sm:flex-row sm:items-center sm:gap-10 sm:p-9">
              <div>
                <p className="mb-2 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-white/60">Foglaljon most</p>
                <p className="text-[clamp(1.375rem,2.1vw,1.875rem)] font-semibold leading-tight">
                  <a href={`tel:${PHONE.href}`} className="hover:underline hover:underline-offset-4">
                    {PHONE.label}
                  </a>
                  <br />
                  <span className="font-medium">{WEB_LABEL}</span>
                </p>
              </div>
              <Button href="#kapcsolat" variant="onDark">
                {PRICES.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        {PRICE_LIST.length > 0 ? (
          <Reveal delay={100}>
            <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRICE_LIST.map((row) => (
                <li
                  key={row.name}
                  className={`flex flex-col rounded-[1.5rem] p-7 ${row.featured ? "bg-accent text-white" : "bg-white ring-1 ring-line"}`}
                >
                  <p className="font-display text-xl font-semibold tracking-[-0.02em]">{row.name}</p>
                  {row.detail ? <p className={`mt-1 text-sm ${row.featured ? "text-white/80" : "text-slate-500"}`}>{row.detail}</p> : null}
                  <p className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em]">
                    {formatEur(row.price)}
                    {row.from ? <span className="text-lg font-medium">-tól</span> : null}
                  </p>
                  <p className={`mt-1 text-sm ${row.featured ? "text-white/80" : "text-slate-500"}`}>/ {row.unit}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">{PRICES.note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
