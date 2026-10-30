import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, categories, formatPrice, packages, products } from "@/data/site";
import { areaLocal, areas, getArea } from "@/data/areas";
import { Icon } from "@/components/Icon";
import { FAQList } from "@/components/interactive";
import { CTABand, PackageCard, PageHero, ProductCard, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const a = getArea((await params).area);
  if (!a) return {};
  return {
    title: `${a.name} Party & Wedding Hire`,
    description: `Tiffany chair, table, linen and décor hire in ${a.name}${a.postcode ? ` NSW ${a.postcode}` : ""}. Exact prices online, delivered, set up and collected by ${business.name}.`,
    alternates: { canonical: `/areas/${a.slug}/` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const a = getArea((await params).area);
  if (!a) notFound();

  const popular = products.filter((p) => p.popular).slice(0, 8);
  const local = areaLocal[a.slug];
  const faqs = [
    { q: `Do you deliver to ${a.name}?`, a: `Yes. We deliver, set up and collect across ${a.name}${a.nearby.length ? `, including ${a.nearby.slice(0, 3).join(", ")}` : ""}. Tell us your venue and event times and we'll confirm availability.` },
    { q: `How much is delivery to ${a.name}?`, a: "Delivery, setup and pack-down are quoted per job, based on your address, access and timing. Item hire prices are shown online so you know them upfront." },
    { q: `Can you set up in a park or reserve in ${a.name}?`, a: `Yes, on firm, level ground. Parks and reserves in ${a.name} are mostly managed by ${local.council}, so check their booking rules for your spot, then tell us the location and the nearest parking so we can plan the carry.` },
    { q: "How do I book?", a: `Add items to your quote cart and send your date, suburb and guest numbers, or call ${business.phoneLocal}. We confirm availability and your final quote personally.` },
  ];

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Party and wedding hire in ${a.name}`,
      serviceType: "Event furniture and décor hire",
      provider: { "@id": `${business.url}/#business` },
      areaServed: { "@type": "Place", name: `${a.name}, NSW${a.postcode ? ` ${a.postcode}` : ""}, Australia` },
      url: `${business.url}/areas/${a.slug}/`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hire catalogue",
        itemListElement: categories.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${c.name} hire`, url: `${business.url}/hire/${c.slug}/` } })),
      },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero
        eyebrow={a.region}
        title={`Event hire in ${a.name}`}
        accent="delivered & styled"
        intro={a.intro}
        image={a.image}
        imageAlt={`Event furniture and décor hire set up by Decor Events Hire, serving ${a.name}`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas we serve", href: "/areas/" }, { label: a.name }]}
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div data-reveal="left" className="flex flex-col gap-5">
          <h2 className="font-display text-[34px] leading-tight sm:text-[40px]">Wedding, party &amp; event hire for {a.name}</h2>
          <p className="leading-relaxed text-muted">
            {business.name} hires Tiffany chairs, trestle and round tables, linen, flower walls, arches, draping and styled
            packages to {a.name}{a.postcode ? ` (NSW ${a.postcode})` : ""} and nearby suburbs. Every item has its hire price
            shown online, and we deliver, set up and pack down for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/hire/" className="btn btn-primary">Browse the catalogue</Link>
            <a href={business.phoneHref} className="btn btn-outline">Call {business.phoneLocal}</a>
          </div>
        </div>
        <div data-reveal="right" className="flex flex-col gap-4 border border-line p-7 md:p-9">
          <div className="flex items-center gap-3"><Icon name="pin" size={24} stroke={1.4} className="text-gold-text" /><h3 className="font-display text-2xl">Nearby suburbs we cover</h3></div>
          <ul className="flex flex-wrap gap-2">
            {a.nearby.map((s) => <li key={s} className="rounded-full border border-line px-4 py-2 text-sm">{s}</li>)}
          </ul>
          <p className="text-sm text-muted">Based at {business.addressLine}. Delivery is quoted per job.</p>
        </div>
      </section>

      <section className="container-x pb-16 lg:pb-24">
        <div data-reveal="up" className="flex flex-col gap-5 bg-linen p-7 md:p-10">
          <h2 className="font-display text-[28px] leading-tight sm:text-[34px]">Planning an event in {a.name}</h2>
          <p className="leading-relaxed text-muted">
            Most of {a.name} sits within {local.council}. Whether your celebration is at home, in a hall or outdoors, a few details
            help us deliver and set up smoothly:
          </p>
          <ul className="flex flex-col gap-3">
            {local.tips.map((t) => (
              <li key={t} className="flex items-start gap-3 leading-relaxed"><Icon name="check" size={18} stroke={1.8} className="mt-1 shrink-0 text-gold-text" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-16 lg:pb-24">
        <SectionHeader eyebrow={`Popular in ${a.name}`} title="Most-hired pieces" action={<Link href="/hire/" className="link-u">See everything</Link>} />
        {/* One card per row on phones: two-across leaves no room for the quantity and add-to-quote controls. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><ProductCard product={p} compact sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /></Reveal>)}
        </div>
      </section>

      <section className="container-x pb-16 lg:pb-24">
        <SectionHeader eyebrow="Styled for you" title={`Packages for ${a.name} events`} action={<Link href="/packages/" className="link-u">All packages</Link>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 100}><PackageCard pkg={p} /></Reveal>)}
        </div>
      </section>

      <section className="mx-auto max-w-[920px] px-4 pb-20 sm:px-6 lg:pb-28">
        <SectionHeader eyebrow="Good to know" title={`Hiring in ${a.name}`} center />
        <div data-reveal="up"><FAQList items={faqs} /></div>
      </section>

      <section className="container-x pb-20 lg:pb-28">
        <SectionHeader eyebrow="Also delivering to" title="Other areas we serve" />
        <ul data-stagger className="flex flex-wrap gap-2">
          {areas.filter((o) => o.slug !== a.slug).map((o) => (
            <li key={o.slug}><Link href={`/areas/${o.slug}/`} className="block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold-text">{o.name}</Link></li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">Packages start from {formatPrice(Math.min(...packages.map((p) => p.price)))}.</p>
      </section>

      <CTABand />
    </>
  );
}
