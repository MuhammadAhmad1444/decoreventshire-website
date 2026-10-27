import type { MetadataRoute } from "next";
import { business, categories, events, packages, products } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "hire", "packages", "events", "offers", "gallery", "about", "delivery", "faq", "contact", "terms", "privacy"];
  const urls = [
    ...pages.map((p) => (p ? `/${p}/` : "/")),
    ...categories.map((c) => `/hire/${c.slug}/`),
    ...products.map((p) => `/product/${p.slug}/`),
    ...packages.map((p) => `/packages/${p.slug}/`),
    ...events.map((e) => `/events/${e.slug}/`),
  ];
  const lastModified = new Date();
  return urls.map((u) => ({ url: `${business.url}${u}`, lastModified, changeFrequency: "weekly", priority: u === "/" ? 1 : 0.7 }));
}
