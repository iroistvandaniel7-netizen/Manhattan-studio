/**
 * Widens the literal types produced by `as const` into their base types, so
 * that the Hungarian dictionary can act as the structural contract for the
 * other locales without forcing them to repeat its exact string literals.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends null
        ? null
        : T extends readonly (infer U)[]
          ? // Kept readonly so the `as const` Hungarian source stays assignable;
            // mutable arrays in the other locales widen into this fine.
            readonly Widen<U>[]
          : { -readonly [K in keyof T]: Widen<T[K]> };
