"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, localeName, type Locale } from "@/i18n/config";

/** Swaps the locale segment of the current path and keeps the rest of it. */
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
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <nav aria-label={label} className={`flex items-center gap-1 ${className}`}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={hrefFor(code)}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            title={localeName[code]}
            className={`rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-[0.08em] transition-colors duration-200 ${
              active
                ? invert
                  ? "bg-white text-ink"
                  : "bg-ink text-white"
                : invert
                  ? "text-white/70 hover:text-white"
                  : "text-slate-500 hover:text-ink"
            }`}
          >
            {localeLabel[code]}
            <span className="sr-only"> — {localeName[code]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
