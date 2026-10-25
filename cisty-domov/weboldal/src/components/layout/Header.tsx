"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, HERO } from "@/lib/content";
import { BRAND, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /*
   * Only the home page opens on the blue hero, and only there may the bar go
   * transparent with white type. Without scripting the effect never runs, so
   * globals.css forces the solid bar whenever `data-js` is missing.
   */
  const onHero = pathname === "/" && !scrolled && !open;

  /* Section links carry the home path, so they still work from the legal pages. */
  const nav = NAV.map((item) => ({ ...item, href: `/${item.href}` }));

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
        onHero ? "on-dark bg-transparent" : "border-b border-line bg-white/95 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={close}
          data-on-hero={onHero ? "true" : undefined}
          className={`shrink-0 ${onHero ? "text-white" : "text-ink"}`}
          aria-label={BRAND.name}
        >
          <Logo invert={onHero} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Fő navigáció">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-on-hero={onHero ? "true" : undefined}
              className={`link-underline whitespace-nowrap py-1 text-[0.8125rem] font-semibold ${
                onHero ? "text-white/90 hover:text-white" : "text-ink hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE.href}`}
            data-on-hero={onHero ? "true" : undefined}
            className={`hidden text-sm font-bold xl:inline ${onHero ? "text-white" : "text-ink hover:text-accent"}`}
          >
            {PHONE.label}
          </a>

          <Link
            href="/#kapcsolat"
            data-on-hero={onHero ? "cta" : undefined}
            className={`label hidden rounded-full px-6 py-3.5 transition-colors duration-200 sm:inline-flex ${
              onHero
                ? "bg-white text-accent hover:bg-accent-soft"
                : "bg-accent text-white hover:bg-accent-deep"
            }`}
          >
            {HERO.primary}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            className="relative z-10 flex size-11 items-center justify-center lg:hidden"
          >
            <span
              data-on-hero={onHero ? "true" : undefined}
              className={`relative block h-3.5 w-6 ${onHero ? "text-white" : "text-ink"}`}
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

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <div className="container-x flex h-[calc(100dvh-5rem)] flex-col gap-8 overflow-y-auto py-8">
          <nav className="flex flex-col" aria-label="Mobil navigáció">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="font-display border-b border-line py-4 text-3xl font-extrabold tracking-[-0.03em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex shrink-0 flex-col gap-3">
            <a
              href={`tel:${PHONE.href}`}
              className="label inline-flex items-center justify-center rounded-full border-2 border-ink px-7 py-4"
            >
              {PHONE.label}
            </a>
            <Link
              href="/#kapcsolat"
              onClick={close}
              className="label inline-flex items-center justify-center rounded-full bg-accent px-7 py-4.5 text-white"
            >
              {HERO.primary}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
