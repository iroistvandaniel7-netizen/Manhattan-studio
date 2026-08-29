/**
 * What the studio sells, and for how much.
 *
 * This is the single source of truth for price. The shop reads it, and so does
 * the checkout endpoint — the browser sends only a product id and a quantity,
 * and the server prices the order from this file. A cart that posts its own
 * totals is a cart a customer can edit.
 *
 * Money is in whole cents. 17.50 € cannot be written exactly in binary
 * floating point, and five of them summed and rounded is how a basket ends up
 * a cent short of what the page showed.
 *
 * Prices as given by the studio, August 2026. Nothing here is inferred: the
 * three group courses are the three that have published prices, and every
 * other language is an enquiry rather than a guessed figure.
 */

export const CURRENCY = "EUR";

export type ProductKind = "group" | "private";

export type Product = {
  id: string;
  kind: ProductKind;
  /** Whole cents. */
  price: number;
  /** Teaching hours included. */
  hours: number;
  /** Lessons in the package — private packages only. */
  lessons?: number;
};

/**
 * Group courses. English only, because those are the ones with a published
 * price; the section says plainly that other languages are arranged at the
 * studio rather than showing a number nobody quoted.
 */
export const GROUP_COURSES: Product[] = [
  { id: "cambridge-30", kind: "group", price: 24000, hours: 30 },
  { id: "english-a1a2-20", kind: "group", price: 18000, hours: 20 },
  { id: "english-b1b2-20", kind: "group", price: 20000, hours: 20 },
];

/**
 * Private lessons, sold as packages and good for any of the seven languages —
 * which is why they are not split per language. The rate falls with the size
 * of the package: 17.50, then 17.00, then 16.50 an hour.
 */
export const PRIVATE_PACKAGES: Product[] = [
  { id: "private-1", kind: "private", price: 1750, hours: 1, lessons: 1 },
  { id: "private-5", kind: "private", price: 8500, hours: 5, lessons: 5 },
  { id: "private-10", kind: "private", price: 16500, hours: 10, lessons: 10 },
];

export const PRODUCTS: Product[] = [...GROUP_COURSES, ...PRIVATE_PACKAGES];

const BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

export function findProduct(id: string): Product | undefined {
  return BY_ID.get(id);
}

/**
 * Cents as money, in the reader's own convention — 17,50 € in Hungarian and
 * Slovak, €17.50 in English. `Intl` knows all of this; hand-rolling it is how
 * a site ends up showing a Slovak customer a comma where they expect a space.
 *
 * `narrowSymbol` because Hungarian's default for euros is the letters "EUR",
 * and a price list reading "240 EUR" beside a Slovak one reading "240 €" looks
 * like two different shops. Every locale here is in the euro area.
 *
 * Whole amounts lose their decimals: 240 € rather than 240,00 €. A price list
 * is read at a glance, and six trailing zeroes down a column are noise — but
 * 17,50 € keeps them, because dropping them would make it 17,5.
 */
export function formatPrice(cents: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export type CartLine = { id: string; quantity: number };

export type PricedLine = {
  product: Product;
  quantity: number;
  /** Whole cents, for the whole line. */
  total: number;
};

/**
 * Price a basket from ids and quantities alone.
 *
 * Unknown ids are dropped rather than rejected: a catalogue can lose a product
 * between a customer filling a basket and returning to it, and refusing the
 * whole order for a line that no longer exists helps nobody. Quantities are
 * clamped to a sane range — the cap is what stops a typo or a script turning
 * one package into a four-figure invoice.
 */
export const MAX_QUANTITY = 20;

export function priceBasket(lines: CartLine[]): {
  lines: PricedLine[];
  total: number;
} {
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const product = findProduct(line.id);
    if (!product) continue;
    const quantity = Math.min(MAX_QUANTITY, Math.max(0, Math.floor(line.quantity)));
    if (quantity < 1) continue;
    priced.push({ product, quantity, total: product.price * quantity });
  }

  return { lines: priced, total: priced.reduce((sum, line) => sum + line.total, 0) };
}
