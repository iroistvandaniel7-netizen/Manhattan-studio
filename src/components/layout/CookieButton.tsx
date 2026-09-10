"use client";

import { useSyncExternalStore } from "react";
import {
  consentServerSnapshot,
  consentSnapshot,
  reopenConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * The cookie control that is always there.
 *
 * The studio asked for it after going looking for the consent bar and finding
 * nothing — a footer link was not discoverable enough, and this is the shape
 * people have learned to look for. It sits bottom-left because the basket
 * already owns bottom-right, and the two must never land on top of each other.
 *
 * Kept deliberately quiet: a small outline button rather than a filled one, so
 * a control almost nobody presses twice does not compete with the basket,
 * which is the one thing on the page that earns money. It gains weight on
 * hover and focus.
 *
 * Hidden while the bar itself is open. Two ways to answer the same question,
 * one sitting on top of the other, is not twice the choice — and the bar
 * covers this corner anyway.
 */
export default function CookieButton({ label }: { label: string }) {
  const state = useSyncExternalStore(
    subscribeConsent,
    consentSnapshot,
    consentServerSnapshot,
  );

  /* Only once an answer is on record. "ask" means the bar is up and owns this
     corner; "unknown" means the browser has not looked yet, and painting then
     would flash the button on every first load before the bar takes over. */
  if (state !== "answered") return null;

  return (
    <button
      type="button"
      data-cookie-button
      onClick={reopenConsent}
      aria-label={label}
      title={label}
      className="fixed bottom-5 left-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-slate-600 shadow-[0_4px_20px_rgba(11,7,16,0.12)] transition-colors duration-200 hover:border-ink hover:text-ink sm:bottom-7 sm:left-7"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5"
      >
        {/* A biscuit with a bite out of it — the outline is stroked like the
            rest of the site's icons, the chips are filled so they read at
            20px, where a 1.4px ring would close up into a dot anyway. */}
        <path d="M21 12a9 9 0 1 1-9-9 4 4 0 0 0 4 4 5 5 0 0 0 5 5Z" strokeLinejoin="round" />
        <circle cx="9" cy="10" r="1.05" fill="currentColor" stroke="none" />
        <circle cx="14" cy="15" r="1.05" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="0.85" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
