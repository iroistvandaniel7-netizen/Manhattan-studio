"use client";

import { SERVICES } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/** Fired when a visitor asks for a quote on one service; the form preselects it. */
export const SERVICE_EVENT = "kt:service";

/**
 * The services as one sentence, set large. Each service in it is a link that
 * jumps to the form with that service already chosen, so the list is also
 * the way in. Under it, the short line that says what each one means.
 */
export default function Services() {
  const items = SERVICES.items;

  const requestQuote = (id: string) => {
    window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
  };

  return (
    <section id="szolgaltatasok" className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="services-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
        </Reveal>
        <h2 id="services-title" className="sr-only">
          {SERVICES.title}
        </h2>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.15] font-light tracking-[-0.03em] text-slate-400 sm:max-w-none">
            {SERVICES.intro}{" "}
            {items.map((item, i) => (
              <span key={item.id}>
                <a
                  href="#kapcsolat"
                  onClick={() => requestQuote(item.id)}
                  className="font-medium text-ink underline decoration-sky decoration-[0.08em] underline-offset-[0.14em] transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  {item.accusative}
                </a>
                {i < items.length - 2 ? ", " : i === items.length - 2 ? " és " : "."}
              </span>
            ))}{" "}
            {SERVICES.outro}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-10 text-[0.9375rem] text-slate-500">{SERVICES.hint}</p>
        </Reveal>

        <dl className="mt-20 border-t border-line">
          {items.map((item) => (
            <Reveal key={item.id} className="flex flex-col gap-2 border-b border-line py-7 sm:flex-row sm:items-baseline sm:gap-10">
              <dt className="text-xl font-medium tracking-[-0.02em] sm:w-[22rem] sm:shrink-0">{item.name}</dt>
              <dd className="max-w-2xl text-base leading-relaxed text-slate-600">{item.desc}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
