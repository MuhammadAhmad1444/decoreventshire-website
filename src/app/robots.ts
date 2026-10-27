import type { MetadataRoute } from "next";
import { business } from "@/data/site";

export const dynamic = "force-static";

// Search engines and AI assistants are named explicitly so they can read and cite the site.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];
const disallow = ["/quote/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow }))],
    sitemap: `${business.url}/sitemap.xml`,
  };
}
