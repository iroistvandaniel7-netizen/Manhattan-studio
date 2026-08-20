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

/**
 * Slovakia. The arms are essential here, not ornament: the bands alone are
 * white-blue-red, which is the Russian flag, and both languages are taught —
 * so without the shield two rows of the list would carry the same picture.
 */
export function FlagSK({ className }: FlagProps) {
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="10" fill="#ffffff" />
      <rect y="10" width="60" height="10" fill="#0b4ea2" />
      <rect y="20" width="60" height="10" fill="#ee1c25" />

      {/* Shield */}
      <path
        d="M12 6h16v10c0 7-8 10-8 10s-8-3-8-10Z"
        fill="#ee1c25"
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      {/* Three mounds */}
      <path d="M14 20q3-4 6 0 3-4 6 0v2h-12Z" fill="#0b4ea2" />
      {/* Double cross */}
      <path
        d="M19.2 9h1.6v10h-1.6Zm-2.4 2.6h6.4v1.5h-6.4Zm-1.6 3.4h9.6v1.5h-9.6Z"
        fill="#ffffff"
      />
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

/**
 * The small marker that opens every label and list item — a Union Jack in
 * place of the plain square that sat here before. It is decorative: the words
 * next to it carry the meaning, so it is `aria-hidden` and gets a hairline
 * border to hold its edge against both white and blue grounds.
 */
export function FlagMark({ className = "" }: FlagProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 overflow-hidden shadow-[0_0_0_1px_rgba(6,8,15,0.18)] ${className}`}
    >
      <FlagGB className="block h-full w-full" />
    </span>
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
