import type { MetadataRoute } from "next";
import { menuItems } from "@/data/menu";
import { restaurant } from "@/data/restaurant";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = restaurant.siteUrl;
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/cocktails`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/prenotazione`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ar`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
  const itemRoutes: MetadataRoute.Sitemap = menuItems.map((item) => ({
    url: `${base}/menu/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticRoutes, ...itemRoutes];
}
