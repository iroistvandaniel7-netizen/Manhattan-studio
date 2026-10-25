"use client";

import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SERVICE_EVENT } from "./Services";

/** For companies: the navy poster, reduced to its headline and four plain facts. */
export default function Office({ copy }: { copy: Dictionary["office"] }) {
  return (
    <section id="office" className="on-dark relative isolate overflow-hidden bg-ink py-section text-white" aria-labelledby="office-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow invert>{copy.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="office-title" className="mt-8 text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em]">
            {copy.title}
            <br />
            <span className="font-light text-accent-lift">{copy.titleSoft}</span>
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="mt-10 max-w-lg text-lg leading-relaxed text-white/75">{copy.lead}</p>
        </Reveal>
        <Reveal delay={170}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white">
            {copy.items.join(" · ")}
          </p>
        </Reveal>
        <Reveal delay={210}>
          <Button
            href="#contact"
            variant="onDark"
            className="mt-12"
            onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: "iroda" }))}
          >
            {copy.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
