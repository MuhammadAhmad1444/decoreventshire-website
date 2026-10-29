import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, formatPrice, getPackage, packages, whatsappLink, whatsappMessages } from "@/data/site";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";
import { Breadcrumbs, CTABand, HowItWorks, PackageCard, Reveal, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPackage((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${formatPrice(p.price)}`,
    description: `${p.short} ${p.guests}. Delivered and set up across Sydney and the south-west.`,
    alternates: { canonical: `/packages/${p.slug}/` },
    openGraph: { images: [p.image] },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPackage((await params).slug);
  if (!p) notFound();
  const others = packages.filter((x) => x.slug !== p.slug).slice(0, 3);
  const photos = [p.image, ...p.gallery].slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: photos.map((i) => `${business.url}${i}`),
    offers: { "@type": "Offer", priceCurrency: "AUD", price: p.price, availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x fade-in pt-8 text-muted-2">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Packages", href: "/packages/" }, { label: p.name }]} />
      </div>
      <section className="container-x grid gap-10 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28">
        <div className="grid h-[480px] grid-cols-[2fr_1fr] grid-rows-3 gap-3 sm:h-[660px]">
          {photos.map((src, i) => (
            <div key={src} data-reveal="clip" style={{ ["--d" as string]: `${i * 140}ms` }} className={`group relative overflow-hidden ${i === 0 ? "row-span-3" : ""}`}>
              <Image src={src} alt={i === 0 ? p.name : ""} fill priority={i === 0} sizes={i === 0 ? "(max-width: 1024px) 66vw, 36vw" : "20vw"} className="img-zoom object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <div className="fade-in flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "100ms" }}>
            <span className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-gold" />Package</span>
            <span className="bg-forest px-3 py-1.5 text-sm font-semibold text-gold-light">{p.guests}</span>
          </div>
          <h1 className="fade-in h-display text-5xl md:text-6xl lg:text-[66px]" style={{ ["--d" as string]: "180ms" }}>{p.name}</h1>
          <div className="fade-in flex flex-wrap items-baseline gap-3" style={{ ["--d" as string]: "260ms" }}>
            <span className="font-display text-[64px] leading-none text-sage">{formatPrice(p.price)}</span>
            <span className="text-muted-2">{p.priceNote} · delivery &amp; setup quoted per job</span>
          </div>
          <p className="fade-in text-[17px] leading-relaxed text-muted" style={{ ["--d" as string]: "340ms" }}>{p.description}</p>
          <div className="fade-in" style={{ ["--d" as string]: "420ms" }}>
            <h2 className="mb-2 text-sm font-semibold text-gold-text">What&apos;s included</h2>
            <ul className="border-t border-line">
              {p.includes.map((i) => (
                <li key={i.item} className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:bg-linen">
                  <span className="min-w-12 shrink-0 pl-1 font-display text-[30px] leading-none text-gold-text">{i.qty}</span>{i.item}
                </li>
              ))}
            </ul>
          </div>
          <div className="fade-in flex flex-wrap gap-2" style={{ ["--d" as string]: "500ms" }}>
            {p.bestFor.map((b) => <span key={b} className="rounded-full border border-line px-4 py-2 text-sm">{b}</span>)}
          </div>
          <div className="fade-in flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" style={{ ["--d" as string]: "580ms" }}>
            <div className="flex-1"><AddToQuote kind="package" slug={p.slug} showQty={false} label="Add package to quote" /></div>
            <Link href="/quote/" className="btn btn-outline">Get a Quote</Link>
          </div>
          <a href={whatsappLink(whatsappMessages.package(p.name, formatPrice(p.price)))} target="_blank" rel="noopener noreferrer" className="fade-in btn btn-whatsapp-outline w-full" style={{ ["--d" as string]: "600ms" }}>
            <WhatsAppIcon size={18} />Ask about this package on WhatsApp
          </a>
          <p className="fade-in flex items-start gap-2.5 text-sm leading-relaxed text-muted-2" style={{ ["--d" as string]: "640ms" }}><Icon name="spark" size={16} className="mt-0.5 shrink-0 text-gold-text" />Need more guests? Add extra chairs, tables or linen from the <Link href="/hire/" className="underline">catalogue</Link>, and they&apos;ll be quoted together.</p>
        </div>
      </section>

      <section className="bg-linen py-20 lg:py-28">
        <div className="container-x">
          <SectionHeader center eyebrow="How it works" title="From booking to beautifully set" />
          <HowItWorks />
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeader eyebrow="Compare" title="Other packages" action={<Link href="/packages/" className="link-u">All packages</Link>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => <Reveal key={o.slug} delay={i * 100}><PackageCard pkg={o} /></Reveal>)}
        </div>
      </section>
      <CTABand />
    </>
  );
}
