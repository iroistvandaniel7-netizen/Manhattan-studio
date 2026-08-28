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
 * The section's content: the globe, and the seven languages as a list.
 *
 * The list is not a legend for the picture — it is where the reading happens.
 * Naming all seven on the sphere put five of them in one thumbprint of Central
 * Europe, fanned out on leader lines over the continents; the countries now sit
 * in type, where they can be read, and the globe answers *where* rather than
 * *which*. Choosing a language flies the globe to it, arcs a route from the
 * studio to every place it is spoken, and opens that row to name them.
 *
 * A canvas has no text, so the list is also what a screen reader gets. Where
 * there is no scripting the `html:not([data-js])` rule in globals.css reveals
 * the countries inside every row, since none of them can be opened.
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

  return (
    <>
      {/*
        The sphere fills the whole section and sits behind everything, at every
        width. It is deliberately cropped — a planet held whole inside a box
        reads as a diagram, one that leaves the frame reads as a planet — and
        giving it the section's full height rather than the space left over
        under the heading is the only way it gets to be large on a phone.
      */}
      <div className="absolute inset-0 z-0">
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
        The list, in normal flow rather than absolutely placed: between them the
        heading and the list set the section's real minimum height, so neither
        can ever land on the other, and the sphere behind stretches to whatever
        that comes to.

        `mt-auto` drops it to the foot of a phone screen, with the planet
        showing between it and the heading. Above `lg` it joins the heading as
        one column down the left — the same gutter the globe's own framing
        already holds clear — so the section reads as a column of type beside a
        planet instead of type stranded at two opposite corners.

        The width cap goes on the list, never on `container-x`: that utility
        centres itself with `margin-inline: auto`, so capping it there floats
        the column into the middle of the section instead of holding the
        heading's left edge.

        Which leaves the wrapper full-width over a 24rem list, so it takes
        `pointer-events-none` and the list takes `auto`. Without that the empty
        half of the wrapper lies invisibly across the sphere and swallows every
        drag and hover aimed at it.
      */}
      <div className="container-x pointer-events-none relative z-10 mt-auto shrink-0 lg:mt-2">
        <ul
          className="
            pointer-events-auto -mx-3 flex max-w-[26rem] flex-col gap-px pb-10
            sm:-mx-4 sm:pb-14 lg:max-w-[24rem] lg:gap-0.5 lg:pb-20
          "
        >
          {dict.items.map((language) => {
            const Flag = FLAGS[language.code];
            const on = active === language.code;
            const regions: RegionKey[] = LANGUAGE_REGIONS[language.code] ?? [];

            return (
              <li key={language.code}>
                <button
                  type="button"
                  aria-pressed={on}
                  data-lang={language.code}
                  onClick={() => setActive(on ? null : language.code)}
                  className={`
                    group flex w-full flex-col px-3 py-3 text-left
                    transition-colors duration-300 sm:px-4
                    ${
                      on
                        ? "bg-white/12"
                        : "bg-white/0 hover:bg-white/6 focus-visible:bg-white/6"
                    }
                  `}
                >
                  {/*
                    Flag, name and rule are one row, and the countries sit on
                    their own line beneath it. Putting the countries inside the
                    name's column instead would make the row three lines tall
                    when open, and the flag — centred against that whole block —
                    would sink away from the name it labels.
                  */}
                  <span className="flex w-full items-center gap-4 sm:gap-5">
                    {/*
                      The flag is an identifier, not a picture: small, squared
                      off and held to one size, so seven of them stack into a
                      column rather than a scatter of loose rectangles.
                    */}
                    <span
                      aria-hidden="true"
                      className={`
                        block w-9 shrink-0 overflow-hidden transition duration-300 sm:w-10
                        ${
                          on
                            ? "shadow-[0_0_0_1.5px_var(--color-accent),0_0_18px_rgba(194,0,122,0.5)]"
                            : "opacity-75 shadow-[0_0_0_1px_rgba(255,255,255,0.28)] group-hover:opacity-100"
                        }
                      `}
                    >
                      {Flag ? <Flag className="block h-auto w-full" /> : null}
                    </span>

                    <span
                      className={`font-display min-w-0 flex-1 text-lg font-extrabold tracking-[-0.025em] transition-colors duration-300 sm:text-xl ${
                        on ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {language.name}
                    </span>

                    {/* A hairline that fills in on the chosen row — the only
                        structural mark in the list, and it encodes selection. */}
                    <span
                      aria-hidden="true"
                      className={`h-px shrink-0 transition-all duration-[400ms] ${
                        on ? "w-7 bg-accent sm:w-9" : "w-3 bg-white/25 sm:w-4"
                      }`}
                    />
                  </span>

                  {/*
                    The countries, indented to sit under the name rather than
                    under the flag. Collapsed by a grid track rather than by
                    `hidden`, so opening one animates and the text stays in the
                    accessibility tree throughout.

                    `bare-open` is the no-JavaScript case: nothing can be
                    pressed there, so every row is left open rather than leaving
                    seven rows that look interactive and are not.
                  */}
                  <span
                    className={`bare-open grid pl-[3.25rem] transition-[grid-template-rows,opacity] duration-[400ms] ease-out sm:pl-[3.75rem] ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-white/70">
                        <span className="label mr-2 text-white/60">{dict.map.spokenIn}</span>
                        {regions.map((key) => dict.regions[key]).join(" · ")}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* What the chosen row means, for anything that reads announcements
          rather than the page — the visible text lives in the row itself. */}
      <p aria-live="polite" className="sr-only">
        {active
          ? `${dict.items.find((l) => l.code === active)?.name} — ${dict.map.spokenIn}: ${(
              LANGUAGE_REGIONS[active] ?? []
            )
              .map((key) => dict.regions[key])
              .join(", ")}`
          : ""}
      </p>
    </>
  );
}
