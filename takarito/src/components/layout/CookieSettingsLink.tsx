"use client";

import { COOKIES } from "@/lib/content";
import { reopenConsent } from "@/lib/consent";

/** The footer's way back to the cookie question. */
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      data-cookie-settings
      onClick={reopenConsent}
      className="link-underline text-left text-sm text-white/80 hover:text-white"
    >
      {COOKIES.reopen}
    </button>
  );
}
