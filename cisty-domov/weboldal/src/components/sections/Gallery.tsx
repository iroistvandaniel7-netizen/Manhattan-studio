import Image from "next/image";
import { GALLERY } from "@/lib/gallery";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

/**
 * Photos of the team's own jobs. Renders nothing while `lib/gallery.ts` is
 * empty: a section of borrowed or staged pictures presented as references
 * would be the one thing on this page a customer could rightly call a lie.
 */
export default function Gallery() {
  if (GALLERY.length === 0) return null;

  return (
    <section id="munkaink" className="relative isolate overflow-hidden bg-white py-section" aria-labelledby="gallery-title">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Munkáink</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 id="gallery-title" className="mt-5 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
            Előtte és utána.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal as="li" key={item.after} delay={i * 60}>
              <figure className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
                <div className={`grid ${item.before ? "grid-cols-2" : ""}`}>
                  {item.before ? (
                    <Image src={item.before} alt={`Előtte: ${item.caption}`} width={600} height={600} className="aspect-square object-cover" />
                  ) : null}
                  <Image src={item.after} alt={`Utána: ${item.caption}`} width={600} height={600} className="aspect-square object-cover" />
                </div>
                <figcaption className="px-5 py-4 text-sm text-slate-600">{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
