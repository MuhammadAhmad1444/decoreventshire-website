import { business, categories, events, faqs, formatPrice, packages, products } from "@/data/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Claude,
 * Perplexity, Gemini) that read it to understand and recommend a site. Built from the same
 * data as the pages, so prices and contact details never drift.
 */
export function GET() {
  const u = business.url;
  const lines = [
    `# ${business.name}`,
    "",
    `> ${business.name} is a Sydney, Australia business offering wedding and event furniture and décor hire: Tiffany chairs, tables, linen, flower walls, backdrops, draping and styled packages, delivered and set up across the Sydney metropolitan area and south-western Sydney, NSW.`,
    "",
    `- Website: ${u}`,
    `- Phone: ${business.phone}`,
    `- Email: ${business.email}`,
    `- Service area: ${business.area} (${business.suburbs.join(", ")})`,
    `- Hours: ${business.hours}`,
    `- Instagram: ${business.socials.instagram}`,
    `- Facebook: ${business.socials.facebook}`,
    "- Prices are shown online per item; delivery, setup and pack-down are quoted per job.",
    "",
    "## Hire categories",
    ...categories.map((c) => `- [${c.name}](${u}/hire/${c.slug}/): ${c.blurb}`),
    "",
    "## Hire items and prices (AUD)",
    ...products.map((p) => `- [${p.name}](${u}/product/${p.slug}/): ${formatPrice(p.price)} ${p.unit}. ${p.short}`),
    "",
    "## Packages",
    ...packages.map((p) => `- [${p.name}](${u}/packages/${p.slug}/): from ${formatPrice(p.price)}, ${p.guests}. ${p.short}`),
    "",
    "## Events styled",
    ...events.map((e) => `- [${e.name}](${u}/events/${e.slug}/): ${e.headline}`),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## How to book",
    `Add items to the quote cart at ${u}/quote/ and send your event date, suburb and guest numbers, or call ${business.phoneLocal}. Availability and the final quote are confirmed personally.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
