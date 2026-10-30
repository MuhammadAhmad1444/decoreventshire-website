import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/site";
import { Icon } from "@/components/Icon";
import { CatalogueBrowser } from "@/components/interactive";
import { CategoryTiles } from "@/components/CategoryTiles";
import { CTABand, PageHero, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hire Catalogue: Chairs, Tables, Linen & Décor",
  description: `Browse ${products.length} hire items, from Tiffany chairs and tables to linen, backdrops and draping, with exact prices. Delivered across Sydney.`,
  alternates: { canonical: "/hire/" },
};

export default function HirePage() {
  return (
    <>
      <PageHero
        eyebrow={`${products.length} pieces · exact prices`}
        title="The Hire"
        accent="Collection"
        intro="Chairs, tables, linen, backdrops and draping, each with its hire price. Choose your quantities and add them to your quote cart."
        image="/images/hero/hero-3.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Hire Catalogue" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#catalogue" className="btn btn-gold">Browse items<Icon name="arrow" size={16} className="rotate-90" /></a>
          <Link href="/packages/" className="btn btn-glass">See packages</Link>
        </div>
      </PageHero>

      <section className="container-x pt-16 lg:pt-20"><CategoryTiles /></section>

      <section id="catalogue" className="container-x scroll-mt-24 py-12 lg:py-16">
        <CatalogueBrowser />
      </section>

      <section className="container-x pb-24">
        <Reveal className="relative overflow-hidden bg-linen p-8 md:p-14">
          <span aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold/30" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-2xl flex-col gap-3">
              <h2 className="font-display text-4xl leading-tight md:text-5xl">Not sure how many you need?</h2>
              <p className="leading-relaxed text-muted">Send us your guest numbers and venue, and we&apos;ll recommend a layout, quantities and the right package for your space.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote/" className="btn btn-primary">Ask for advice</Link>
              <Link href="/packages/" className="btn btn-outline">See packages</Link>
            </div>
          </div>
        </Reveal>
      </section>
      <CTABand />
    </>
  );
}
