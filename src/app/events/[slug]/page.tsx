import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, faqs, getPackage, getProduct, type Package, type Product } from "@/data/site";
import { Icon } from "@/components/Icon";
import { FAQList } from "@/components/interactive";
import { ProductCarousel } from "@/components/home/HomeInteractive";
import { CTABand, EventCard, Eyebrow, PackageCard, PageHero, Reveal, RotatingBadge, SectionHeader } from "@/components/ui";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const find = (slug: string) => events.find((e) => e.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = find((await params).slug);
  if (!e) return {};
  return {
    title: `${e.headline} Sydney`,
    description: e.intro,
    alternates: { canonical: `/events/${e.slug}/` },
    openGraph: { images: [e.image] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = find((await params).slug);
  if (!e) notFound();
  const items = e.products.map(getProduct).filter(Boolean) as Product[];
  const pkgs = e.packages.map(getPackage).filter(Boolean) as Package[];
  const others = events.filter((x) => x.slug !== e.slug).slice(0, 3);
  const [first, ...restWords] = e.headline.split(" ");

  return (
    <>
      <PageHero eyebrow="Event hire · Sydney" title={first} accent={restWords.join(" ")} intro={e.intro} image={e.image} crumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events/" }, { label: e.name }]}>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/quote/" className="btn btn-gold">Get a Quote<Icon name="arrow" size={16} /></Link>
          <Link href="/hire/" className="btn btn-glass">Browse hire items</Link>
        </div>
      </PageHero>

      <section className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-24 lg:py-32">
        <div className="flex flex-col gap-7">
          <Eyebrow>What we provide</Eyebrow>
          <h2 data-reveal="up" className="h-section">Everything for your {e.name.toLowerCase().replace(/s$/, "")}</h2>
          <ul data-stagger className="flex flex-col gap-4">
            {e.points.map((pt) => (
              <li key={pt} className="flex items-start gap-4 border-b border-line pb-4 text-[17px]">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold text-gold-text"><Icon name="check" size={14} stroke={2} /></span>{pt}
              </li>
            ))}
          </ul>
          <p data-reveal="up" className="leading-relaxed text-muted">Not sure what you need? Send us your guest numbers and venue, and we&apos;ll suggest a layout and quantities.</p>
          <Reveal className="flex flex-wrap gap-3">
            <Link href="/quote/" className="btn btn-primary">Ask for a recommendation</Link>
          </Reveal>
        </div>
        <div className="relative h-[460px] lg:h-[600px]">
          <span aria-hidden="true" data-reveal="zoom" className="absolute -right-4 -top-4 bottom-4 left-4 border border-gold" />
          <div data-reveal="clip" className="absolute inset-0 overflow-hidden">
            <div data-parallax="0.07" className="absolute -inset-y-12 inset-x-0">
              <Image src={items[0]?.images[0] ?? e.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <RotatingBadge className="absolute -bottom-10 left-3 rounded-full bg-cream text-forest shadow-xl lg:-left-10" />
        </div>
      </section>

      {pkgs.length > 0 && (
        <section className="bg-linen py-20 lg:py-28">
          <div className="container-x">
            <SectionHeader eyebrow="Recommended packages" title={`Packages for ${e.name.toLowerCase()}`} action={<Link href="/packages/" className="link-u">All packages</Link>} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((p, i) => <Reveal key={p.slug} delay={i * 100}><PackageCard pkg={p} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-20 lg:py-28">
        <SectionHeader eyebrow="Popular choices" title="Hire pieces we recommend" action={<Link href="/hire/" className="link-u">Full catalogue</Link>} />
        <Reveal><ProductCarousel items={items} /></Reveal>
      </section>

      <section className="container-x grid gap-14 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:pb-28">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Good to know</Eyebrow>
          <h2 data-reveal="up" className="h-section">Planning questions</h2>
          <Reveal><Link href="/faq/" className="link-u">All FAQs</Link></Reveal>
        </div>
        <Reveal><FAQList items={faqs.slice(0, 5)} /></Reveal>
      </section>

      <section className="bg-deep py-20 text-cream lg:py-28">
        <div className="container-x">
          <SectionHeader light eyebrow="Explore more" title="Other events we style" action={<Link href="/events/" className="inline-flex min-h-11 items-center text-[13px] uppercase tracking-[0.18em] text-gold-light underline underline-offset-[6px]">All events</Link>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => <Reveal key={o.slug} delay={i * 100}><EventCard ev={o} /></Reveal>)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
