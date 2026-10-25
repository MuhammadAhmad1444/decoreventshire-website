import type { Metadata } from "next";
import { business, gallery } from "@/data/site";
import { Icon } from "@/components/Icon";
import { Gallery } from "@/components/interactive";
import { CTABand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery: Real Event Setups",
  description: "See real weddings, birthdays and celebrations styled with our Tiffany chairs, tables, linen and décor across Sydney.",
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Real events · real setups"
        title="Recently"
        accent="styled"
        intro="Real setups from real celebrations. Tap any photo to see it larger."
        image="/images/work/setup-22.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-glass"><Icon name="instagram" size={18} />More on Instagram</a>
      </PageHero>
      <section className="container-x py-16 lg:py-24">
        <Gallery images={gallery} columns="md:columns-3 xl:columns-4" />
      </section>
      <CTABand title="Love what you see?" accent="Let's create yours." />
    </>
  );
}
