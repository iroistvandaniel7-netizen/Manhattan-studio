import hu, { type Dictionary } from "./dictionaries/hu";
import sk from "./dictionaries/sk";
import en from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { sk, hu, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./config";
