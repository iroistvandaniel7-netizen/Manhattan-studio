"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, HERO } from "@/lib/content";
import { BRAND, PHONE } from "@/lib/site";
import Logo from "@/components/graphics/Logo";

/**
 * A floating bar. At the top of the page it is just the logo and the links,
 * sitting on the poster; once the page scrolls it gathers into a white pill
 * with a soft shadow, held off the edges of the screen.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      {/* The pill reaches a little past the content column, so the logo inside
          it lines up with the left edge of every section below. */}
      <div className="container-x">
        <div
          className={`-mx-2 flex items-center justify-between gap-6 rounded-full py-2 pr-2 pl-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:-mx-7 sm:pl-7 ${
            solid
              ? "bg-white/90 shadow-[0_10px_40px_rgba(11,45,91,0.12)] ring-1 ring-line backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <Link href="/" onClick={close} className="shrink-0" aria-label={BRAND.name}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Fő navigáció">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE.href}`}
              className="hidden rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent xl:inline-flex"
            >
              {PHONE.label}
            </a>
            <Link
              href="/#kapcsolat"
              className="hidden rounded-full bg-accent px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-deep sm:inline-flex"
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
              className="grid size-12 place-items-center rounded-full bg-ink text-white lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
              </span>
            </button>
          </div>
        </div>

      </div>
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="mx-3 mt-2 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(11,45,91,0.18)] ring-1 ring-line lg:hidden"
      >
        <div className="flex max-h-[calc(100dvh-7rem)] flex-col gap-6 overflow-y-auto p-6">
          <nav className="flex flex-col" aria-label="Mobil navigáció">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line py-4 font-display text-2xl font-semibold tracking-[-0.03em] last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-3">
            <a href={`tel:${PHONE.href}`} className="rounded-full bg-accent-soft px-6 py-4 text-center font-semibold text-accent">
              {PHONE.label}
            </a>
            <Link href="/#kapcsolat" onClick={close} className="rounded-full bg-accent px-6 py-4 text-center font-semibold text-white">
              {HERO.primary}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
