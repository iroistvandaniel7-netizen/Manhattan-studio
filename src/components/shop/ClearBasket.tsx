"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/**
 * Empties the basket once an order has been paid for.
 *
 * It is cleared here rather than when the customer leaves for the payment page,
 * because leaving is not buying: somebody who changes their mind on Stripe and
 * comes back should find their basket where they left it. This runs only on the
 * page you reach by having paid.
 */
export default function ClearBasket() {
  const cart = useCart();
  const { clear, count } = cart;

  useEffect(() => {
    if (count > 0) clear();
  }, [count, clear]);

  return null;
}
