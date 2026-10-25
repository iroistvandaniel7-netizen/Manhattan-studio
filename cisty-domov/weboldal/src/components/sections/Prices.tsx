import type { Dictionary } from "@/i18n";
import { PRICE_LIST, formatEur } from "@/lib/prices";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/**
 * The introductory offer, set as one big figure and one sentence on the pale
 * brand blue. Below it the price list, as plain rows — rendered only once
 * `lib/prices.ts` has prices in it, so the page never shows a made-up figure.
 */
export default function Prices({ copy }: { copy: Dictionary["prices"] }) {
  return (
    <section id="prices" className="relative isolate overflow-hidden bg-accent-soft py-section" aria-labelledby="prices-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="prices-title" className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className="text-[clamp(6rem,19vw,17rem)] leading-[0.85] font-semibold tracking-[-0.06em] text-ink">
              {copy.value}%
            </span>
            <span className="text-[clamp(1.75rem,3.4vw,3rem)] leading-tight font-light tracking-[-0.02em] text-accent-ink">
              {copy.lead}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-600">{copy.text}</p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Button href="#contact">{copy.cta}</Button>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">{copy.terms}</p>
          </div>
        </Reveal>

        {PRICE_LIST.length > 0 ? (
          <Reveal delay={100}>
            <dl className="mt-20 border-t border-ink/15">
              {PRICE_LIST.map((row) => (
                <div key={row.name} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-ink/15 py-6">
                  <dt>
                    <span className="text-xl font-medium tracking-[-0.02em]">{row.name}</span>
                    {row.detail ? <span className="mt-1 block text-sm text-slate-500">{row.detail}</span> : null}
                  </dt>
                  <dd className="text-2xl font-semibold tracking-[-0.02em] text-accent-ink tabular-nums">
                    {formatEur(row.price)}
                    {row.from ? copy.from : ""}
                    <span className="ml-1.5 text-base font-normal text-slate-500">/ {row.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-slate-500">{copy.note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
