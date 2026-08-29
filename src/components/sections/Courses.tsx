import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import CardRail from "@/components/ui/CardRail";
import AddToCart from "@/components/shop/AddToCart";
import { GROUP_COURSES, PRIVATE_PACKAGES, formatPrice, hourlyRate } from "@/lib/catalogue";

/**
 * The price list, and the shop.
 *
 * Two rails, because the two things are bought differently and the difference
 * matters to the reader: the group courses are three specific English courses
 * with a published price, and the private packages are one ladder that covers
 * all seven languages. Splitting the packages per language would have made
 * twenty-one prices out of three, and every one of them the same.
 *
 * Each rail is a row of cards you swipe, with the next card showing at the
 * edge — the shape a reader already knows from a shelf of products, and the
 * only honest way a row says there is more of it off the screen.
 *
 * On a wide screen all three fit, the rail stops scrolling and its arrows take
 * themselves away. Sizing the cards to force a peek there was tried and is
 * worse: three products are easier to choose between when all three are on
 * screen, and the overflow it bought was eighty pixels — one click from the
 * end, which is an arrow that may as well be disabled.
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

  /* One shared shape, so a course card and a package card are the same object
     in two colours rather than two designs that happen to sit near each other. */
  const card =
    "flex w-[min(84vw,21rem)] shrink-0 snap-start flex-col rounded-[1.75rem] p-7 sm:w-[22rem] sm:p-8 lg:w-[23rem]";

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
          <CardRail
            label={copy.groupTitle}
            previous={copy.railPrevious}
            next={copy.railNext}
            heading={
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.035em]">
                {copy.groupTitle}
              </h3>
            }
          >
            {GROUP_COURSES.map((product) => {
              const item = copy.items[product.id as keyof typeof copy.items];
              return (
                <article
                  key={product.id}
                  className={`${card} border border-ink/12 bg-white`}
                >
                  <p className="label text-slate-500">{copy.groupBadge}</p>
                  <h4 className="font-display mt-3 text-2xl font-extrabold tracking-[-0.035em]">
                    {item.name}
                  </h4>
                  {item.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
                  ) : null}

                  {/* `mt-auto` so the price and the button sit on one line
                      across the rail however long the description runs. */}
                  <p className="font-display mt-auto pt-7 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.045em] text-accent">
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
                    className="mt-6 rounded-full"
                  />
                </article>
              );
            })}
          </CardRail>
        </Reveal>

        {/* The six languages without a published group price. */}
        <Reveal delay={100} className="mt-10">
          <div className="flex flex-col gap-5 rounded-[1.75rem] border border-ink/15 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              {copy.groupNote}
            </p>
            <a
              href="#contact"
              className="label group/ask inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-7 py-4 text-white transition-colors duration-200 hover:bg-accent"
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
          <CardRail
            label={copy.privateTitle}
            previous={copy.railPrevious}
            next={copy.railNext}
            heading={
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.035em]">
                {copy.privateTitle}
              </h3>
            }
            intro={
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                {copy.privateLead}
              </p>
            }
          >
            {PRIVATE_PACKAGES.map((product) => {
              const item = copy.items[product.id as keyof typeof copy.items];
              return (
                <article key={product.id} className={`${card} bg-ink text-white`}>
                  <p className="label text-white/55">{copy.privateBadge}</p>
                  <h4 className="font-display mt-3 text-2xl font-extrabold tracking-[-0.035em]">
                    {item.name}
                  </h4>

                  <p className="font-display mt-auto pt-7 text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-none tracking-[-0.045em]">
                    {formatPrice(product.price, locale)}
                  </p>
                  {/*
                    The per-hour rate is what makes the ladder legible: 17.50,
                    then 17.00, then 16.50. Without it the packages are three
                    numbers and the reader has to do the division.
                  */}
                  <p className="label mt-3 text-white/65">
                    {formatPrice(hourlyRate(product), locale)} {copy.perHour}
                  </p>

                  <AddToCart
                    id={product.id}
                    name={item.name}
                    add={copy.add}
                    added={copy.added}
                    tone="dark"
                    className="mt-6 rounded-full"
                  />
                </article>
              );
            })}
          </CardRail>
        </Reveal>
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
