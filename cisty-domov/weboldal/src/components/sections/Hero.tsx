import Image from "next/image";
import { HERO } from "@/lib/content";
import { PHONE, WEB_LABEL } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

/**
 * Poster 1, "Tiszta otthon. Több szabad idő.", made into the first screen —
 * built to match `cisty-domov/forras/posters.js` (poster 1) rather than
 * reinterpret it: white ground, the logo's house grown huge and pale and cut
 * off at the bottom-right corner, the cleaner standing in front of it, and the
 * blue contact box at the bottom left.
 *
 * The logo itself is the header's, which sits over this section top-left
 * exactly where the poster has it.
 *
 * Mobile: one column, the cleaner below the copy and smaller.
 */
export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white pt-32 pb-0 text-ink sm:pt-40 lg:flex lg:min-h-[100svh] lg:flex-col lg:pb-14"
      aria-labelledby="hero-title"
    >
      {/* The house mark, huge and pale, spilling off the right and bottom. */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute -right-[38%] -bottom-[6%] -z-10 w-[130vw] sm:-right-[22%] sm:w-[90vw] lg:-right-[12%] lg:-bottom-[18%] lg:w-[min(64vw,62rem)]"
      >
        <path
          d="M50 10 L90 43 L90 90 L10 90 L10 43 Z"
          fill="#EAF2FD"
          stroke="#EAF2FD"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <path
          d="M50 42 C51.8 56 55 59.6 69 61.5 C55 63.4 51.8 67 50 81 C48.2 67 45 63.4 31 61.5 C45 59.6 48.2 56 50 42 Z"
          fill="#FFFFFF"
        />
      </svg>

      <div className="container-x relative lg:flex lg:flex-1 lg:flex-col">
        <div className="relative lg:mt-[4vh]">
          <Reveal>
            <p className="text-[clamp(0.8125rem,1.2vw,1.25rem)] font-semibold uppercase tracking-[0.2em] text-accent">
              {HERO.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1
              id="hero-title"
              className="hero-display mt-[clamp(1rem,2.2vw,2.25rem)] text-[clamp(3rem,8.4vw,8.25rem)] leading-[0.95] tracking-[-0.035em]"
            >
              <span className="block font-semibold text-ink">{HERO.title}</span>
              <span className="block font-normal text-accent">{HERO.titleSoft}</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-[clamp(1.5rem,3vw,3rem)] max-w-[40rem] text-[clamp(1.125rem,1.55vw,1.375rem)] leading-[1.4] text-slate-600">
              {HERO.lead}
            </p>
          </Reveal>
        </div>

        {/* The poster's blue contact box, bottom left. */}
        <Reveal delay={180} className="relative mt-10 lg:mt-auto lg:pt-12">
          <div className="inline-block rounded-[20px] bg-accent px-7 py-6 text-white sm:px-10 sm:py-8">
            <p className="mb-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-white/70">
              Kérjen ajánlatot
            </p>
            <p className="text-[clamp(1.375rem,2.1vw,1.875rem)] font-semibold leading-tight">
              <a href={`tel:${PHONE.href}`} className="hover:underline hover:underline-offset-4">
                {PHONE.label}
              </a>
              <br />
              <a href="#kapcsolat" className="font-medium hover:underline hover:underline-offset-4">
                {WEB_LABEL}
              </a>
            </p>
          </div>
        </Reveal>
      </div>

      {/* The cleaner, in front of the house. Below the copy on small screens. */}
      <div className="relative mt-8 flex justify-end pr-[8vw] lg:absolute lg:right-[5vw] lg:bottom-[5vh] lg:mt-0 lg:pr-0">
        <Image
          src="/brand/takaritono-illusztracio.svg"
          alt=""
          width={400}
          height={800}
          priority
          unoptimized
          className="h-[22rem] w-auto sm:h-[28rem] lg:h-[min(64svh,40rem)]"
        />
      </div>
    </section>
  );
}
