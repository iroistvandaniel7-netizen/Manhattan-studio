"use client";

import { useCallback, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";
import DotBoard from "@/components/graphics/DotBoard";
import { FLAGS } from "@/components/graphics/Flags";
import Globe, { type GlobePlace } from "@/components/graphics/Globe";
import {
  LANGUAGE_REGIONS,
  STUDIO_LONLAT,
  placesFor,
  type RegionKey,
} from "@/components/graphics/worldMap";

type Languages = Dictionary["languages"];

/**
 * The section's whole content: one globe, and the seven flags beside it.
 *
 * The names are on the sphere — each language written once, at whichever of its
 * places is facing the reader, so they travel as the globe turns rather than
 * sitting in a legend. The flags are the way in: press one and the globe turns
 * to that language, arcs a route to every place it is spoken, and names those
 * places underneath.
 *
 * A canvas has no text, so the list at the end is what a screen reader gets,
 * and — revealed by the `html:not([data-js])` rule in globals.css — what a
 * reader without scripting gets instead of a picture that will never draw.
 */
export default function LanguageGlobe({
  dict,
  city,
}: {
  dict: Languages;
  city: string;
}) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const onReady = useCallback(() => setReady(true), []);

  const places = useMemo<GlobePlace[]>(
    () =>
      dict.items.flatMap((language) =>
        placesFor(language.code).map((place) => ({
          key: `${language.code}-${place.key}-${place.lon}`,
          lang: language.code,
          name: language.name,
          lon: place.lon,
          lat: place.lat,
          label: place.label,
        })),
      ),
    [dict.items],
  );

  const selected = dict.items.find((language) => language.code === active) ?? null;
  const regions: RegionKey[] = active ? (LANGUAGE_REGIONS[active] ?? []) : [];

  return (
    <>
      <div className="relative min-h-0 flex-1 lg:absolute lg:inset-0">
        <div className="absolute inset-0">
          <Globe
            places={places}
            origin={STUDIO_LONLAT}
            originLabel={city}
            active={active}
            onReady={onReady}
          />
        </div>

        {/* Holds the space until the coastlines land, and stays without them. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        >
          <DotBoard className="max-w-3xl" />
        </div>
      </div>

      {/*
        The flags. A rail down the right edge where the globe has been shifted
        off-centre to make room for it, a row along the bottom where it has not.
      */}
      <div className="relative z-10 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:items-center">
        <ul className="flex flex-wrap items-center justify-center gap-2.5 px-5 pb-6 sm:gap-3 lg:flex-col lg:px-8 lg:pb-0">
          {dict.items.map((language) => {
            const Flag = FLAGS[language.code];
            const on = active === language.code;
            return (
              <li key={language.code}>
                <button
                  type="button"
                  aria-pressed={on}
                  data-lang={language.code}
                  onClick={() => setActive(on ? null : language.code)}
                  className={`block w-11 overflow-hidden transition duration-300 sm:w-12 ${
                    on
                      ? "scale-110 shadow-[0_0_0_2px_var(--color-accent),0_0_22px_rgba(194,0,122,0.6)]"
                      : "opacity-70 shadow-[0_0_0_1px_rgba(255,255,255,0.3)] hover:scale-105 hover:opacity-100"
                  }`}
                >
                  {Flag ? <Flag className="block h-auto w-full" /> : null}
                  <span className="sr-only">{language.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* What the pressed flag means, in words. */}
      <div
        aria-live="polite"
        className="relative z-10 min-h-[5rem] px-5 pb-10 sm:px-8 lg:absolute lg:bottom-0 lg:left-0 lg:max-w-xl lg:px-[clamp(1.25rem,5vw,4rem)] lg:pb-12"
      >
        {selected ? (
          <>
            <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-white sm:text-2xl">
              {selected.name}
            </p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="label text-white/60">{dict.map.spokenIn}</span>
              {regions.map((key) => (
                <span
                  key={key}
                  className="border border-white/25 px-2.5 py-1 text-[0.8125rem] leading-none text-white/90"
                >
                  {dict.regions[key]}
                </span>
              ))}
            </p>
          </>
        ) : null}
      </div>

      {/*
        Nothing but `sr-only` and `bare-reveal` belongs on this element. Layout
        utilities set width and padding, which is exactly what `sr-only` sets to
        collapse the box — whichever lands later in the stylesheet wins, and the
        list ends up neither properly hidden nor properly laid out. The inner
        element carries the layout, and only matters once it is revealed.
      */}
      <div className="sr-only bare-reveal">
        <div className="container-x pb-16 text-white">
          <p className="label text-white/60">{dict.map.caption}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {dict.items.map((language) => (
              <li key={language.code} className="text-sm leading-relaxed text-white/85">
                <span className="font-display font-extrabold">{language.name}</span>
                {" — "}
                {dict.map.spokenIn}:{" "}
                {(LANGUAGE_REGIONS[language.code] ?? [])
                  .map((key) => dict.regions[key])
                  .join(", ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
