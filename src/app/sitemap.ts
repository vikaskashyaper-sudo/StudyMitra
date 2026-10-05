import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAllSlugs } from "@/lib/getBooks";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/books`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const bookRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${base}/books/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...bookRoutes];
}
