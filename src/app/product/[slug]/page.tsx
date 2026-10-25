import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, formatPrice, getCategory, getProduct, products, whatsappLink, whatsappMessages } from "@/data/site";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";
import { FAQList, ProductGallery } from "@/components/interactive";
import { ProductCarousel } from "@/components/home/HomeInteractive";
import { Breadcrumbs, CTABand, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} Hire Sydney`,
    description: `${p.short} ${p.price != null ? `${formatPrice(p.price)} ${p.unit}.` : ""} Delivery and setup across Sydney and the south-west.`,
    alternates: { canonical: `/product/${p.slug}/` },
    openGraph: { images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = [...products.filter((x) => x.slug !== p.slug && x.category === p.category), ...products.filter((x) => x.category !== p.category && x.popular)].slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map((i) => `${business.url}${i}`),
    ...(p.price != null && { offers: { "@type": "Offer", priceCurrency: "AUD", price: p.price, availability: "https://schema.org/InStock" } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x fade-in pt-8 text-muted-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Hire", href: "/hire/" }, { label: cat.name, href: `/hire/${cat.slug}/` }, { label: p.name }]} />
      </div>

      <section className="container-x grid gap-10 pb-20 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pb-28">
        <ProductGallery images={p.images} name={p.name} />
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <p className="fade-in flex items-center gap-3 eyebrow" style={{ ["--d" as string]: "100ms" }}>
            <span className="h-px w-10 bg-gold" />{cat.name}{p.popular && <span className="rounded-full border border-gold px-2.5 py-0.5 text-[10px] tracking-[0.2em]">Popular</span>}
          </p>
          <h1 className="fade-in h-display text-5xl md:text-6xl lg:text-[68px]" style={{ ["--d" as string]: "180ms" }}>{p.name}</h1>
          <div className="fade-in flex items-baseline gap-3 border-b border-line pb-6" style={{ ["--d" as string]: "260ms" }}>
            <span className="font-display text-[56px] leading-none text-sage">{formatPrice(p.price)}</span>
            <span className="text-muted-2">{p.unit}{p.price != null ? ", hire only" : ""}</span>
          </div>
          <p className="fade-in text-[17px] leading-relaxed text-muted" style={{ ["--d" as string]: "340ms" }}>{p.description}</p>
          <ul className="fade-in grid gap-3 sm:grid-cols-2" style={{ ["--d" as string]: "420ms" }}>
            {p.details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[15px]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage"><Icon name="check" size={12} stroke={2.2} /></span>{d}
              </li>
            ))}
          </ul>
          <div className="fade-in pt-2" style={{ ["--d" as string]: "500ms" }}>
            <AddToQuote kind="product" slug={p.slug} defaultQty={p.defaultQty ?? 1} label="Add to quote cart" />
            <a href={whatsappLink(whatsappMessages.product(p.name, `${formatPrice(p.price)} ${p.unit}`))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp-outline mt-2.5 w-full">
              <WhatsAppIcon size={18} />Ask about this item on WhatsApp
            </a>
          </div>
          <p className="fade-in text-sm leading-relaxed text-muted-2" style={{ ["--d" as string]: "560ms" }}>Availability is confirmed when we reply to your quote. No payment is taken online.</p>
          <div className="fade-in grid gap-3 sm:grid-cols-3" style={{ ["--d" as string]: "620ms" }}>
            {[["truck", "Delivered & set up"], ["tag", "Exact pricing"], ["heart", "Checked & cleaned"]].map(([icon, t]) => (
              <div key={t} className="group flex items-center gap-3 bg-linen p-4 text-sm transition-colors duration-500 hover:bg-forest hover:text-cream">
                <Icon name={icon} size={20} stroke={1.3} className="shrink-0 text-gold-text transition-colors group-hover:text-gold-light" />{t}
              </div>
            ))}
          </div>
          <div className="fade-in" style={{ ["--d" as string]: "700ms" }}>
            <FAQList initialOpen={-1} items={[
              { q: "Delivery, setup & collection", a: "Delivery, setup and pack-down are quoted per job, based on your suburb, venue access and timing. We service Sydney metro and the south-western suburbs." },
              { q: "Cleaning & condition", a: "Every item is checked and cleaned before delivery. Normal wear is fine; items lost or damaged beyond repair are charged at replacement cost." },
              { q: "Questions about this item?", a: `Call ${business.contactName} on ${business.phoneLocal} or add a note to your quote request.` },
            ]} />
          </div>
        </div>
      </section>

      <section className="bg-linen py-20 lg:py-28">
        <div className="container-x">
          <SectionHeader eyebrow="Complete the look" title="Pairs beautifully with" action={<Link href={`/hire/${cat.slug}/`} className="link-u">More {cat.name.toLowerCase()}</Link>} />
          <Reveal><ProductCarousel items={related} /></Reveal>
        </div>
      </section>
      <CTABand />
    </>
  );
}
