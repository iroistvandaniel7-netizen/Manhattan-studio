import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import PaceChart from "@/components/graphics/PaceChart";
import Reveal from "@/components/ui/Reveal";
import StudyScene from "@/components/graphics/StudyScene";
import { FlagMark } from "@/components/graphics/Flags";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/rolunk`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}/rolunk`])),
    },
  };
}

/**
 * The about page.
 *
 * The studio wrote the words; the only thing added here is structure. It runs
 * in three movements — who this is for, why here, and what shape the teaching
 * takes — and each is set differently so the page has a rhythm rather than
 * three identical stacks of cards.
 *
 * The course formats deliberately carry no price and no buy button. The shop
 * sells the specific courses that are currently running; this page describes
 * the shapes teaching can take, and a "add to basket" next to "Intensive
 * course" would promise a product that has no price on this site.
 */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const copy = dict.about;
  const home = `/${locale}`;

  /* The chart draws the three paces, so it takes the first three course
     headings. The fourth ("beginner to advanced") is about level, not tempo,
     and belongs to the list rather than the curve. */
  const paceLabels = [
    copy.coursesItems[0].title,
    copy.coursesItems[1].title,
    copy.coursesItems[2].title,
  ] as const;

  return (
    <>
      {/* --- Who this is for ------------------------------------------- */}
      <section className="relative isolate overflow-hidden pb-section pt-32 sm:pt-40">
        <Landmarks scene={1} />

        <div className="container-x relative">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">{copy.title}</h1>
            </Reveal>

            {/*
              The three opening lines, set as they were written: three
              questions, then the answer on its own. The answer is the shortest
              sentence on the page and gets the most weight — running it into
              the paragraph above would bury the one thing the reader came to
              hear.
            */}
            <Reveal delay={130}>
              <p className="mt-8 text-lg leading-relaxed text-slate-600 sm:text-xl">{copy.lead}</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 font-display text-[clamp(1.5rem,3.4vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-accent">
                {copy.leadStrong}
              </p>
            </Reveal>
            <Reveal delay={230}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
                {copy.leadMore}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- Why here -------------------------------------------------- *
          On ink, like the home page's "what you get": this is the section
          that makes the case, and the change of ground is what marks it as
          the argument rather than more introduction. */}
      <section className="on-dark relative isolate overflow-hidden bg-ink py-section text-white">
        <Landmarks scene={2} tone="dark" />

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
          <StudyScene tone="dark" className="h-[34vw] max-h-64 w-full opacity-[0.14]" />
        </div>

        <div className="container-x relative pb-28 sm:pb-36">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.98]">
              {copy.whyTitle}
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-px sm:mt-16 lg:grid-cols-2">
            {copy.whyItems.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={Math.min(i, 4) * 60}
                className="border-t border-white/20 py-7 lg:odd:pr-10 lg:even:pl-10 lg:even:border-l-0"
              >
                <h3 className="flex items-start gap-3 font-display text-xl font-extrabold leading-tight tracking-[-0.018em] sm:text-2xl">
                  <FlagMark className="mt-2 h-[0.8rem] w-[1.2rem] shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="mt-3 pl-[1.95rem] text-sm leading-relaxed text-white/70">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- What shape the teaching takes ----------------------------- */}
      <section className="relative isolate overflow-hidden py-section">
        <Landmarks scene={0} />

        <div className="container-x relative">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] leading-[1]">{copy.coursesTitle}</h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{copy.coursesLead}</p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-12">
            {/* The four formats. A numbered column, because the first three
                really are a sequence — they are the same thing at three
                speeds, and the chart beside them says so. */}
            <ol className="lg:col-span-7">
              {copy.coursesItems.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={Math.min(i, 4) * 55}
                  className="flex gap-5 border-t border-line py-6 last:border-b sm:gap-7"
                >
                  <span
                    aria-hidden="true"
                    className="label mt-1.5 shrink-0 text-accent tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold leading-tight tracking-[-0.018em] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="border border-line p-7 text-accent sm:p-8">
                <PaceChart labels={paceLabels} axis={copy.chartAxis} />
                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-slate-600">
                  {copy.chartNote}
                </p>
              </div>
            </Reveal>
          </div>

          {/* The closing line, at the size it deserves — it is the argument
              of the whole page in one sentence. */}
          <Reveal delay={80} className="mt-20 border-t border-line pt-12 sm:mt-28">
            <p className="max-w-4xl font-display text-[clamp(1.375rem,3.4vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {copy.closing}
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`${home}#courses`}
              className="label inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-white transition-colors duration-200 hover:bg-accent-deep"
            >
              {copy.ctaCourses}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`${home}/kapcsolat`}
              className="label inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 transition-colors duration-200 hover:border-ink"
            >
              {copy.ctaContact}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
