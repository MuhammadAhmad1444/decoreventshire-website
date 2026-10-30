import type { Metadata } from "next";
import { business, gallery, inspiration } from "@/data/site";
import { Icon } from "@/components/Icon";
import { Gallery } from "@/components/interactive";
import { CTABand, Eyebrow, PageHero } from "@/components/ui";

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
      <section className="container-x max-w-[1180px] py-16 lg:py-24">
        <Gallery images={gallery} columns="lg:columns-3" />
      </section>

      {/* Inspiration: clearly separated and labelled, so these are never mistaken for our events. */}
      <section className="border-t border-line bg-linen">
        <div className="container-x max-w-[1180px] py-16 lg:py-24">
          <div className="mb-10 flex max-w-2xl flex-col gap-4 lg:mb-14">
            <Eyebrow>Styling inspiration</Eyebrow>
            <h2 data-reveal="up" className="h-section">Ideas to inspire your day</h2>
            <p data-reveal="up" className="leading-relaxed text-muted">
              These photos are from other celebrations, not our own events. They&apos;re here to spark ideas: tell us the look you love and we&apos;ll recreate it with our chairs, tables, linen, flower walls, arches and draping.
            </p>
            <p className="text-sm text-muted-2">Photos: Unsplash</p>
          </div>
          <Gallery images={inspiration} columns="lg:columns-3" />
        </div>
      </section>
      <CTABand title="Love what you see?" accent="Let's create yours." />
    </>
  );
}
