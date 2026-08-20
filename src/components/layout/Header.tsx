"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { BRAND } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const home = `/${locale}`;

  /*
   * Only the home page opens with the photograph. While the bar floats over
   * it the type must invert; everywhere else, and as soon as the white bar
   * appears on scroll, it goes back to ink.
   */
  const onPhoto = pathname === home && !scrolled && !open;

  const nav = [
    { href: "#languages", label: dict.nav.languages },
    { href: "#courses", label: dict.nav.courses },
    { href: "#why", label: dict.nav.why },
    { href: "#exams", label: dict.nav.exams },
    { href: "#contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /* Mobile menu: lock the page, trap focus, close on Escape. */
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onPhoto ? "on-dark bg-transparent" : "border-b border-line bg-white"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href={home}
          onClick={close}
          className={`shrink-0 leading-none ${onPhoto ? "text-white" : "text-ink"}`}
          aria-label={BRAND.nameFull}
        >
          <span className="block text-sm font-extrabold tracking-[0.16em] sm:text-base">
            {BRAND.wordmarkTop}
          </span>
          <span
            className={`mt-1 block text-[0.5625rem] font-medium tracking-[0.3em] ${
              onPhoto ? "text-white/70" : "text-slate-500"
            }`}
          >
            {BRAND.wordmarkBottom}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label={dict.nav.home}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`link-underline py-1 text-[0.8125rem] font-semibold ${
                onPhoto ? "text-white/90 hover:text-white" : "text-ink hover:text-blue"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <LanguageSwitcher
            locale={locale}
            label={dict.nav.languageLabel}
            invert={onPhoto}
          />

          <a
            href="#contact"
            className={`hidden px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 sm:inline-flex ${
              onPhoto
                ? "bg-white text-blue hover:bg-blue-soft"
                : "bg-blue text-white hover:bg-blue-deep"
            }`}
          >
            {dict.nav.cta}
          </a>

          {/* Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="relative z-10 flex size-11 items-center justify-center lg:hidden"
          >
            <span
              className={`relative block h-3.5 w-6 ${onPhoto ? "text-white" : "text-ink"}`}
            >
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 bg-current transition-all duration-200 ${
                  open ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <div className="container-x flex h-[calc(100dvh-5rem)] flex-col gap-8 overflow-y-auto py-8">
          <nav className="flex flex-col" aria-label={dict.nav.openMenu}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line py-4 text-2xl font-bold tracking-[-0.02em]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={close}
            className="mt-auto inline-flex shrink-0 items-center justify-center bg-blue px-7 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
