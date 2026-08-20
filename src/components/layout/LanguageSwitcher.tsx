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
    ? "text-cream/70 hover:text-gold-400"
    : "text-graphite-500 hover:text-ink";
  const active = invert ? "text-gold-400" : "text-ink";
  const divider = invert ? "bg-cream/30" : "bg-graphite-300";

  return (
    <nav aria-label={label} className={`flex items-center ${className}`}>
      {locales.map((code, i) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden="true" className={`mx-2 h-3 w-px ${divider}`} />
            ) : null}
            <Link
              href={hrefFor(code)}
              hrefLang={code}
              lang={code}
              aria-current={isActive ? "true" : undefined}
              title={localeName[code]}
              className={`link-underline text-xs font-semibold tracking-[0.12em] transition-colors duration-300 ${
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
