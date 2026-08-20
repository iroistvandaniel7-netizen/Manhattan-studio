import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "solid-invert" | "outline-invert";

const base =
  "group/btn inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[0.8125rem]";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(10,10,10,0.55)]",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-paper hover:-translate-y-0.5",
  "solid-invert":
    "bg-paper text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(255,255,255,0.28)]",
  "outline-invert":
    "border border-paper/45 text-paper hover:bg-paper hover:text-ink hover:border-paper hover:-translate-y-0.5",
};

/**
 * Renders a next/link for in-app routes and a plain anchor for hash links and
 * external URLs, so same-page navigation doesn't go through the router.
 */
export default function Button({
  href,
  children,
  variant = "solid",
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
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1.5"
        >
          →
        </span>
      ) : null}
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;
  const isRoute = href.startsWith("/");

  if (isRoute) {
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
