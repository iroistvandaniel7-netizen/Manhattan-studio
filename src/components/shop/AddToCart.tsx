"use client";

import { useCart } from "./CartProvider";

/**
 * One buy button.
 *
 * The label reports what is true — "in your basket" once it is — rather than
 * flashing a confirmation and reverting. A button that says "added!" for two
 * seconds tells you what happened; one that says where the thing is tells you
 * what to do next.
 *
 * `name` is passed through to the basket only so the order that reaches the
 * studio reads in the customer's language. The price never travels with it.
 */
export default function AddToCart({
  id,
  name,
  add,
  added,
  tone = "light",
  className = "",
}: {
  id: string;
  name: string;
  add: string;
  added: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cart = useCart();
  const line = cart.lines.find((entry) => entry.id === id);
  const inBasket = Boolean(line);

  const base =
    "label inline-flex w-full items-center justify-center gap-3 px-6 py-4 transition-colors duration-200";
  const look =
    tone === "dark"
      ? inBasket
        ? "bg-white/15 text-white hover:bg-white/25"
        : "bg-white text-ink hover:bg-accent hover:text-white"
      : inBasket
        ? "bg-ink/10 text-ink hover:bg-ink/20"
        : "bg-accent text-white hover:bg-accent-deep";

  return (
    <button
      type="button"
      data-add={id}
      onClick={() => cart.add(id)}
      className={`${base} ${look} mt-auto ${className}`}
    >
      {inBasket ? (
        <>
          {added}
          <span aria-hidden="true" className="font-mono">
            ×{line?.quantity}
          </span>
        </>
      ) : (
        <>
          {add}
          <span aria-hidden="true">+</span>
        </>
      )}
      <span className="sr-only">— {name}</span>
    </button>
  );
}
