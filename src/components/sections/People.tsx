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
 * Held to the source's own width rather than run full-bleed, for the same
 * reason as before: the file is 980px across, and stretching it over a desktop
 * is an upscale that shows.
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
      className="relative isolate overflow-hidden bg-accent-soft py-10 sm:py-16"
    >
      <Landmarks scene={0} />

      <Reveal className="container-x relative">
        {/* The wipe is a mask on this box. It needs no background of its own
            now that nothing inside it blends with what is behind. */}
        <div className="people-wipe relative mx-auto w-full max-w-[60rem]">
          <Image
            src={street}
            alt={dict.people.alt}
            sizes="(min-width: 60rem) 980px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Reveal>
    </section>
  );
}
