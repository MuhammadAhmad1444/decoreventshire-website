import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/data/site";
import { Icon } from "@/components/Icon";
import { CTABand, PageHero, SectionHeader } from "@/components/ui";
import { SuburbChecker } from "@/components/SuburbChecker";

export const metadata: Metadata = {
  title: "Delivery, Setup & Service Area",
  description: "We deliver, set up and collect event hire across the Sydney metropolitan area and south-western suburbs. Delivery is quoted per job.",
  alternates: { canonical: "/delivery/" },
};

const steps = [
  ["Tell us your venue", "Add your address, access details and event times to your quote request."],
  ["We quote delivery", "Delivery and setup are priced per job, based on distance, access and timing."],
  ["We set up", "We arrive before your event to place furniture and décor exactly as planned."],
  ["We collect", "After your event we pack down and collect. No stacking or cleaning needed from you."],
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Sydney metro & south-west"
        title="Delivered, styled"
        accent="& collected"
        intro="We bring it, set it and collect it, across Sydney metro and the south-western suburbs."
        image="/images/work/setup-04.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Delivery" }]}
      />
      <section className="container-x py-20 lg:py-28">
        <SectionHeader eyebrow="How delivery works" title="Four easy steps" />
        <ol data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <li key={t} className="group flex flex-col gap-3 bg-linen p-7 transition-colors duration-500 hover:bg-forest hover:text-cream">
              <span className="font-display text-5xl leading-none text-gold">0{i + 1}</span>
              <h3 className="font-display text-[26px]">{t}</h3>
              <p className="text-[15px] leading-relaxed text-muted transition-colors group-hover:text-mist">{b}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="container-x grid gap-10 pb-24 lg:grid-cols-2">
        <div data-reveal="left" className="flex flex-col gap-5 border border-line p-8 md:p-12">
          <div className="flex items-center gap-3.5"><Icon name="pin" size={30} stroke={1.3} className="text-gold-text" /><h2 className="font-display text-[34px]">Where we deliver</h2></div>
          <p className="leading-relaxed text-muted">The Sydney metropolitan area and the south-western suburbs, including:</p>
          <ul data-stagger className="flex flex-wrap gap-2">
            {business.suburbs.map((s) => <li key={s} className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold-text">{s}</li>)}
          </ul>
          <SuburbChecker />
        </div>
        <div data-reveal="right" className="flex flex-col gap-5 bg-forest p-8 text-cream md:p-12">
          <h2 className="font-display text-[34px]">Good to know</h2>
          <ul className="flex flex-col gap-4 leading-relaxed text-mist">
            {[
              "Delivery and setup are quoted per job. They're not included in item prices.",
              "Tell us about stairs, lifts, long carries or uneven ground so we can plan the right crew.",
              "Early-morning, evening and next-day collection can be arranged on request.",
              "Outdoor setups need firm, level ground. We'll advise if weather cover is needed.",
              "Small orders may be available for pick-up; just ask in your quote request.",
            ].map((t) => (
              <li key={t} className="flex gap-3"><Icon name="check" size={18} stroke={1.8} className="mt-1 shrink-0 text-gold-light" />{t}</li>
            ))}
          </ul>
          <Link href="/quote/" className="btn btn-gold mt-auto self-start">Request a delivery quote</Link>
        </div>
      </section>
      <CTABand />
    </>
  );
}
