import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "onDark" | "ghostDark";

const base =
  "group/btn label inline-flex items-center justify-center gap-3 rounded-full px-8 py-4.5 transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  onDark: "bg-white text-accent hover:bg-accent-soft",
  ghostDark: "border-2 border-white/60 text-white hover:border-white hover:bg-white/10",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {withArrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/btn:translate-x-1"
        >
          →
        </span>
      ) : null}
    </a>
  );
}
