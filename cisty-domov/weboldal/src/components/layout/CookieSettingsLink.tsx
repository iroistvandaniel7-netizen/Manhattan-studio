"use client";

import { reopenConsent } from "@/lib/consent";

/** The footer's way back to the cookie question. */
export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-cookie-settings
      onClick={reopenConsent}
      className="text-left text-sm text-white/55 hover:text-white"
    >
      {label}
    </button>
  );
}
