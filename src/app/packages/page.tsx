import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { formatPrice, packages } from "@/data/site";
import { Icon } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";
import { CTABand, Eyebrow, HowItWorks, OffersGrid, PackageCard, PageHero, Reveal, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Event Hire Packages",
  description: "Styled hire packages for backyard birthdays, garden ceremonies, wedding receptions and celebrations, at one simple price. Sydney & south-west.",
  alternates: { canonical: "/packages/" },
};

export default function PackagesPage() {
  const [hero, ...rest] = packages;
  return (
    <>
      <PageHero
        eyebrow={`${packages.length} styled packages`}
        title="Packages, styled"
        accent="& simple"
        intro="Bundled furniture and décor for the most popular celebrations, at one clear price. Add extra items any time."
        image="/images/work/setup-14.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
      />

      {/* Featured package */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative h-[440px] sm:h-[560px]">
            <span aria-hidden="true" data-reveal="zoom" className="absolute -left-4 -top-4 bottom-4 right-4 border border-gold" />
            <div data-reveal="clip" className="absolute inset-0 overflow-hidden">
              <div data-parallax="0.07" className="absolute -inset-y-12 inset-x-0">
                <Image src={hero.image} alt={hero.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <Reveal delay={300} className="absolute -bottom-6 right-6 bg-forest px-6 py-4 text-cream shadow-xl">
              <span className="block text-sm font-semibold text-gold-light">Most popular</span>
              <span className="font-display text-4xl">{formatPrice(hero.price)}</span>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6">
            <Eyebrow>Signature package · {hero.guests}</Eyebrow>
            <h2 data-reveal="up" className="h-display text-[44px] md:text-[58px]">{hero.name}</h2>
            <p data-reveal="up" className="lede">{hero.description}</p>
            <ul data-stagger className="border-t border-line">
              {hero.includes.map((i) => (
                <li key={i.item} className="flex items-center gap-5 border-b border-line py-4 text-[17px]"><span className="w-12 font-display text-[30px] leading-none text-gold-text">{i.qty}</span>{i.item}</li>
              ))}
            </ul>
            <Reveal className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex-1"><AddToQuote kind="package" slug={hero.slug} showQty={false} label="Add package to quote" /></div>
              <Link href={`/packages/${hero.slug}/`} className="btn btn-outline">Details</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-linen py-20 lg:py-28">
        <div className="container-x">
          <SectionHeader eyebrow="More packages" title="Find the right set for your event" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 100}><PackageCard pkg={p} /></Reveal>)}
            <Reveal delay={rest.length % 3 * 100}>
              <div className="lift relative flex h-full min-h-[420px] flex-col justify-between gap-6 overflow-hidden bg-forest p-8 text-cream">
                <span aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-light/20" />
                <div className="relative flex flex-col gap-4">
                  <span className="text-sm font-semibold text-gold-light">Weddings & larger events</span>
                  <h3 className="font-display text-[40px] leading-tight">Want a custom package?</h3>
                  <p className="leading-relaxed text-mist">Tell us your guest count, venue and style. We&apos;ll put together a tailored bundle of chairs, tables, linen and décor at a package price.</p>
                </div>
                <Link href="/quote/" className="btn btn-gold relative self-start">Request a custom quote<Icon name="arrow" size={16} /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeader center eyebrow="How it works" title="Booking a package is easy" />
        <HowItWorks />
      </section>

      <section className="container-x pb-24 lg:pb-32">
        <SectionHeader eyebrow="Stack your savings" title="Offers that apply to packages" action={<Link href="/offers/" className="link-u">Offer terms</Link>} />
        <OffersGrid />
      </section>
      <CTABand />
    </>
  );
}
