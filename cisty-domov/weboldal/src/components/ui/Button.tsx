import type { ReactNode } from "react";

type Variant = "primary" | "onDark" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep",
  onDark: "bg-white text-ink hover:bg-accent-soft",
  outline: "text-ink ring-1 ring-ink/25 hover:ring-ink",
};

/** A plain pill. The words say what happens; nothing else on it. */
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
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.9375rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
