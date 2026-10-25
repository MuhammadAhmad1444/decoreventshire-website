import type { Metadata } from "next";
import Link from "next/link";
import { welcomeCode } from "@/data/site";
import { Icon } from "@/components/Icon";
import { CTABand, Eyebrow, OffersGrid, PageHero, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Offers & Discounts",
  description: "Save on event hire with weekday and off-peak discounts, early-bird savings and a welcome offer for new customers.",
  alternates: { canonical: "/offers/" },
};

const terms = [
  "Offers apply to item hire only, not delivery, setup or pack-down.",
  "One offer per booking unless stated otherwise. The highest eligible discount is applied.",
  "Weekday rate applies to events held Monday to Thursday (excluding public holidays). The off-peak season is May to August.",
  "Early-bird discount requires your deposit to be paid 6 or more months before the event date.",
  "The welcome offer is for first-time customers only.",
  "Offers may change or end without notice and do not apply to bookings already confirmed.",
];

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Book early · host midweek · save"
        title="Offers &"
        accent="ways to save"
        intro="Book early, host midweek or try us for the first time, and enjoy more for your budget."
        image="/images/hero/hero-5.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />
      <section className="container-x py-20 lg:py-28">
        <OffersGrid />
      </section>
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-2 lg:pb-32">
        <Reveal className="relative flex flex-col gap-6 overflow-hidden bg-forest p-8 text-cream md:p-12">
          <span aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-light/20" />
          <h2 className="relative font-display text-4xl md:text-5xl">How to claim</h2>
          <ol data-stagger className="relative flex flex-col gap-5">
            {[
              "Add your items or package to the quote cart.",
              <>In the notes, mention the offer, or use code <strong className="tracking-[0.14em] text-gold-light">{welcomeCode}</strong> for the welcome offer.</>,
              "We'll apply the discount when we confirm your quote.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-4 leading-relaxed text-mist">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-light font-display text-lg text-gold-light">{i + 1}</span>
                <span className="pt-1.5">{t}</span>
              </li>
            ))}
          </ol>
          <Link href="/quote/" className="btn btn-gold relative mt-2 self-start">Start my quote<Icon name="arrow" size={16} /></Link>
        </Reveal>
        <div className="flex flex-col gap-5 p-2 md:p-6">
          <Eyebrow>Fine print</Eyebrow>
          <h2 data-reveal="up" className="font-display text-4xl">Offer terms</h2>
          <ul data-stagger className="flex flex-col gap-3.5">
            {terms.map((t) => (
              <li key={t} className="flex items-start gap-3 border-b border-line pb-3.5 text-[15px] leading-relaxed text-muted"><Icon name="check" size={16} stroke={1.8} className="mt-1 shrink-0 text-gold-text" />{t}</li>
            ))}
          </ul>
        </div>
      </section>
      <CTABand />
    </>
  );
}
