import Image from "next/image";
import { BRAND } from "@/lib/site";

/**
 * The Čistý Domov lockup, straight from the brand files in `cisty-domov/logo/`
 * (copied to `public/brand/`). The wordmark is outlined in those files, so it
 * renders identically everywhere and needs no font.
 *
 * `invert` swaps to the white version for the transparent header over the hero.
 */
export default function Logo({ invert = false, size = "md" }: { invert?: boolean; size?: "md" | "lg" }) {
  return (
    <Image
      src={invert ? "/brand/cisty-domov-logo-feher.svg" : "/brand/cisty-domov-logo.svg"}
      alt={BRAND.name}
      width={479}
      height={120}
      priority
      unoptimized
      className={size === "lg" ? "h-14 w-auto" : "h-10 w-auto sm:h-11"}
    />
  );
}
