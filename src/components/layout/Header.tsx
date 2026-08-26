"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { BRAND } from "@/lib/site";
import Logo from "@/components/graphics/Logo";
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
   * Only the home page opens with the photograph, and only there may the bar
   * go transparent with inverted type.
   *
   * The at-top state is the initial one, so there is no flash of a solid bar
   * before hydration. Without JavaScript the effect below never runs and the
   * bar would stay transparent over white sections, so `globals.css` forces
   * the solid treatment whenever the document is missing `data-js` — the same
   * progressive-enhancement hook the scroll reveals use.
   */
  const onPhoto = pathname === home && !scrolled && !open;

  const nav = [
    { href: "#languages", label: dict.nav.languages },
    { href: "#courses", label: dict.nav.courses },
    { href: "#why", label: dict.nav.why },
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
      data-sticky="true"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onPhoto ? "on-dark bg-transparent" : "border-b border-line bg-white"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        {/*
          The compact lockup: skyline, wordmark and both rules, without the
          bilingual line. At the full mark's proportions a legible subtitle
          would need more height than the bar has.
        */}
        <Link
          href={home}
          onClick={close}
          data-on-photo={onPhoto ? "true" : undefined}
          style={onPhoto ? ({ "--logo-rule": "currentColor" } as React.CSSProperties) : undefined}
          className={`shrink-0 leading-none ${onPhoto ? "text-white" : "text-ink"}`}
          aria-label={BRAND.nameFull}
        >
          <Logo compact className="h-11 w-auto sm:h-12" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label={dict.nav.home}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-on-photo={onPhoto ? "true" : undefined}
              className={`link-underline py-1 text-[0.8125rem] font-semibold tracking-[-0.01em] ${
                onPhoto ? "text-white/90 hover:text-white" : "text-ink hover:text-accent"
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
            data-on-photo={onPhoto ? "cta" : undefined}
            className={`label hidden px-6 py-3.5 transition-colors duration-200 sm:inline-flex ${
              onPhoto
                ? "bg-white text-accent hover:bg-accent-soft"
                : "bg-accent text-white hover:bg-accent-deep"
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
              data-on-photo={onPhoto ? "true" : undefined}
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
                className="font-display border-b border-line py-4 text-3xl font-extrabold tracking-[-0.03em]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={close}
            className="label mt-auto inline-flex shrink-0 items-center justify-center bg-accent px-7 py-4.5 text-white"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
