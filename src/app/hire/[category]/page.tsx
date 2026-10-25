import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, packages, products } from "@/data/site";
import { CatalogueBrowser } from "@/components/interactive";
import { CategoryTiles } from "@/components/CategoryTiles";
import { CTABand, PackageCard, PageHero, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return {
    title: `${c.name} Hire Sydney`,
    description: `${c.blurb} Exact hire prices, delivered and set up across Sydney and the south-west.`,
    alternates: { canonical: `/hire/${c.slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const count = products.filter((p) => p.category === c.slug).length;
  return (
    <>
      <PageHero
        eyebrow={`${count} ${count === 1 ? "piece" : "pieces"} to hire`}
        title={c.name}
        accent="Hire"
        intro={c.blurb}
        image={c.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Hire Catalogue", href: "/hire/" }, { label: c.name }]}
      />
      <section className="container-x pt-16 lg:pt-20"><CategoryTiles current={c.slug} /></section>
      <section className="container-x py-12 lg:py-16">
        <CatalogueBrowser initialCategory={c.slug} />
      </section>
      <section className="container-x pb-24 lg:pb-32">
        <SectionHeader eyebrow="Save with a package" title="Popular packages" action={<Link href="/packages/" className="link-u">All packages</Link>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 100}><PackageCard pkg={p} /></Reveal>)}
        </div>
      </section>
      <CTABand />
    </>
  );
}
