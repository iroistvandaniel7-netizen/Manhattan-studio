"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { formatPrice } from "@/lib/catalogue";
import { useCart } from "./CartProvider";
import CheckoutForm from "./CheckoutForm";

/**
 * The basket, as a panel over the page rather than a page of its own.
 *
 * Buying here is one decision made on the price list — three courses and three
 * packages, all on one screen — so sending the reader away to a basket page and
 * back again costs more than it explains. The panel keeps the list behind it.
 *
 * The button sits in the corner and appears only once something is in the
 * basket. An empty basket icon in the header of a language school's home page
 * is a control that does nothing, permanently, for every visitor who never
 * buys — and this one has to earn its place over the page it floats on.
 */
export default function Basket({
  dict,
  locale,
  payOnline = false,
}: {
  dict: Dictionary;
  locale: Locale;
  payOnline?: boolean;
}) {
  const cart = useCart();
  const copy = dict.shop;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  /* Lock the page, trap focus, close on Escape — the same contract as the menu. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
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
    panelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    return () => {
      body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Nothing bought yet — show nothing. The server always renders an empty
     basket, so this is also what keeps the markup and the first paint agreeing. */
  if (cart.count === 0) return null;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        data-basket-open
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="label fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 bg-accent px-5 py-4 text-white shadow-[0_10px_40px_rgba(11,7,16,0.45)] transition-colors duration-200 hover:bg-accent-deep sm:bottom-7 sm:right-7"
      >
        {copy.open}
        <span
          aria-hidden="true"
          className="font-mono inline-flex size-6 items-center justify-center bg-white text-[0.6875rem] text-accent"
        >
          {cart.count}
        </span>
        <span className="sr-only">
          — {cart.count} {copy.itemCount}
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            aria-label={copy.continue}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/70"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.cartTitle}
            data-basket-panel
            className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl font-extrabold tracking-[-0.018em]">
                {copy.cartTitle}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="label px-3 py-2 text-slate-500 hover:text-accent"
              >
                {copy.continue}
              </button>
            </div>

            <ul className="flex flex-col divide-y divide-line px-6">
              {cart.priced.lines.map((line) => {
                const item =
                  dict.courses.items[line.product.id as keyof typeof dict.courses.items];
                return (
                  <li key={line.product.id} className="flex gap-4 py-5">
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-extrabold tracking-[-0.012em]">
                        {item.name}
                      </p>
                      {/*
                        The unit price only earns its line when there is more
                        than one: at a quantity of one it repeats the line
                        total word for word, and two identical prices on one
                        row read as a mistake rather than as a breakdown.
                      */}
                      {line.quantity > 1 ? (
                        <p className="label mt-1.5 text-slate-500">
                          {line.quantity} × {formatPrice(line.product.price, locale)}
                        </p>
                      ) : null}

                      <div className="mt-3 flex items-center gap-3">
                        <div
                          className="flex items-center border border-line"
                          role="group"
                          aria-label={copy.quantity}
                        >
                          <button
                            type="button"
                            data-less={line.product.id}
                            onClick={() =>
                              cart.setQuantity(line.product.id, line.quantity - 1)
                            }
                            aria-label={copy.decrease}
                            className="flex size-9 items-center justify-center text-lg leading-none text-ink hover:bg-accent-soft"
                          >
                            −
                          </button>
                          <span className="font-mono w-9 text-center text-sm font-semibold">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            data-more={line.product.id}
                            onClick={() =>
                              cart.setQuantity(line.product.id, line.quantity + 1)
                            }
                            aria-label={copy.increase}
                            className="flex size-9 items-center justify-center text-lg leading-none text-ink hover:bg-accent-soft"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          data-remove={line.product.id}
                          onClick={() => cart.remove(line.product.id)}
                          className="label text-slate-500 underline-offset-4 hover:text-accent hover:underline"
                        >
                          {copy.remove}
                        </button>
                      </div>
                    </div>

                    <p
                      className="font-mono shrink-0 text-sm font-semibold"
                      data-line-total={line.product.id}
                    >
                      {formatPrice(line.total, locale)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-line px-6 py-6">
              <p className="flex items-baseline justify-between">
                <span className="label text-slate-500">{copy.total}</span>
                <span
                  data-basket-total
                  className="font-display text-2xl font-extrabold tracking-[-0.018em]"
                >
                  {formatPrice(cart.priced.total, locale)}
                </span>
              </p>

              <CheckoutForm
                dict={dict}
                locale={locale}
                payOnline={payOnline}
                onDone={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
