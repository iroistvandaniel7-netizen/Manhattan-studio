"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { MAX_QUANTITY, findProduct, priceBasket, type CartLine } from "@/lib/catalogue";

const STORAGE_KEY = "manhattan-basket";

/**
 * The basket lives in the browser's own storage, and this reads it the way
 * React wants an external store read.
 *
 * Not an effect that copies storage into state: the server has no
 * localStorage, so the first client paint would disagree with the markup that
 * came down the wire, and patching that up with a mount effect means a
 * cascading render on every page load. `useSyncExternalStore` is built for
 * exactly this — an empty basket for the server, the real one for the browser,
 * and React reconciles the two itself.
 *
 * Reading through a module-level store rather than a context also means the
 * basket is genuinely one basket: two components asking cannot disagree, and a
 * change in another tab arrives through the same `storage` event.
 */

const EMPTY: CartLine[] = [];

/*
 * `getSnapshot` must return the same reference until something actually
 * changes — React compares snapshots by identity and re-renders forever
 * otherwise. So the parsed basket is cached against the raw string it came
 * from, and re-parsed only when that string differs.
 */
let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY;

const listeners = new Set<() => void>();

function rawFromStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode, or site data blocked. The basket works for this visit only.
    return null;
  }
}

/**
 * Storage is the customer's, so what comes out of it is untrusted: hand-edited,
 * left over from an older catalogue, or written by something else sharing the
 * origin. Unknown ids are dropped and quantities clamped; nothing is repaired
 * into something the customer never chose.
 */
function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;

    const lines: CartLine[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const { id, quantity } = entry as { id?: unknown; quantity?: unknown };
      if (typeof id !== "string" || !findProduct(id)) continue;
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
      if (lines.some((line) => line.id === id)) continue;
      lines.push({
        id,
        quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity))),
      });
    }
    return lines.length ? lines : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartLine[] {
  const raw = rawFromStorage();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedLines = parse(raw);
  }
  return cachedLines;
}

/** No storage on the server, so the markup is always rendered basket-empty. */
function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function write(lines: CartLine[]): void {
  const raw = JSON.stringify(lines);
  cachedRaw = raw;
  cachedLines = lines;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Storage refused. Keep the basket in memory for this visit.
  }
  for (const listener of listeners) listener();
}

/**
 * Kept as a component so the page can mark where the shop begins, and so the
 * arrangement can grow a real provider later without touching every caller.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useCart() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((id: string) => {
    if (!findProduct(id)) return;
    const current = getSnapshot();
    const existing = current.find((line) => line.id === id);
    write(
      existing
        ? current.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + 1) }
              : line,
          )
        : [...current, { id, quantity: 1 }],
    );
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    const current = getSnapshot();
    if (quantity < 1) {
      write(current.filter((line) => line.id !== id));
      return;
    }
    const capped = Math.min(MAX_QUANTITY, Math.floor(quantity));
    write(current.map((line) => (line.id === id ? { ...line, quantity: capped } : line)));
  }, []);

  const remove = useCallback((id: string) => {
    write(getSnapshot().filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  return useMemo(() => {
    const priced = priceBasket(lines);
    return {
      lines,
      priced,
      count: priced.lines.reduce((sum, line) => sum + line.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, add, setQuantity, remove, clear]);
}
