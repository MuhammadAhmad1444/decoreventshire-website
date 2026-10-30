import type { Metadata } from "next";
import { events } from "@/data/site";
import { CTABand, EventCard, HowItWorks, PageHero, Reveal, Ribbon, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Event Hire for Weddings, Birthdays & Parties",
  description: "Furniture and décor hire for weddings, engagements, birthdays, baby showers, christenings, corporate events and backyard parties across Sydney.",
  alternates: { canonical: "/events/" },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Weddings · parties · corporate"
        title="Events we"
        accent="style"
        intro="Whatever you're celebrating, we'll help you seat, dress and style it, then deliver, set up and collect."
        image="/images/hero/hero-4.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <section className="container-x py-20 lg:py-28">
        <SectionHeader center eyebrow="Choose your occasion" title="Ideas, packages & pieces for every event" />
        <div className="grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[320px]">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 4) * 90} className={`${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""} ${i === 3 ? "lg:col-span-2" : ""}`}>
              <EventCard ev={e} tall />
            </Reveal>
          ))}
        </div>
      </section>
      <Ribbon items={events.map((e) => e.name)} speed="45s" />
      <section className="container-x py-20 lg:py-28">
        <SectionHeader center eyebrow="How it works" title="Simple from start to finish" />
        <HowItWorks />
      </section>
      <CTABand />
    </>
  );
}
