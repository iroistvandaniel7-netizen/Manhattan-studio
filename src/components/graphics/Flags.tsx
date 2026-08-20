/**
 * Simplified flags, used only as faint background decoration.
 *
 * These are decorative, never the thing that identifies a language — the
 * subway-bullet code does that. A flag stands for a country, not a language
 * (English is not only British, Spanish not only Spanish), so they sit behind
 * the content at low opacity and carry no meaning on their own. Every one is
 * `aria-hidden`.
 *
 * All are drawn on a 60×30 viewBox (2:1) so they can be swapped freely.
 */

type FlagProps = { className?: string };

const box = "0 0 60 30";

/** United Kingdom. */
export function FlagGB({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <clipPath id="uj-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#uj-clip)">
        <rect width="60" height="30" fill="#012169" />
        {/* White saltire */}
        <path d="M0 0 60 30M60 0 0 30" stroke="#ffffff" strokeWidth="6" />
        {/* Red saltire, counterchanged */}
        <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2.4" />
        {/* White cross */}
        <path d="M30 0v30M0 15h60" stroke="#ffffff" strokeWidth="10" />
        {/* Red cross */}
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

/** Germany. */
export function FlagDE({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="10" fill="#000000" />
      <rect y="10" width="60" height="10" fill="#dd0000" />
      <rect y="20" width="60" height="10" fill="#ffce00" />
    </svg>
  );
}

/** Russia. */
export function FlagRU({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="10" fill="#ffffff" />
      <rect y="10" width="60" height="10" fill="#0039a6" />
      <rect y="20" width="60" height="10" fill="#d52b1e" />
    </svg>
  );
}

/** Spain — civil flag, without the coat of arms. */
export function FlagES({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="30" fill="#aa151b" />
      <rect y="7.5" width="60" height="15" fill="#f1bf00" />
    </svg>
  );
}

/** Italy. */
export function FlagIT({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="20" height="30" fill="#008c45" />
      <rect x="20" width="20" height="30" fill="#ffffff" />
      <rect x="40" width="20" height="30" fill="#cd212a" />
    </svg>
  );
}

/** Slovakia — bands only; the arms are omitted at this scale. */
export function FlagSK({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="10" fill="#ffffff" />
      <rect y="10" width="60" height="10" fill="#0b4ea2" />
      <rect y="20" width="60" height="10" fill="#ee1c25" />
    </svg>
  );
}

/** Hungary. */
export function FlagHU({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="10" fill="#ce2939" />
      <rect y="10" width="60" height="10" fill="#ffffff" />
      <rect y="20" width="60" height="10" fill="#477050" />
    </svg>
  );
}

/** Keyed by the badge codes used in the dictionaries. */
export const FLAGS: Record<string, (props: FlagProps) => React.ReactElement> = {
  EN: FlagGB,
  DE: FlagDE,
  RU: FlagRU,
  ES: FlagES,
  IT: FlagIT,
  SK: FlagSK,
  HU: FlagHU,
};
