"use client";

import { useEffect } from "react";

/**
 * The second way the document gets marked script-enabled.
 *
 * `data-js` decides a lot: whether the level-check board is shown or replaced
 * by a line saying JavaScript is needed, whether the scroll reveals arm,
 * whether the header takes its over-photo treatment. One inline script in
 * <head> used to be the only thing that set it, and that made all of it hang
 * on a single point of failure.
 *
 * It failed in the real world. The studio opened its own site on its own
 * phone and was told the test needs JavaScript, on a browser that had it —
 * a content blocker or hardened browser had refused the inline script while
 * happily loading every bundled one. To the site that is indistinguishable
 * from JavaScript being switched off, so it correctly showed the fallback for
 * a reader who did not need it.
 *
 * So the flag is set twice, by two mechanisms that fail independently:
 *
 *   the inline script  — before first paint, so nothing flashes
 *   this component     — on hydration, if the inline one never ran
 *
 * Both have to fail before a visitor sees the no-JS page, and the only thing
 * that fails both is JavaScript genuinely being off — which is exactly when
 * the fallback is the right answer.
 *
 * Sets an attribute rather than state, so it renders nothing and re-renders
 * nothing; the CSS in globals.css is what reacts.
 */
export default function ScriptFlag() {
  useEffect(() => {
    document.documentElement.setAttribute("data-js", "");
  }, []);

  return null;
}
