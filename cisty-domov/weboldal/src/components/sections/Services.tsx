"use client";

import { SERVICES } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import ServiceArt from "@/components/graphics/ServiceArt";
import { Check } from "@/components/graphics/Icons";

/** Fired when a visitor asks for a quote on one service; the form preselects it. */
export const SERVICE_EVENT = "kt:service";

/*
 * A bento of five: the everyday service gets the big tile, deep cleaning sits
 * beside it, the three occasional ones share the row below. Sizes follow how
 * often people book them, not a grid that happens to fit.
 */
const SPANS = ["lg:col-span-4 lg:row-span-2", "lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export default function Services() {
  const requestQuote = (id: string) => {
    window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
  };

  return (
    <section id="szolgaltatasok" className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="services-title">
      <div aria-hidden="true" className="bg-cleaning bg-cleaning-drift pointer-events-none absolute inset-0 -z-10" />

      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 id="services-title" className="mt-5 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95]">
                {SERVICES.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130}>
            <p className="max-w-sm text-lg leading-relaxed text-slate-600">{SERVICES.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:auto-rows-[minmax(15rem,auto)]">
          {SERVICES.items.map((item, i) => {
            const big = i === 0;
            return (
              <Reveal as="li" key={item.id} delay={i * 70} className={`${SPANS[i]} ${big ? "sm:col-span-2" : ""}`}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,45,91,0.14)] sm:p-9 ${
                    big ? "bg-accent text-white" : "bg-paper ring-1 ring-line"
                  }`}
                >
                  {big ? (
                    <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-24 w-[26rem] text-white/[0.07]">
                      <path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
                    </svg>
                  ) : null}

                  <div className="relative flex items-start justify-between gap-6">
                    <span className={`font-display text-sm font-medium tabular-nums ${big ? "text-white/60" : "text-slate-500"}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`grid shrink-0 place-items-center rounded-[1.5rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-3 group-hover:scale-105 ${
                        big ? "size-36 bg-white sm:size-44" : "size-24 bg-white ring-1 ring-line"
                      }`}
                    >
                      <ServiceArt name={item.icon} className={big ? "size-28 sm:size-36" : "size-18"} />
                    </span>
                  </div>

                  <div className="relative mt-auto pt-8">
                    <h3 className={`${big ? "text-[clamp(2rem,3.6vw,3.25rem)]" : "text-2xl"} leading-[1.02]`}>{item.name}</h3>
                    <p className={`mt-2 text-[0.9375rem] ${big ? "text-white/80" : "text-slate-500"}`}>{item.short}</p>

                    {big ? (
                      <>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85">{item.desc}</p>
                        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                          {item.includes.map((entry) => (
                            <li key={entry} className="flex items-center gap-2.5 text-[0.9375rem] font-medium">
                              <Check className="size-5 shrink-0 text-white" />
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.includes.slice(0, 3).map((entry) => (
                          <li key={entry} className="rounded-full bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-slate-600 ring-1 ring-line">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href="#kapcsolat"
                      onClick={() => requestQuote(item.id)}
                      className={`mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold ${big ? "text-white" : "text-accent"}`}
                    >
                      <span className="link-underline">{SERVICES.cta}</span>
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
