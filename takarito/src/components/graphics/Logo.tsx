import { BRAND } from "@/lib/site";

/**
 * The mark: a water drop with a four-point glint cut into its shoulder,
 * beside a two-line wordmark. Text is live text rather than outlines, so it
 * stays crisp, selectable and translatable by screen readers.
 *
 * `invert` swaps to white for the transparent header over the hero.
 */
export function Mark({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  const drop = invert ? "#ffffff" : "var(--color-accent)";
  const glint = invert ? "var(--color-accent)" : "#ffffff";
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 2C20 2 4 19.5 4 30.5C4 39.6 11.2 46 20 46C28.8 46 36 39.6 36 30.5C36 19.5 20 2 20 2Z"
        fill={drop}
      />
      <path
        d="M14.5 24.5l1.3 3.6 3.6 1.3-3.6 1.3-1.3 3.6-1.3-3.6-3.6-1.3 3.6-1.3Z"
        fill={glint}
      />
      <path
        d="M24 34.5c3.4-.6 5.8-3 6.4-6.4"
        fill="none"
        stroke={glint}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export default function Logo({ invert = false, size = "md" }: { invert?: boolean; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark invert={invert} className={big ? "h-12 w-auto" : "h-9 w-auto"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[0.08em] ${big ? "text-2xl" : "text-[1.0625rem]"}`}
        >
          {BRAND.wordmarkTop}
        </span>
        <span
          className={`mt-1 font-semibold tracking-[0.34em] ${
            invert ? "text-white/75" : "text-accent"
          } ${big ? "text-xs" : "text-[0.5625rem]"}`}
        >
          {BRAND.wordmarkBottom}
        </span>
      </span>
    </span>
  );
}
