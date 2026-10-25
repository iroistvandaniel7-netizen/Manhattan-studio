"use client";

import { OFFICE } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SERVICE_EVENT } from "./Services";

/**
 * Poster 5 as a section: navy ground, the headline stacked over three lines,
 * the brand's glint grown huge in the corner, and the four things a company
 * actually asks about.
 */
export default function Office() {
  return (
    <section id="irodaknak" className="on-dark relative isolate overflow-hidden bg-ink py-section text-white" aria-labelledby="office-title">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 -z-10 w-[min(70vw,40rem)] text-accent opacity-70 sm:top-6 sm:right-6 sm:opacity-100"
      >
        <path d="M50 4 C54 38 62 46 96 50 C62 54 54 62 50 96 C46 62 38 54 4 50 C38 46 46 38 50 4 Z" fill="currentColor" />
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60%_60%_at_100%_0%,rgba(27,99,214,0.35)_0%,transparent_70%)]" />

      <div className="container-x">
        <Reveal>
          <Eyebrow invert>{OFFICE.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="office-title" className="mt-8 text-[clamp(3.25rem,10vw,9rem)] leading-[0.9] tracking-[-0.045em]">
            <span className="block">{OFFICE.title}</span>
            <span className="block font-normal text-accent-lift">{OFFICE.titleSoft}</span>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="mt-8 max-w-lg text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-white/75">{OFFICE.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {OFFICE.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 60} className="flex items-center gap-4 text-lg font-medium">
                <svg viewBox="0 0 24 24" className="size-8 shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#1B63D6" />
                  <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <Button
              href="#kapcsolat"
              variant="onDark"
              onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: "iroda" }))}
            >
              {OFFICE.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
