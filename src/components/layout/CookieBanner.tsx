"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import {
  answerConsent,
  consentServerSnapshot,
  consentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

/**
 * The consent bar.
 *
 * A bar along the bottom, not a sheet over the page. Nothing here is dangerous
 * enough to hold a reader hostage before they can see a price, and a wall that
 * has to be dismissed before the site can be read is the pattern everyone has
 * learned to click through without looking — which produces consent that is
 * worth nothing to either side.
 *
 * Both answers are one click and both are real buttons of the same size. A
 * banner where "accept" is a filled button and "reject" is grey small print is
 * not offering a choice, and Slovak and EU regulators have said so.
 *
 * Nothing renders until the browser has read the cookie: on the server there
 * is no cookie to read, so a first paint that guessed would either flash the
 * bar at people who already answered or hide it from people who have not.
 */
export default function CookieBanner({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const copy = dict.cookieBanner;
  const state = useSyncExternalStore(
    subscribeConsent,
    consentSnapshot,
    consentServerSnapshot,
  );

  if (state === "answered") return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      data-cookie-banner
      /* Above the sticky header, and mounted at the root of the layout rather
         than inside a section — several sections set `isolate`, and inside one
         of those a z-index only ranks against its siblings. That is how the
         gallery's lightbox once ended up underneath the header. */
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-white shadow-[0_-8px_30px_rgba(11,7,16,0.08)] motion-safe:animate-[cookie-in_320ms_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="container-x flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:gap-10 lg:py-6">
        <div className="lg:flex-1">
          <h2
            id="cookie-banner-title"
            className="font-display text-base font-extrabold tracking-[-0.015em]"
          >
            {copy.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            {copy.body}{" "}
            <Link href={`/${locale}/cookie`} className="link-underline font-semibold text-accent">
              {copy.more}
            </Link>
          </p>
        </div>

        {/* Both answers the same weight and the same size, side by side. */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            data-consent="necessary"
            onClick={() => answerConsent(false)}
            className="label border border-line px-6 py-3.5 transition-colors duration-200 hover:border-ink"
          >
            {copy.necessary}
          </button>
          <button
            type="button"
            data-consent="all"
            onClick={() => answerConsent(true)}
            className="label bg-accent px-6 py-3.5 text-white transition-colors duration-200 hover:bg-accent-deep"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
