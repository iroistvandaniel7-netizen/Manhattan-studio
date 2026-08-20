"use client";

import { useId, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n";
import { FLAGS } from "@/components/graphics/Flags";
import {
  DOT,
  DOT_FIELD,
  LANGUAGE_REGIONS,
  MAP_H,
  MAP_W,
  STEP_PX,
  STUDIO,
  markersFor,
  routeTo,
  type RegionKey,
} from "@/components/graphics/worldMap";
import { GREETINGS } from "@/lib/site";

type Languages = Dictionary["languages"];

/**
 * The seven languages on a destination board.
 *
 * The board is a lamp matrix — every cell of the grid is a lamp, the ones over
 * land are lit — and the studio sits on it as an open ring in Dunajská Streda.
 * Choosing a language marks every place it is spoken and draws the route there
 * from the classroom, so the graphic answers the question a list cannot: how
 * far this language actually takes you. English opens onto four continents;
 * Slovak lands on the studio's own doorstep.
 *
 * The board is deliberately not zoomable. At one lamp per five degrees a zoom
 * would only enlarge the grain, and the places named under the map already say
 * everything the picture does — which is also why the board is `aria-hidden`
 * and the language list beside it is the real control.
 */
export default function LanguageMap({
  dict,
  city,
}: {
  dict: Languages;
  city: string;
}) {
  const uid = useId();
  const [active, setActive] = useState<string | null>(null);

  const markers = useMemo(
    () => dict.items.flatMap((language) => markersFor(language.code)),
    [dict.items],
  );

  const routes = useMemo(() => {
    if (!active) return [];
    return markersFor(active)
      .map((marker) => ({ key: marker.key, d: routeTo(marker) }))
      .filter((route): route is { key: RegionKey; d: string } => route.d !== null);
  }, [active]);

  const selected = dict.items.find((language) => language.code === active) ?? null;
  const regions: RegionKey[] = active ? (LANGUAGE_REGIONS[active] ?? []) : [];

  return (
    <div className="on-dark mt-12 border-2 border-ink bg-ink text-white sm:mt-16">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_15.5rem]">
        {/* --- The board --- */}
        <div className="order-1 border-b border-white/12 lg:order-none lg:border-b-0 lg:border-r">
          <div className="relative overflow-hidden">
            {/*
              The board keeps the whole world at every width, so on a phone it
              is only a few hundred pixels wide. Markers and routes are scaled
              up there instead, which keeps them readable without cropping
              anything off the map.
            */}
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="block h-auto w-full [--mark:1.75] sm:[--mark:1.3] lg:[--mark:1]"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                {/* Every cell of the grid, lit or not — the hardware itself. */}
                <pattern
                  id={`${uid}-lamps`}
                  width={STEP_PX}
                  height={STEP_PX}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={(STEP_PX - DOT) / 2}
                    y={(STEP_PX - DOT) / 2}
                    width={DOT}
                    height={DOT}
                    fill="#ffffff"
                    fillOpacity="0.04"
                  />
                </pattern>
                <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#4d8dff" stopOpacity="0" />
                  <stop offset="0.72" stopColor="#4d8dff" stopOpacity="0.14" />
                  <stop offset="1" stopColor="#4d8dff" stopOpacity="0" />
                </linearGradient>
                <clipPath id={`${uid}-frame`}>
                  <rect width={MAP_W} height={MAP_H} />
                </clipPath>
              </defs>

              <g clipPath={`url(#${uid}-frame)`}>
                <rect width={MAP_W} height={MAP_H} fill={`url(#${uid}-lamps)`} />
                <path
                  data-land="true"
                  d={DOT_FIELD}
                  fill="#4d8dff"
                  fillOpacity={active ? 0.34 : 0.62}
                  className="transition-[fill-opacity] duration-700"
                />

                {/*
                  Routes out of the classroom, keyed so they redraw per
                  language. The `data-` hooks on this group, the markers, the
                  caption and the list are how the static preview export swaps
                  states without React.
                */}
                <g data-routes="">
                {routes.map((route, i) => (
                  <path
                    key={`${active}-${route.key}`}
                    d={route.d}
                    pathLength={1}
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.5"
                    strokeDasharray="1"
                    className="animate-route [stroke-width:calc(1.1*var(--mark))]"
                    style={{ animationDelay: `${i * 110}ms` }}
                  />
                ))}
                </g>

                <g data-markers="">
                {markers.map((marker, i) => {
                  const lit = !active || marker.code === active;
                  return (
                    <g
                      key={`${marker.code}-${marker.key}-${i}`}
                      style={{
                        transform: `translate(${marker.x}px, ${marker.y}px) scale(var(--mark))`,
                      }}
                    >
                      {lit && active ? (
                        <>
                          <rect
                            x={-8}
                            y={-8}
                            width={16}
                            height={16}
                            fill="#4d8dff"
                            fillOpacity="0.3"
                          />
                          <circle
                            r={8}
                            fill="none"
                            stroke="#4d8dff"
                            strokeWidth={1.5}
                            className="map-ring animate-pin-ring motion-reduce:hidden"
                            style={{ animationDelay: `${i * 170}ms` }}
                          />
                        </>
                      ) : null}
                      <rect
                        x={-4.5}
                        y={-4.5}
                        width={9}
                        height={9}
                        fill="#ffffff"
                        fillOpacity={lit ? 1 : 0.13}
                        className="transition-[fill-opacity] duration-500"
                      />
                      {/*
                        The country code, placed by hand per region. It is what
                        separates three markers a few units apart in Central
                        Europe from one indistinct blot.
                      */}
                      {lit && active && marker.label ? (
                        <text
                          x={marker.label.dx}
                          y={marker.label.dy}
                          textAnchor={marker.label.anchor}
                          fill="#ffffff"
                          fillOpacity="0.8"
                          fontSize={8.5}
                          fontWeight={600}
                          letterSpacing="0.06em"
                          className="hidden font-mono sm:inline"
                        >
                          {marker.key.toUpperCase()}
                        </text>
                      ) : null}
                    </g>
                  );
                })}
                </g>

                {/* The studio. An open ring, so it never reads as one more place. */}
                <g
                  style={{
                    transform: `translate(${STUDIO.x}px, ${STUDIO.y}px) scale(var(--mark))`,
                  }}
                >
                  <circle
                    r={11}
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity={active ? 0.9 : 0.55}
                    strokeWidth={1.4}
                    className="transition-[stroke-opacity] duration-500"
                  />
                  <path
                    d="M-16 0h9M7 0h9M0-16v9M0 7v9"
                    stroke="#ffffff"
                    strokeOpacity="0.3"
                    strokeWidth={1}
                  />
                </g>
              </g>

              {/* Refresh line, travelling across the board. */}
              <rect
                width={80}
                height={MAP_H}
                fill={`url(#${uid}-sweep)`}
                className="animate-sweep motion-reduce:hidden"
              />
            </svg>

            {/* The one place on the board that is named on it. */}
            <p className="label pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 bg-ink/75 px-2 py-1 text-white/70 sm:bottom-4 sm:left-5">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-white/70" />
              {city}
            </p>
          </div>

          {/* --- What the board is showing, in words --- */}
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
        <div className="order-2 lg:order-none">
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
