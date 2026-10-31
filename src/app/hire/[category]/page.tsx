import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, events, formatPrice, getCategory, packages, products } from "@/data/site";
import { categoryGuides, categorySeo } from "@/data/category-guides";
import { CatalogueBrowser, FAQList } from "@/components/interactive";
import { CategoryTiles } from "@/components/CategoryTiles";
import { CTABand, Eyebrow, PackageCard, PageHero, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  return {
    title: categorySeo[c.slug].title,
    description: `${categorySeo[c.slug].title.replace(/ Sydney.*$/, "")} in Sydney: ${c.blurb.charAt(0).toLowerCase()}${c.blurb.slice(1)} Exact prices online, delivered and set up.`,
    alternates: { canonical: `/hire/${c.slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const items = products.filter((p) => p.category === c.slug);
  const count = items.length;
  // Add-ons such as cushions don't count towards the "from" price of the category itself.
  const priced = items.filter((p) => p.unit !== "per cushion").map((p) => p.price).filter((p): p is number => p != null);
  const from = priced.length ? Math.min(...priced) : null;
  const guide = categoryGuides[c.slug];
  const hireName = c.name.replace(/s$/, "");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero
        eyebrow={`${count} ${count === 1 ? "piece" : "pieces"} to hire`}
        title={categorySeo[c.slug].h1}
        accent={categorySeo[c.slug].accent}
        intro={c.blurb}
        image={c.image}
        imageAlt={`${c.name} hire set up for an event by Decor Events Hire`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Hire Catalogue", href: "/hire/" }, { label: c.name }]}
      />
      <section className="container-x pt-16 lg:pt-20"><CategoryTiles current={c.slug} /></section>
      <section className="container-x py-12 lg:py-16">
        <CatalogueBrowser initialCategory={c.slug} />
      </section>
      <section className="container-x grid gap-12 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:pb-28">
        <div data-reveal="up" className="flex flex-col gap-5">
          <Eyebrow>{hireName} hire guide</Eyebrow>
          <h2 className="font-display text-[30px] leading-tight sm:text-[38px]">{guide.heading}</h2>
          {guide.paragraphs.map((p) => <p key={p.slice(0, 24)} className="leading-relaxed text-muted">{p}</p>)}
          {from != null && <p className="font-semibold">{hireName} hire from {formatPrice(from)}. Delivery, setup and pack-down are quoted per job.</p>}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-sm text-muted">Popular for</span>
            {guide.events.map((slug) => {
              const ev = events.find((e) => e.slug === slug);
              return ev && <Link key={slug} href={`/events/${slug}/`} className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold-text">{ev.name}</Link>;
            })}
            <Link href="/areas/" className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold-text">Areas we deliver</Link>
          </div>
        </div>
        <div data-reveal="up"><FAQList items={guide.faqs} /></div>
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
