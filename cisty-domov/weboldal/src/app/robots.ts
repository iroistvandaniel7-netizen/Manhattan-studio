import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Generated once at build time — also what lets the plain-hosting export include it. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
