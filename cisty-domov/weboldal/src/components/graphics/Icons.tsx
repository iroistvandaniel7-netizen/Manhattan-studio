import type { Service } from "@/lib/content";

/**
 * Line icons, one per service. Drawn on a 24px grid with a 1.6px stroke so
 * they sit with the type rather than above it.
 */
const PATHS: Record<Service["icon"], React.ReactNode> = {
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  deep: (
    <>
      <path d="M12 3v9" />
      <path d="M8 12h8l1.5 9h-11Z" />
      <path d="M10 16.5v4.5M14 16.5v4.5" />
      <path d="M18.5 4.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" />
    </>
  ),
  office: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M8 7.5h2M14 7.5h2M8 11.5h2M14 11.5h2M8 15.5h2M14 15.5h2" />
    </>
  ),
  move: (
    <>
      <path d="M3.5 8.5 12 4.5l8.5 4v8L12 20.5l-8.5-4Z" />
      <path d="M3.5 8.5 12 12.5l8.5-4M12 12.5v8" />
    </>
  ),
  renovation: (
    <>
      <rect x="4" y="4" width="13" height="5" rx="1" />
      <path d="M17 6.5h2.5V12H11v3" />
      <rect x="9.5" y="15" width="3" height="5.5" rx="0.8" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="1" />
      <path d="M12 3.5v17M4 12h16" />
      <path d="M7 9l2.5-2.5M15 17l2.5-2.5" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: Service["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
      <path d="m6 10.3 2.6 2.6L14.2 7.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The small four-point glint that opens every section label. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path d="M8 0l1.9 6.1L16 8l-6.1 1.9L8 16l-1.9-6.1L0 8l6.1-1.9Z" fill="currentColor" />
    </svg>
  );
}
