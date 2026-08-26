import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "onDark";

const base =
  "group/btn label inline-flex items-center justify-center gap-3 px-8 py-4.5 transition-colors duration-200";

/* Flat fills only — no gradients, no shadows, no rounded corners. */
const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  onDark: "bg-white text-accent hover:bg-accent-soft",
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
