"use client";

import { reopenConsent } from "@/lib/consent";

/**
 * The way back to the cookie question.
 *
 * A consent bar that can only ever be answered once is not really offering a
 * choice: somebody who clicked "necessary only" in January has to be able to
 * change their mind in March, and the cookie notice's old answer — clear the
 * site's data in your browser settings — is an instruction to go and find a
 * menu most people have never opened.
 *
 * A link in the footer rather than an icon floating in the corner. The
 * floating kind sits on top of the page forever, on every visit, to serve a
 * thing almost nobody does twice; the footer is where people already look for
 * privacy and terms, and it costs the reader nothing until they want it.
 */
export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-cookie-settings
      onClick={reopenConsent}
      className="link-underline text-xs text-white/70 hover:text-white"
    >
      {label}
    </button>
  );
}
