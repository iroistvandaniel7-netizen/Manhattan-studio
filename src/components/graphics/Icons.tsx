import type { SVGProps } from "react";

/**
 * Minimal 24×24 line icons, one per benefit. Stroke-only so they inherit the
 * monochrome palette and animate cleanly on hover.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Small groups. */
export const IconGroup = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" />
    <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6.2" />
    <path d="M17.5 14.4c2 .7 3.5 2.4 3.5 5" />
  </Base>
);

/** Qualified teachers. */
export const IconCap = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4 22 9l-10 5L2 9l10-5Z" />
    <path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8" />
    <path d="M22 9v5" />
  </Base>
);

/** Plenty of conversation. */
export const IconSpeech = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 5.5h12v9H8l-5 4v-4H3v-9Z" />
    <path d="M18 8.5h3v9h-1v3.5l-4-3.5h-4" />
  </Base>
);

/** Free placement test. */
export const IconLevel = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20V13" />
    <path d="M10 20V9" />
    <path d="M16 20V5" />
    <path d="M22 20H2" />
  </Base>
);

/** Free trial lesson. */
export const IconTicket = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 8.5a2 2 0 0 0 0 7V19h18v-3.5a2 2 0 0 1 0-7V5H3v3.5Z" />
    <path d="M14 5v14" strokeDasharray="2.4 2.6" />
  </Base>
);

/** Exam guarantee. */
export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 4.5 6v6c0 4.4 3.1 7.7 7.5 9 4.4-1.3 7.5-4.6 7.5-9V6L12 3Z" />
    <path d="m8.8 11.8 2.3 2.3 4.2-4.4" />
  </Base>
);

/** Free childcare during morning courses. */
export const IconChild = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="6.2" r="3" />
    <path d="M12 9.2v6" />
    <path d="M7.5 11.5h9" />
    <path d="m9.5 21 2.5-5.8L14.5 21" />
  </Base>
);

/** Lessons in good spirits. */
export const IconSpark = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.5 13.9 9l6.6 1.9-6.6 1.9L12 19.4l-1.9-6.6L3.5 11 10.1 9 12 2.5Z" />
    <path d="M18.5 16.5 19.3 19l2.5.8-2.5.8-.8 2.5" />
  </Base>
);

export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.6a12 12 0 0 0 5.9 5.9l1.6-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7v5.3l3.4 2" />
  </Base>
);

export const IconPrinter = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 8V3.5h10V8" />
    <path d="M5 8h14a2 2 0 0 1 2 2v5h-4v5.5H7V15H3v-5a2 2 0 0 1 2-2Z" />
  </Base>
);

/** Ordered to match `benefits.items` in the dictionaries. */
export const BENEFIT_ICONS = [
  IconGroup,
  IconCap,
  IconSpeech,
  IconLevel,
  IconTicket,
  IconShield,
  IconChild,
  IconSpark,
] as const;
