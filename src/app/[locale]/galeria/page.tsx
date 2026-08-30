import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import Eyebrow from "@/components/ui/Eyebrow";
import Landmarks from "@/components/graphics/Landmarks";
import Reveal from "@/components/ui/Reveal";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import banner from "../../../../public/gallery/times-square.jpg";

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
    title: dict.gallery.title,
    description: dict.gallery.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/galeria`,
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}/galeria`]),
      ),
    },
  };
}

/**
 * The gallery.
 *
 * Two kinds of picture, kept apart by the page's own structure rather than by
 * a disclaimer. The Times Square photograph opens the page under its own
 * caption, naming only what it is; the studio's four photographs follow under
 * a heading that says they are the studio. Mixed into one grid the New York
 * shot would read as a fifth room, and a gallery that implies a language
 * school in Dunajská Streda has premises on Times Square is exactly the kind
 * of claim this site does not make.
 */
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const copy = dict.gallery;

  return (
    <section className="relative isolate overflow-hidden pb-section pt-32 sm:pt-40">
      <Landmarks scene={1} />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">{copy.title}</h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{copy.lead}</p>
          </Reveal>
        </div>

        {/*
          The banner is 980px wide at source, so it is capped there rather than
          run full-bleed: stretched across a desktop it would be a 2x upscale of
          a photograph that is mostly fine detail — signage and lettering, which
          is the first thing to fall apart under enlargement.
        */}
        <Reveal delay={60} className="mt-12 sm:mt-16">
          <figure className="mx-auto w-full max-w-[61.25rem]">
            <Image
              src={banner}
              alt={copy.bannerAlt}
              sizes="(min-width: 61.25rem) 980px, 100vw"
              className="h-auto w-full rounded-[1.5rem]"
              priority
            />
            <figcaption className="label mt-3 text-slate-500">{copy.bannerCaption}</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={40} className="mt-16 sm:mt-24">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.012em]">
            {copy.inside}
          </h2>
        </Reveal>

        <GalleryGrid dict={dict} />
      </div>
    </section>
  );
}
