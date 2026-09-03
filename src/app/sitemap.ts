import type { MetadataRoute } from "next";

const SITE_URL = "https://synax.me";

/**
 * Sitemap covering the actual static routes in src/app:
 * / (page.tsx), /projects, /contact. /api/contact is intentionally
 * excluded — it is a POST endpoint, not an indexable page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
