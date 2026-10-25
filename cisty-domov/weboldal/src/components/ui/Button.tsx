import type { ReactNode } from "react";

type Variant = "primary" | "onDark" | "outline" | "ghostDark";

/*
 * The site's button: a pill whose arrow sits in its own circle, which slides
 * on hover. One shape for every call to action, so a reader learns it once.
 */
const variants: Record<Variant, { box: string; dot: string }> = {
  primary: { box: "bg-accent text-white hover:bg-accent-deep", dot: "bg-white text-accent" },
  onDark: { box: "bg-white text-ink hover:bg-accent-soft", dot: "bg-accent text-white" },
  outline: { box: "bg-white text-ink ring-1 ring-line hover:ring-ink", dot: "bg-ink text-white" },
  ghostDark: { box: "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15", dot: "bg-white text-ink" },
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  const v = variants[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group/btn inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-6 text-[0.9375rem] font-semibold transition-colors duration-200 ${v.box} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1 ${v.dot}`}
      >
        <svg viewBox="0 0 20 20" fill="none" className="size-4">
          <path d="M4 10h11M11 5.5 15.5 10 11 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
