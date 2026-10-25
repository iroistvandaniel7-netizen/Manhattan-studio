import { WHY } from "@/lib/content";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CleanScene from "@/components/graphics/CleanScene";
import { Sparkle } from "@/components/graphics/Icons";

/**
 * What a customer can count on, on a navy ground. A hanging list rather than a
 * card grid: alternate rows step in, so the column has a rhythm.
 */
export default function Why() {
  return (
    <section id="miert-mi" className="on-dark relative isolate overflow-hidden bg-ink py-section text-white" aria-labelledby="why-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <CleanScene tone="dark" className="h-[34vw] max-h-64 w-full opacity-[0.16]" />
      </div>

      <div className="container-x relative pb-32 sm:pb-40">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow invert>{WHY.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 id="why-title" className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]">
              {WHY.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 sm:mt-20">
          {WHY.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={Math.min(i, 5) * 55}
              className={`group/item border-t border-white/20 py-6 last:border-b sm:py-7 ${i % 2 === 1 ? "lg:pl-[12%]" : ""}`}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-10">
                <h3 className="flex items-center gap-3 font-display text-[clamp(1.25rem,2.6vw,1.875rem)] font-extrabold leading-tight lg:w-[46%] lg:shrink-0">
                  <Sparkle className="size-4 shrink-0 text-accent-lift" />
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-1.5">
                    {item.title}
                  </span>
                </h3>
                <p className="max-w-md pl-7 text-sm leading-relaxed text-white/70 lg:pl-0">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
