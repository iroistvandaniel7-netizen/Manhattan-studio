import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NoBreak from "@/components/ui/NoBreak";
import Parallax from "@/components/ui/Parallax";
import Marquee from "@/components/ui/Marquee";
import Skyline from "@/components/graphics/Skyline";
import BridgeLines from "@/components/graphics/BridgeLines";

/**
 * The signature section: ink ground, paper type, oversized display lettering
 * and layered architectural line-art.
 */
export default function ManhattanSection({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="manhattan"
      className="on-ink grain relative isolate overflow-hidden bg-ink py-section text-paper"
      aria-labelledby="manhattan-title"
    >
      {/* --- Background layer ------------------------------------------ */}

      {/* Oversized wordmark, cropped by the viewport on both sides. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center"
      >
        <span className="block text-[26vw] font-extrabold leading-none tracking-[-0.06em] text-paper/[0.045]">
          MANHATTAN
        </span>
      </div>

      <Parallax
        speed={0.08}
        className="pointer-events-none absolute -left-[10%] top-[6%] -z-10 w-[78vw] max-w-3xl text-paper opacity-[0.14] lg:left-[-4%] lg:w-[42vw]"
      >
        <BridgeLines className="h-auto w-full" strokeWidth={1.1} />
      </Parallax>

      <Parallax
        speed={0.12}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
      >
        <Skyline
          className="h-[30vh] w-[150%] max-w-none text-paper opacity-[0.2] sm:h-[34vh] sm:w-[124%] lg:h-[42vh] lg:w-[108%]"
          variant="outline"
          strokeWidth={1}
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(105%_70%_at_50%_45%,var(--color-ink)_28%,transparent_82%)]"
      />

      {/* --- Content --------------------------------------------------- */}
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow invert>{dict.manhattan.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2
                id="manhattan-title"
                className="mt-7 text-[clamp(2.125rem,5.6vw,4.75rem)] font-extrabold leading-[0.96] tracking-[-0.04em]"
              >
                <NoBreak>{dict.manhattan.title}</NoBreak>
              </h2>
            </Reveal>
            <Reveal delay={170}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/65 sm:text-lg">
                {dict.manhattan.lead}
              </p>
            </Reveal>
          </div>

          {/* Three principles, as a numbered editorial list */}
          <div className="lg:col-span-5 lg:pt-3">
            <dl className="flex flex-col">
              {dict.manhattan.points.map((point, i) => (
                <Reveal
                  key={point.k}
                  delay={220 + i * 90}
                  className="group/pt border-t border-paper/20 py-6 last:border-b sm:py-7"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="text-[0.6875rem] font-semibold tabular-nums tracking-[0.2em] text-paper/40">
                      0{i + 1}
                    </span>
                    <span className="text-xl font-bold tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pt:translate-x-1.5 sm:text-2xl">
                      {point.k}
                    </span>
                  </dt>
                  <dd className="mt-2.5 pl-[2.4rem] text-sm leading-relaxed text-paper/60">
                    {point.v}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Marquee band */}
      <div className="relative mt-16 border-y border-paper/15 py-5 sm:mt-24">
        <Marquee
          text={dict.manhattan.marquee}
          repeat={3}
          className="edge-fade"
          itemClassName="px-2 text-[clamp(1.5rem,3.4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em] text-paper/25 whitespace-pre"
        />
      </div>
    </section>
  );
}
