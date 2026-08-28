import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import AddToCart from "@/components/shop/AddToCart";
import { GROUP_COURSES, PRIVATE_PACKAGES, formatPrice, hourlyRate } from "@/lib/catalogue";

/**
 * The price list, and the shop.
 *
 * Two groups, because they are sold differently and the difference matters to
 * the reader: the group courses are three specific English courses with a
 * published price, and the private packages are one ladder that covers all
 * seven languages. Splitting the packages per language would have made
 * twenty-one prices out of three, and every one of them the same.
 *
 * Only the courses the studio has actually priced appear here. Group lessons
 * in the other six languages are arranged at the studio, and the section says
 * so rather than showing a figure nobody quoted.
 */
export default function Courses({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const copy = dict.courses;

  return (
    <section
      id="courses"
      className="relative isolate overflow-hidden bg-accent-soft py-section"
      aria-labelledby="courses-title"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              id="courses-title"
              className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
            >
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{copy.lead}</p>
          </Reveal>
        </div>

        {/* --- Group courses ------------------------------------------- */}
        <Reveal delay={60} className="mt-14 sm:mt-20">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.035em]">
            {copy.groupTitle}
          </h3>
        </Reveal>

        <ul className="mt-8 grid gap-px bg-ink/12 sm:mt-10 lg:grid-cols-3">
          {GROUP_COURSES.map((product, i) => {
            const item = copy.items[product.id as keyof typeof copy.items];
            return (
              <Reveal
                as="li"
                key={product.id}
                delay={i * 80}
                className="flex flex-col bg-accent-soft p-7 sm:p-8"
              >
                <h4 className="font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                  {item.name}
                </h4>
                {item.note ? (
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.note}</p>
                ) : null}

                <p className="font-display mt-6 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.045em] text-accent">
                  {formatPrice(product.price, locale)}
                </p>
                <p className="label mt-3 text-slate-600">
                  {product.hours} {copy.hours} · {formatPrice(hourlyRate(product), locale)}{" "}
                  {copy.perHour}
                </p>

                <AddToCart
                  id={product.id}
                  name={item.name}
                  add={copy.add}
                  added={copy.added}
                  className="mt-7"
                />
              </Reveal>
            );
          })}
        </ul>

        {/* The six languages without a published group price. */}
        <Reveal delay={100} className="mt-8">
          <div className="flex flex-col gap-5 border-2 border-ink/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              {copy.groupNote}
            </p>
            <a
              href="#contact"
              className="label group/ask inline-flex shrink-0 items-center gap-3 bg-ink px-6 py-3.5 text-white transition-colors duration-200 hover:bg-accent"
            >
              {copy.groupEnquire}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/ask:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>

        {/* --- Private lessons ----------------------------------------- */}
        <Reveal delay={60} className="mt-16 sm:mt-24">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.035em]">
            {copy.privateTitle}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            {copy.privateLead}
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-px bg-white/50 sm:mt-10 lg:grid-cols-3">
          {PRIVATE_PACKAGES.map((product, i) => {
            const item = copy.items[product.id as keyof typeof copy.items];
            return (
              <Reveal
                as="li"
                key={product.id}
                delay={i * 80}
                className="flex flex-col bg-ink p-7 text-white sm:p-8"
              >
                <h4 className="font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                  {item.name}
                </h4>
                <p className="font-display mt-6 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.045em]">
                  {formatPrice(product.price, locale)}
                </p>
                {/*
                  The per-hour rate is what makes the ladder legible: 17.50,
                  then 17.00, then 16.50. Without it the packages are three
                  numbers and the reader has to do the division.
                */}
                <p className="label mt-3 text-white/60">
                  {formatPrice(hourlyRate(product), locale)} {copy.perHour}
                </p>

                <AddToCart
                  id={product.id}
                  name={item.name}
                  add={copy.add}
                  added={copy.added}
                  tone="dark"
                  className="mt-7"
                />
              </Reveal>
            );
          })}
        </ul>
      </div>

      {/* Moving band of the seven languages */}
      <div className="mt-16 border-y-2 border-ink bg-white py-4 sm:mt-24">
        <Marquee
          text={dict.languages.items.map((l) => l.name).join("  ·  ") + "  ·  "}
          repeat={2}
          className="edge-fade"
          itemClassName="whitespace-pre px-2 font-display text-[clamp(1.25rem,2.6vw,2rem)] font-extrabold uppercase tracking-[-0.02em] text-accent"
        />
      </div>
    </section>
  );
}
