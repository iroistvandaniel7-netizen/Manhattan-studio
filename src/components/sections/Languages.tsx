import type { Dictionary } from "@/i18n";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import LanguageGlobe from "./LanguageGlobe";

/**
 * What the studio teaches.
 *
 * The section is one dark field with the planet across it, and the seven
 * languages read as a list rather than as writing on the sphere. Both were on
 * the globe once: five of the seven are taught within a few hundred kilometres
 * of each other, so their names landed in a single thumbprint of Central Europe
 * and had to be fanned outward on leader lines. The sphere is the place, the
 * list is the reading, and neither is now doing the other's job.
 *
 * On a phone the two stack — planet above, list below. Above `lg` the list sits
 * in the lower-left over the sphere, in the gutter the globe's framing already
 * keeps clear, and a scrim behind it holds the type legible wherever the
 * continents happen to have turned.
 */
export default function Languages({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="languages"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      aria-labelledby="languages-title"
    >
      {/*
        Heading and list both stay in normal flow, at the top and the foot of a
        column; the sphere fills the section behind them. That is what lets the
        globe be full-height on a phone — it is no longer competing for the
        space, it is underneath it — while the two blocks of type still set the
        section's minimum height and can never land on top of each other.

        `pointer-events-none` on the block, `auto` back on each line of type.
        The block runs the full width of the section and lies over the top of
        the sphere; without it the block swallows every drag aimed at that third
        of the planet. Re-enabling on the text itself — which is width-capped —
        keeps the heading selectable while the space around it passes through.
      */}
      <div className="container-x pointer-events-none relative z-20 shrink-0 pt-20 pb-8 sm:pt-28 lg:pt-32">
        <Reveal>
          <Eyebrow invert>{dict.languages.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2
            id="languages-title"
            className="pointer-events-auto mt-5 max-w-md text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95]"
          >
            {dict.languages.title}
          </h2>
        </Reveal>
        <Reveal delay={130}>
          <p className="pointer-events-auto mt-5 max-w-sm text-base leading-relaxed text-white/75">
            {dict.languages.lead}
          </p>
        </Reveal>
        {/* Next to the lead rather than under the sphere: at the foot of a
            full-height section the hint sits on the fold and is missed. */}
        <Reveal delay={190}>
          <p className="label pointer-events-auto mt-6 flex w-fit items-center gap-2.5 text-white/55">
            <span aria-hidden="true" className="text-sm leading-none">
              ↔
            </span>
            {dict.languages.map.drag}
          </p>
        </Reveal>
      </div>

      {/*
        Scrims, top and bottom. Type sits over the sphere at both ends of the
        section, and the continents are the brightest thing in it — without
        these the heading and the list land on whatever the planet happens to
        have turned to, which changes from second to second.

        Both are gradients rather than panels: a panel would cut the globe into
        strips, and the point of the section is that it is one planet.
      */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-[5] h-[44%]
          bg-[linear-gradient(to_bottom,var(--color-ink)_20%,rgba(11,7,16,0.88)_48%,rgba(11,7,16,0.55)_72%,transparent_100%)]
          lg:h-[46%] lg:w-[44rem] lg:bg-[radial-gradient(120%_100%_at_0%_0%,rgba(11,7,16,0.95)_0%,rgba(11,7,16,0.72)_42%,transparent_74%)]
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[58%]
          bg-[linear-gradient(to_top,var(--color-ink)_22%,rgba(11,7,16,0.86)_46%,rgba(11,7,16,0.5)_72%,transparent_100%)]
          lg:h-[62%] lg:w-[46rem] lg:bg-[radial-gradient(120%_100%_at_0%_100%,rgba(11,7,16,0.96)_0%,rgba(11,7,16,0.82)_40%,transparent_74%)]
        "
      />

      <LanguageGlobe dict={dict.languages} city={dict.contact.city} />
    </section>
  );
}
