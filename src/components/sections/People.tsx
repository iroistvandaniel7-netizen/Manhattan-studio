import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import Landmarks from "@/components/graphics/Landmarks";
import people from "../../../public/manhattan-studio-people.jpg";

/**
 * The studio's own photograph of five people, as a band between what the
 * course gives you and the invitation to get in touch — a page that has been
 * abstract up to here (a planet, silhouettes, price cards) meeting some faces
 * before it asks for anything.
 *
 * The picture is cut out on white, so it is composited with `multiply`: white
 * multiplied by the pink ground is the pink ground, and the background simply
 * disappears. No cut-out mask, no alpha channel, nothing to maintain — and the
 * people pick up a light wash of the brand colour, the same treatment the hero
 * photograph gets.
 *
 * It is held to the source's own 960px rather than run full-bleed. Stretched
 * across a desktop it is a 1.5× upscale, and softness that would pass on a
 * landscape is obvious on a face. Centred at its native size the band reads as
 * a composition rather than as a stretched picture.
 *
 * It carries no caption. Naming these five — as teachers, as staff, as
 * students — would be a claim about real people that nothing in the studio's
 * material supports, and the standing rule here is that anything which cannot
 * be traced back to the studio is left out rather than guessed. The `alt` text
 * describes what is visible and asserts nothing beyond it.
 */
export default function People({ dict }: { dict: Dictionary }) {
  return (
    <section
      aria-label={dict.people.alt}
      className="relative isolate overflow-hidden bg-accent-soft pt-10 sm:pt-16"
    >
      <Landmarks scene={0} />

      <Reveal className="relative">
        {/*
          The ground colour is repeated here, on the masked box itself, and it
          has to be. A masked element forms its own stacking context, so the
          photograph's `multiply` blends against whatever is inside that box —
          not against the section behind it. Without a background here the
          white blends with nothing and stays white, and the cut-out shows as a
          pale rectangle on the pink.
        */}
        <div className="people-wipe relative mx-auto w-full max-w-[60rem] bg-accent-soft">
          <Image
            src={people}
            alt={dict.people.alt}
            sizes="(min-width: 60rem) 960px, 100vw"
            className="h-auto w-full mix-blend-multiply"
          />

          {/*
            The source is cut off at chest height, and a hard horizontal edge
            reads as a photograph that ran out rather than as people standing
            behind the band. Fading the last stretch into the ground gives it
            somewhere to end.

            An overlay rather than a second mask layer: the wipe already owns
            the element's mask, and compositing two of them means
            `mask-composite`, which is spelled differently in WebKit and is a
            lot of fragility for a gradient that can simply sit on top.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,var(--color-accent-soft)_10%,transparent)]"
          />
        </div>
      </Reveal>
    </section>
  );
}
