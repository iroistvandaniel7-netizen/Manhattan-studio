"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, localeName, type Locale } from "@/i18n/config";

/**
 * Swaps the locale segment of the current path, keeping the rest of the URL
 * (and any hash the browser is on) intact.
 */
export default function LanguageSwitcher({
  locale,
  label,
  invert = false,
  className = "",
}: {
  locale: Locale;
  label: string;
  invert?: boolean;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;

  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/");
    // segments[0] is the empty string before the leading slash.
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  /*
   * Full class strings, never interpolated fragments: Tailwind scans source
   * text, so a constructed `hover:${...}` would never be generated.
   */
  const idle = invert
    ? "text-white/70 hover:text-white"
    : "text-slate-500 hover:text-accent";
  const active = invert ? "text-white" : "text-accent";
  const divider = invert ? "bg-white/35" : "bg-slate-300";

  return (
    <nav aria-label={label} className={`flex items-center ${className}`}>
      {locales.map((code, i) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 ? (
              <span
                aria-hidden="true"
                data-on-photo={invert ? "rule" : undefined}
                className={`mx-2 h-3 w-px ${divider}`}
              />
            ) : null}
            <Link
              href={hrefFor(code)}
              hrefLang={code}
              lang={code}
              data-on-photo={invert ? "true" : undefined}
              aria-current={isActive ? "true" : undefined}
              title={localeName[code]}
              className={`link-underline label text-[0.625rem] transition-colors duration-300 ${
                isActive ? active : idle
              }`}
              data-active={isActive ? "true" : "false"}
            >
              {localeLabel[code]}
              <span className="sr-only"> — {localeName[code]}</span>
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
