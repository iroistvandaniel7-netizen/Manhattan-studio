"use client";

import { useCallback, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";
import DotBoard from "@/components/graphics/DotBoard";
import Globe, { type GlobePlace } from "@/components/graphics/Globe";
import {
  LANGUAGE_REGIONS,
  STUDIO_LONLAT,
  placesFor,
} from "@/components/graphics/worldMap";

type Languages = Dictionary["languages"];

/**
 * The section's whole content: one globe.
 *
 * The languages are not listed beside it, they are on it — each named once, at
 * whichever of its places is facing the reader, so the names move as the globe
 * turns rather than sitting in a legend. Drag to turn it; put the pointer near
 * a marker and that language comes up with a route back to the classroom.
 *
 * A canvas has no text, so the list underneath is what a screen reader gets,
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

  return (
    <>
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <Globe
            places={places}
            origin={STUDIO_LONLAT}
            originLabel={city}
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
        Nothing but `sr-only` and `bare-reveal` belongs on this element. Layout
        utilities set width and padding, which is exactly what `sr-only` sets to
        collapse the box — whichever lands later in the stylesheet wins, and the
        list ends up neither properly hidden nor properly laid out. The inner
        element carries the layout, and only matters once it is revealed.
      */}
      <div className="sr-only bare-reveal">
        <div className="container-x pb-16 text-white">
          <p className="label text-white/55">{dict.map.caption}</p>
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
