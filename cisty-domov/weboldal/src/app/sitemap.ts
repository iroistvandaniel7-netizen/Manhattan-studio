import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/adatvedelem`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/impresszum`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
