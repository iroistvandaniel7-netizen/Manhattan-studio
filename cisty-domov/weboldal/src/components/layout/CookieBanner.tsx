"use client";

import Link from "next/link";
import { useId, useState, useSyncExternalStore } from "react";
import { COOKIES } from "@/lib/content";
import {
  answerConsent,
  consentServerSnapshot,
  consentSnapshot,
  readConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * The consent bar, with a settings view behind it.
 *
 * A bar along the bottom, not a wall over the page: nothing here is dangerous
 * enough to hold a reader hostage before they can see what is on offer.
 *
 * "Necessary only" and "Accept all" are the same size and the same weight,
 * side by side. A banner where accepting is a filled button and refusing is
 * grey small print is not offering a choice, and EU regulators have said so.
 * The settings view lets each category be chosen on its own, and nothing but
 * the necessary one is ever pre-ticked.
 *
 * Nothing renders until the browser has read the cookie, so the bar never
 * flashes at somebody who has already answered.
 */
export default function CookieBanner() {
  const uid = useId();
  const state = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const [detail, setDetail] = useState(false);
  const [choice, setChoice] = useState({ statistics: false, marketing: false });

  if (state !== "ask") return null;

  const openSettings = () => {
    const current = readConsent();
    setChoice({ statistics: current?.statistics ?? false, marketing: current?.marketing ?? false });
    setDetail(true);
  };

  const finish = (next: { statistics: boolean; marketing: boolean }) => {
    answerConsent(next);
    setDetail(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${uid}-title`}
      data-cookie-banner
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-white shadow-[0_-10px_40px_rgba(11,45,91,0.12)] motion-safe:animate-[cookie-in_320ms_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="container-x max-h-[85dvh] overflow-y-auto py-5 lg:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:flex-1">
            <h2 id={`${uid}-title`} className="font-display text-base font-extrabold tracking-[-0.02em]">
              {COOKIES.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {COOKIES.body}{" "}
              <Link href="/cookie" className="link-underline font-semibold text-accent">
                {COOKIES.more}
              </Link>
            </p>
          </div>

          {detail ? null : (
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={openSettings}
                className="label rounded-full px-5 py-3.5 text-slate-600 underline-offset-4 hover:text-ink hover:underline"
              >
                {COOKIES.settings}
              </button>
              <button
                type="button"
                data-consent="necessary"
                onClick={() => finish({ statistics: false, marketing: false })}
                className="label rounded-full border-2 border-ink px-6 py-3.5 transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                {COOKIES.necessaryOnly}
              </button>
              <button
                type="button"
                data-consent="all"
                onClick={() => finish({ statistics: true, marketing: true })}
                className="label rounded-full border-2 border-accent bg-accent px-6 py-3.5 text-white transition-colors duration-200 hover:border-accent-deep hover:bg-accent-deep"
              >
                {COOKIES.acceptAll}
              </button>
            </div>
          )}
        </div>

        {detail ? (
          <div className="pop-in mt-6 border-t border-line pt-5">
            <ul className="flex flex-col divide-y divide-line">
              {COOKIES.categories.map((category) => {
                const id = `${uid}-${category.id}`;
                const key = category.id as "statistics" | "marketing";
                const checked = category.locked ? true : choice[key];
                return (
                  <li key={category.id} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <label htmlFor={id} className="text-sm font-bold">
                        {category.name}
                      </label>
                      <p className="mt-1 max-w-xl text-[0.8125rem] leading-relaxed text-slate-600">
                        {category.desc}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {category.locked ? (
                        <span className="label text-slate-500">{COOKIES.alwaysOn}</span>
                      ) : null}
                      <button
                        id={id}
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        disabled={category.locked}
                        onClick={() => setChoice((c) => ({ ...c, [key]: !c[key] }))}
                        className={`relative h-7 w-12 rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                          checked ? "bg-accent" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                            checked ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => finish({ statistics: false, marketing: false })}
                className="label rounded-full border-2 border-ink px-6 py-3.5 transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                {COOKIES.necessaryOnly}
              </button>
              <button
                type="button"
                onClick={() => finish(choice)}
                className="label rounded-full border-2 border-ink px-6 py-3.5 transition-colors duration-200 hover:bg-ink hover:text-white"
              >
                {COOKIES.save}
              </button>
              <button
                type="button"
                onClick={() => finish({ statistics: true, marketing: true })}
                className="label rounded-full border-2 border-accent bg-accent px-6 py-3.5 text-white transition-colors duration-200 hover:border-accent-deep hover:bg-accent-deep"
              >
                {COOKIES.acceptAll}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
