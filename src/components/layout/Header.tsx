"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { BRAND } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";

export type NavItem = { href: string; label: string };

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const home = `/${locale}`;
  const nav: NavItem[] = [
    { href: home, label: dict.nav.home },
    { href: "#courses", label: dict.nav.courses },
    { href: "#why", label: dict.nav.why },
    { href: "#manhattan", label: dict.nav.about },
    { href: "#method", label: dict.nav.method },
    { href: "#contact", label: dict.nav.contact },
  ];

  /* Backdrop blur kicks in once the page has moved off the top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlights the nav item for whichever section is currently in view. */
  useEffect(() => {
    const ids = ["courses", "why", "manhattan", "method", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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

  const isActive = (href: string) =>
    href.startsWith("#") ? activeId === href.slice(1) : activeId === "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ${
        scrolled || open
          ? "border-b border-graphite-200 bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6 lg:h-24">
        {/* Wordmark */}
        <Link
          href={home}
          onClick={close}
          className="group/logo shrink-0 leading-none"
          aria-label={BRAND.nameFull}
        >
          <span className="block text-[0.95rem] font-extrabold tracking-[0.18em] sm:text-base lg:text-[1.0625rem]">
            {BRAND.wordmarkTop}
          </span>
          <span className="mt-0.5 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-0 bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:w-6"
            />
            <span className="text-[0.5625rem] font-medium tracking-[0.34em] text-graphite-500 sm:text-[0.625rem]">
              {BRAND.wordmarkBottom}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 xl:flex" aria-label={dict.nav.home}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href) ? "true" : "false"}
              className="link-underline py-1 text-[0.8125rem] font-semibold tracking-[0.02em] text-graphite-700 transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          {/* Kept visible at every width — the switcher is a primary control. */}
          <LanguageSwitcher locale={locale} label={dict.nav.languageLabel} />

          <a
            href="#contact"
            className="hidden bg-ink px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-paper transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-12px_rgba(10,10,10,0.6)] sm:inline-flex"
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
            className="relative z-10 flex size-11 items-center justify-center xl:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px bg-ink transition-all duration-300 ${
                  open ? "w-0 opacity-0" : "w-full opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
        className="border-t border-graphite-200 bg-paper xl:hidden"
      >
        {/* Fills the rest of the viewport so no page content shows through. */}
        <div className="container-x flex h-[calc(100dvh-5rem)] flex-col gap-8 overflow-y-auto py-9 lg:h-[calc(100dvh-6rem)]">
          <nav className="flex flex-col" aria-label={dict.nav.openMenu}>
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                style={{ transitionDelay: `${60 + i * 45}ms` }}
                className={`border-b border-graphite-100 py-4 text-2xl font-bold tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={close}
            className="mt-auto inline-flex shrink-0 items-center justify-center bg-ink px-7 py-4.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-paper"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
