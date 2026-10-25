/**
 * The price list.
 *
 * Empty until the business supplies its prices: while it is empty the price
 * section shows the "custom quote" block instead of a table, so the page is
 * finished either way and never shows a figure nobody gave.
 *
 * Add rows here and the table appears on its own. `from: true` prints the
 * price as a starting price ("… €-tól").
 */

export type PriceRow = {
  name: string;
  /** Optional one-line detail under the name. */
  detail?: string;
  /** Final price in euros. */
  price: number;
  /** What the price is for, e.g. "m²", "óra", "alkalom". */
  unit: string;
  from?: boolean;
  /** Highlight one row as the most popular choice. */
  featured?: boolean;
};

export const PRICE_LIST: readonly PriceRow[] = [];

export const formatEur = (value: number) =>
  new Intl.NumberFormat("hu-HU", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);
