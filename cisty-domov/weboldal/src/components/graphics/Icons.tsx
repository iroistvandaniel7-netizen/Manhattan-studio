/** The small four-point glint that opens every section label. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path d="M8 0l1.9 6.1L16 8l-6.1 1.9L8 16l-1.9-6.1L0 8l6.1-1.9Z" fill="currentColor" />
    </svg>
  );
}
