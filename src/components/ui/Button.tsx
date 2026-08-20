import Link from "next/link";
import type { ReactNode } from "react";

type Variant =
  | "solid"
  | "outline"
  | "solid-invert"
  | "outline-invert"
  | "sunset"
  | "glass"
  | "park";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[0.8125rem]";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-cream hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(20,18,15,0.55)]",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-cream hover:-translate-y-0.5",
  "solid-invert":
    "bg-cream text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(255,255,255,0.3)]",
  "outline-invert":
    "border border-cream/45 text-cream hover:bg-cream hover:text-ink hover:border-cream hover:-translate-y-0.5",
  /* Primary action: the sunset run, lifting into a warm glow on hover. */
  sunset:
    "bg-[linear-gradient(100deg,var(--color-gold-500),var(--color-sunset-500))] text-ink hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-12px_rgba(228,87,46,0.6)]",
  /* Sits directly on the park scene without hiding it. */
  glass:
    "border border-cream/40 bg-cream/10 text-cream backdrop-blur-md hover:border-cream hover:bg-cream hover:text-ink hover:-translate-y-0.5",
  park:
    "bg-park-700 text-cream hover:bg-park-600 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-14px_rgba(23,98,74,0.7)]",
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
