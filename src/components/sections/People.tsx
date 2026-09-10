import Image from "next/image";
import type { Dictionary } from "@/i18n";
import Reveal from "@/components/ui/Reveal";
import Landmarks from "@/components/graphics/Landmarks";
import street from "../../../public/manhattan-studio-street.jpg";

/**
 * A street photograph as a band between what the course gives you and the
 * invitation to get in touch — a page that has been abstract up to here (a
 * planet, silhouettes, price cards) meeting a real place before it asks for
 * anything.
 *
 * This replaced a cut-out of five people on white, which was composited with
 * `multiply` so the white fell away into the pink ground. That treatment is
 * gone with it, and had to be: `multiply` on a full photograph does not remove
 * a background, it drags every pixel toward the ground colour and turns a
 * street scene into a dark magenta smear. A photograph with its own sky is
 * shown as a photograph.
 *
 * The left-to-right wipe stays. It never depended on the cut-out — it is a
 * mask on the box, not on the image — and it is what makes this band arrive
 * rather than simply be there.
 *
 * Run full-bleed, which is what the studio asked for. The cost is real and
 * worth writing down: the file is 980px across, so past about a thousand
 * pixels of viewport it is being enlarged beyond its native size and softens.
 * It carries better than the cut-out it replaced would have — the faces here
 * are small in a busy frame rather than close-up portraits — but a larger
 * original would still be the fix, not a CSS change.
 *
 * It carries no caption, and the `alt` describes what is visible and asserts
 * nothing beyond it. Calling the two people students, teachers or anything
 * else would be a claim about real people that nothing in the studio's
 * material supports.
 */
export default function People({ dict }: { dict: Dictionary }) {
  return (
    <section
      aria-label={dict.people.alt}
      className="relative isolate overflow-hidden bg-white"
    >
      <Landmarks scene={0} />

      {/* No padding at all: the section IS the photograph, edge to edge and
          top to bottom. It sits between the dark "what you get" and the white
          contact section, so the only two edges it has are a hard one against
          the dark above — an ordinary section boundary — and a soft one into
          the white below. */}
      <Reveal className="relative">
        {/* The wipe is a mask on this box. It needs no background of its own
            now that nothing inside it blends with what is behind. */}
        <div className="people-wipe relative w-full">
          <Image
            src={street}
            alt={dict.people.alt}
            sizes="100vw"
            className="h-auto w-full"
          />

          {/*
            The bottom edge, softened into the ground.

            A hard horizontal cut across a street scene reads as a photograph
            that ran out. Fading the last stretch gives it somewhere to end,
            and it is kept shallow — the old cut-out could afford 22% because
            there was nothing down there but white, whereas here every pixel
            is picture and a deep fade would eat the taxi.

            It fades to white, not to the old pink: the pink ground is gone
            with the padding, and white is what the page actually is below
            this band. A gradient that ended in a colour nothing around it
            uses would read as a haze rather than as an edge.

            An overlay rather than a second mask layer: the wipe already owns
            this element's mask, and compositing two means `mask-composite`,
            spelled differently in WebKit — a lot of fragility for a gradient
            that can simply sit on top.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[13%] bg-[linear-gradient(to_top,var(--color-white)_15%,transparent)]"
          />
        </div>
      </Reveal>
    </section>
  );
}
