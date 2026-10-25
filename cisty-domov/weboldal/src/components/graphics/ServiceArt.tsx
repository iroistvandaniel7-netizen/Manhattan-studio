import type { Service } from "@/lib/content";

/**
 * One small duotone drawing per service, in the logo's two blues on its pale
 * ground — the same flat language as the cleaner on the posters, so the cards
 * and the hero read as one hand.
 */
const A = "#1B63D6";
const N = "#0B2D5B";
const S = "#BFD7FA";
const W = "#FFFFFF";

const ART: Record<Service["icon"], React.ReactNode> = {
  home: (
    <>
      <path d="M60 22 96 52v44H24V52Z" fill={A} stroke={A} strokeWidth="8" strokeLinejoin="round" />
      <path d="M60 52c1.4 11 4 13.8 15 15.2-11 1.4-13.6 4.2-15 15.2-1.4-11-4-13.8-15-15.2 11-1.4 13.6-4.2 15-15.2Z" fill={W} />
      <rect x="78" y="30" width="9" height="16" rx="2" fill={N} />
      <circle cx="100" cy="30" r="5" fill="none" stroke={A} strokeWidth="2.5" />
      <circle cx="108" cy="44" r="3" fill="none" stroke={A} strokeWidth="2" />
    </>
  ),
  deep: (
    <>
      <path d="M86 18 64 98" stroke={N} strokeWidth="5" strokeLinecap="round" />
      <path d="M34 62h52l-7 40H41Z" fill={A} />
      <rect x="30" y="56" width="60" height="9" rx="4" fill={N} />
      <g fill={W} stroke={A} strokeWidth="2">
        <circle cx="42" cy="54" r="7" />
        <circle cx="55" cy="51" r="9" />
        <circle cx="70" cy="53" r="8" />
      </g>
      <path d="M50 102h28l-3 6H53Z" fill={S} />
      <circle cx="98" cy="40" r="5" fill="none" stroke={A} strokeWidth="2.5" />
      <circle cx="26" cy="38" r="4" fill="none" stroke={A} strokeWidth="2" />
    </>
  ),
  window: (
    <>
      <rect x="26" y="20" width="68" height="80" rx="4" fill={S} />
      <rect x="26" y="20" width="68" height="80" rx="4" fill="none" stroke={N} strokeWidth="6" />
      <path d="M60 20v80M26 60h68" stroke={N} strokeWidth="5" />
      <path d="M34 30l14-8M70 70l16-9M74 84l12-7" stroke={W} strokeWidth="3" strokeLinecap="round" />
      <g transform="rotate(-18 92 74)">
        <rect x="86" y="54" width="9" height="40" rx="3" fill={N} />
        <rect x="94" y="70" width="24" height="8" rx="4" fill={A} />
      </g>
    </>
  ),
  move: (
    <>
      <rect x="22" y="58" width="44" height="40" rx="3" fill={A} />
      <rect x="58" y="44" width="42" height="54" rx="3" fill={N} />
      <rect x="36" y="26" width="36" height="32" rx="3" fill={S} />
      <path d="M22 70h44M58 58h42M36 38h36" stroke={W} strokeWidth="3" opacity=".7" />
      <path d="M86 24c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10Z" fill={A} />
    </>
  ),
  office: (
    <>
      <rect x="30" y="18" width="60" height="84" rx="4" fill={N} />
      <g fill={S}>
        {[30, 46, 62, 78].map((y) => (
          <g key={y}>
            <rect x="40" y={y} width="12" height="9" rx="1.5" />
            <rect x="68" y={y} width="12" height="9" rx="1.5" />
          </g>
        ))}
      </g>
      <rect x="54" y="88" width="12" height="14" fill={A} />
      <path d="M100 26c1.2 8 3.4 10.2 11.4 11.4-8 1.2-10.2 3.4-11.4 11.4-1.2-8-3.4-10.2-11.4-11.4 8-1.2 10.2-3.4 11.4-11.4Z" fill={A} />
    </>
  ),
};

export default function ServiceArt({ name, className = "" }: { name: Service["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      {ART[name]}
    </svg>
  );
}
