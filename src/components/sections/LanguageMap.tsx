"use client";

import { useCallback, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";
import { FLAGS } from "@/components/graphics/Flags";
import DotBoard from "@/components/graphics/DotBoard";
import Globe, { viewCentre, type GlobePoint } from "@/components/graphics/Globe";
import {
  LANGUAGE_REGIONS,
  STUDIO_LONLAT,
  placesFor,
  type RegionKey,
} from "@/components/graphics/worldMap";
import { GREETINGS } from "@/lib/site";

type Languages = Dictionary["languages"];

/**
 * The seven languages on a globe.
 *
 * Real Natural Earth coastlines on a lit sphere, turning slowly and draggable.
 * The studio in Dunajská Streda is marked on it, and choosing a language marks
 * every place that language is spoken and arcs a great circle to each one from
 * the classroom — so the graphic answers what a list of seven names cannot: how
 * far this language takes you. English opens onto four continents; Slovak lands
 * where the globe was already pointing.
 *
 * The globe is decoration in the accessibility tree. The language buttons and
 * the places named under it are the content, and they carry everything the
 * picture shows. Until the coastline data arrives — and for good if scripting
 * never runs — a flat board holds the same information in the first response.
 */
export default function LanguageMap({
  dict,
  city,
}: {
  dict: Languages;
  city: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  const points = useMemo<GlobePoint[]>(
    () =>
      dict.items.flatMap((language) =>
        placesFor(language.code).map((place) => ({
          key: place.key,
          lon: place.lon,
          lat: place.lat,
          label: place.label,
          lit: active === null ? false : place.code === active,
        })),
      ),
    [dict.items, active],
  );

  const routes = useMemo<[number, number][]>(
    () => (active ? placesFor(active).map((place) => [place.lon, place.lat]) : []),
    [active],
  );

  const focus = useMemo<[number, number] | null>(
    () =>
      active
        ? viewCentre([STUDIO_LONLAT, ...routes, ...routes], STUDIO_LONLAT)
        : null,
    [active, routes],
  );

  const selected = dict.items.find((language) => language.code === active) ?? null;
  const regions: RegionKey[] = active ? (LANGUAGE_REGIONS[active] ?? []) : [];

  return (
    <div className="on-dark mt-12 border-2 border-ink bg-ink text-white sm:mt-16">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
        {/* --- The globe --- */}
        <div className="border-b border-white/12 lg:border-b-0 lg:border-r">
          <div
            data-globe-stage=""
            className="relative mx-auto aspect-square w-full max-w-[38rem] p-3 sm:p-5"
          >
            <Globe
              points={points}
              routes={routes}
              origin={STUDIO_LONLAT}
              originLabel={city}
              focus={focus}
              onReady={onReady}
            />

            {/* Held until the coastlines land, and kept for good without them. */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-700 ${
                ready ? "opacity-0" : "opacity-100"
              }`}
            >
              <DotBoard />
            </div>
          </div>

          {/* --- What the globe is showing, in words --- */}
          <div
            data-board-info=""
            aria-live="polite"
            className="flex min-h-[7.5rem] flex-col justify-center gap-3 border-t border-white/12 px-5 py-6 sm:px-8"
          >
            {selected ? (
              <>
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-blue-led sm:text-3xl">
                    {GREETINGS[selected.code]}
                  </span>
                  <span className="label text-white/55">
                    {dict.map.greetingLabel} · {selected.name}
                  </span>
                </p>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <span className="label text-white/55">{dict.map.spokenIn}</span>
                  {regions.map((key) => (
                    <span
                      key={key}
                      className="border border-white/20 px-2.5 py-1 text-[0.8125rem] leading-none text-white/85"
                    >
                      {dict.regions[key]}
                    </span>
                  ))}
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">
                  {dict.map.caption}
                </p>
                <p className="text-sm text-white/75">{dict.map.hint}</p>
              </>
            )}
          </div>
        </div>

        {/* --- The languages --- */}
        <div>
          <ul data-lang-list="" className="grid h-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-1">
            {dict.items.map((language, i) => {
              const Flag = FLAGS[language.code];
              const on = active === language.code;
              // Seven languages leave a cell over in both the two- and
              // four-column grids; widen the last one so no row ends ragged.
              const orphan = i === dict.items.length - 1 && dict.items.length % 2 === 1;
              return (
                <li
                  key={language.code}
                  className={`border-b border-white/12 ${orphan ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <button
                    type="button"
                    aria-pressed={on}
                    data-lang={language.code}
                    onClick={() => setActive(on ? null : language.code)}
                    className={`group/lang relative flex h-full w-full items-center gap-3 px-5 py-3.5 text-left transition-colors duration-300 sm:px-6 ${
                      on ? "bg-blue text-white" : "text-white/85 hover:bg-white/8"
                    }`}
                  >
                    {/* The mark that runs down the selected row. */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-[3px] bg-blue-led transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? "scale-y-100" : "scale-y-0 group-hover/lang:scale-y-100"
                      }`}
                    />
                    {Flag ? (
                      <span
                        aria-hidden="true"
                        className="w-7 shrink-0 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                      >
                        <Flag className="block h-auto w-full" />
                      </span>
                    ) : null}
                    <span className="font-display text-base font-extrabold tracking-[-0.025em]">
                      {language.name}
                    </span>
                    <span
                      className={`label ml-auto transition-colors duration-300 ${
                        on ? "text-white/75" : "text-white/55"
                      }`}
                    >
                      {language.code}
                    </span>
                  </button>
                </li>
              );
            })}

            <li className="col-span-2 sm:col-span-4 lg:col-span-1">
              <button
                type="button"
                aria-pressed={active === null}
                data-lang=""
                onClick={() => setActive(null)}
                className={`label h-full w-full px-5 py-4 text-left transition-colors duration-300 sm:px-6 ${
                  active === null ? "text-white/55" : "text-blue-led hover:bg-white/8"
                }`}
              >
                {active === null ? dict.map.all : dict.map.reset}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
