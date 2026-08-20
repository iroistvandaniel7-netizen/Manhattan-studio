import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "onDark";

const base =
  "group/btn inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200";

/* Flat fills only — no gradients, no shadows, no rounded corners. */
const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-deep",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  onDark: "bg-white text-blue hover:bg-blue-soft",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const content = (
    <>
      {children}
      {withArrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/btn:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
