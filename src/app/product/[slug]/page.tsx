import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, getCategory, getProduct, productPriceLabel, products } from "@/data/site";
import { getArea, type Area } from "@/data/areas";
import { Icon } from "@/components/Icon";
import { ProductBuy } from "@/components/ProductBuy";
import { FAQList, ProductGallery } from "@/components/interactive";
import { ProductCarousel } from "@/components/home/HomeInteractive";
import { Breadcrumbs, CTABand, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  // Keep titles within what Google shows (about 60 characters, counting the " | Decor Events Hire"
  // suffix): long product names drop "Sydney", and the longest also drop the suffix.
  const suffix = " | Decor Events Hire".length;
  const title: Metadata["title"] = p.seoTitle
    ?? (`${p.name} Hire Sydney`.length + suffix <= 62 ? `${p.name} Hire Sydney`
      : `${p.name} Hire`.length + suffix <= 62 ? `${p.name} Hire` : { absolute: `${p.name} Hire` });
  // Products in a colour range share their short line, so those descriptions lead with the name.
  const shared = products.some((o) => o.slug !== p.slug && o.short === p.short);
  const price = p.price != null ? ` ${productPriceLabel(p)} ${p.unit}.` : "";
  const lead = shared ? `${p.name} hire. ${p.short}` : p.short;
  const long = `${lead}${price} Delivered and set up from Campbelltown across Sydney.`;
  return {
    title,
    description: [long, `${lead}${price} Delivered across Sydney.`, `${lead}${price}`].find((d) => d.length <= 160) ?? lead,
    alternates: { canonical: `/product/${p.slug}/` },
    openGraph: { images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const nearbyAreas = ["campbelltown", "liverpool", "camden", "narellan", "parramatta"].map(getArea).filter((a): a is Area => !!a);
  const related = [...products.filter((x) => x.slug !== p.slug && x.category === p.category), ...products.filter((x) => x.category !== p.category && x.popular)].slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map((i) => `${business.url}${i}`),
    ...(p.price != null && {
      offers: p.options?.length
        ? { "@type": "AggregateOffer", priceCurrency: "AUD", lowPrice: Math.min(...p.options.map((o) => o.price ?? Infinity)), highPrice: Math.max(...p.options.map((o) => o.price ?? 0)), offerCount: p.options.length, availability: "https://schema.org/InStock" }
        : { "@type": "Offer", priceCurrency: "AUD", price: p.price, availability: "https://schema.org/InStock" },
    }),
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
          <ProductBuy product={p} />
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

      {/* Where and how this item is hired, linked to its category and nearby area pages. */}
      <section className="container-x pb-20 lg:pb-28">
        <div data-reveal="up" className="flex max-w-3xl flex-col gap-4 border-t border-line pt-12">
          <h2 className="font-display text-[30px] leading-tight sm:text-[36px]">{p.name} hire in Campbelltown &amp; Sydney</h2>
          <p className="leading-relaxed text-muted">
            Hire the {p.name}{p.price != null ? ` for ${productPriceLabel(p).replace("From", "from")} ${p.unit}` : `, ${p.unit}`} from {business.name},
            based at {business.addressLine}. We deliver, set up and pack down across Sydney and the south-west, so you can add it to
            your quote with the rest of your <Link href={`/hire/${cat.slug}/`} className="link-u">{cat.name.toLowerCase().replace(/s$/, "")} hire</Link> and
            we&apos;ll confirm availability for your date.
          </p>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            Delivered to
            {nearbyAreas.map((a) => (
              <Link key={a.slug} href={`/areas/${a.slug}/`} className="rounded-full border border-line px-3.5 py-1.5 transition-colors hover:border-gold hover:text-gold-text">{a.name}</Link>
            ))}
            <Link href="/areas/" className="link-u">and more</Link>
          </p>
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
