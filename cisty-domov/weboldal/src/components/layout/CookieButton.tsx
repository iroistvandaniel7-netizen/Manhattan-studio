"use client";

import { useSyncExternalStore } from "react";
import { COOKIES } from "@/lib/content";
import {
  consentServerSnapshot,
  consentSnapshot,
  reopenConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * The cookie control that is always there, bottom-left — the shape people
 * have learned to look for. Hidden while the bar itself is open: two ways to
 * answer the same question, one on top of the other, is not twice the choice.
 */
export default function CookieButton() {
  const state = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  if (state !== "answered") return null;

  return (
    <button
      type="button"
      data-cookie-button
      onClick={reopenConsent}
      aria-label={COOKIES.reopen}
      title={COOKIES.reopen}
      className="fixed bottom-5 left-5 z-50 grid size-11 place-items-center rounded-full border border-line bg-white text-slate-600 shadow-[0_4px_20px_rgba(11,45,91,0.14)] transition-colors duration-200 hover:border-ink hover:text-ink sm:bottom-7 sm:left-7"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" focusable="false" className="size-5">
        <path d="M21 12a9 9 0 1 1-9-9 4 4 0 0 0 4 4 5 5 0 0 0 5 5Z" strokeLinejoin="round" />
        <circle cx="9" cy="10" r="1.05" fill="currentColor" stroke="none" />
        <circle cx="14" cy="15" r="1.05" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="0.85" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
