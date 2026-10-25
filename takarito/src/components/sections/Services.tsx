"use client";

import { useId, useRef, useState } from "react";
import { SERVICES } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { Check, ServiceIcon } from "@/components/graphics/Icons";

/** Fired when a visitor asks for a quote on one service; the form preselects it. */
export const SERVICE_EVENT = "kt:service";

/**
 * The services as a list beside one large panel, rather than a grid of six
 * equal cards: the list is the menu, the panel is the answer, and choosing
 * moves the answer instead of making the reader scan six boxes.
 *
 * A proper tablist — arrow keys move between services. Without scripting
 * nothing can be chosen, so every panel is shown stacked (see `.svc-off`).
 */
export default function Services() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = SERVICES.items;

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | null = null;
    if (event.key in keys) next = (active + keys[event.key] + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const requestQuote = (id: string) => {
    window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
  };

  return (
    <section id="szolgaltatasok" className="relative isolate overflow-hidden py-section" aria-labelledby="services-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="services-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              {SERVICES.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{SERVICES.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <Reveal>
            <div role="tablist" aria-orientation="vertical" aria-label={SERVICES.title} onKeyDown={onKeyDown} className="flex flex-col">
              {items.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabs.current[i] = node;
                    }}
                    id={`${uid}-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${uid}-panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`group flex items-center gap-5 border-t py-5 text-left transition-colors duration-200 last:border-b ${
                      selected ? "border-accent text-accent" : "border-line text-ink hover:text-accent"
                    }`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                        selected ? "bg-accent text-white" : "bg-accent-soft text-accent group-hover:bg-sky"
                      }`}
                    >
                      <ServiceIcon name={item.icon} className="size-6" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-extrabold tracking-[-0.02em] sm:text-xl">
                        {item.name}
                      </span>
                      <span className="label mt-1 block text-slate-500">{item.short}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-xl transition-transform duration-300 ${selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-6">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  id={`${uid}-panel-${item.id}`}
                  role="tabpanel"
                  aria-labelledby={`${uid}-tab-${item.id}`}
                  className={`relative overflow-hidden rounded-[1.75rem] bg-accent-soft p-7 sm:p-10 ${
                    i === active ? "pop-in" : "svc-off"
                  }`}
                >
                  <ServiceIcon
                    name={item.icon}
                    className="pointer-events-none absolute -right-8 -bottom-8 size-56 text-accent opacity-[0.07]"
                  />
                  <span className="grid size-16 place-items-center rounded-2xl bg-accent text-white">
                    <ServiceIcon name={item.icon} className="size-8" />
                  </span>
                  <h3 className="mt-7 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.02]">{item.name}</h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">{item.desc}</p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {item.includes.map((entry) => (
                      <li key={entry} className="flex items-start gap-3 text-sm font-medium">
                        <Check className="mt-px size-5 shrink-0 text-accent" />
                        {entry}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#kapcsolat"
                    onClick={() => requestQuote(item.id)}
                    className="group/btn label mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-white transition-colors duration-200 hover:bg-accent-deep"
                  >
                    {SERVICES.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
