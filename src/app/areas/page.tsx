import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/Img";
import { areas } from "@/data/areas";
import { CTABand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Areas We Serve Across Sydney",
  description: "Event furniture and décor hire delivered across Sydney, from Campbelltown, Camden and Liverpool to Parramatta, Penrith and the Sutherland Shire.",
  alternates: { canonical: "/areas/" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Sydney metro & south-west"
        title="Areas we"
        accent="serve"
        intro={`From our base in Campbelltown we deliver, set up and collect across Sydney. Find your area below.`}
        image="/images/work/setup-15.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas we serve" }]}
      />
      <section className="container-x py-16 lg:py-24">
        <ul data-stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}/`} className="group flex flex-col gap-3">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-md bg-linen">
                  <Image src={a.image} alt={`Event hire setup for ${a.name}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-xl leading-tight transition-colors group-hover:text-gold-text sm:text-2xl">{a.name}</span>
                  <span className="text-sm text-muted">{a.region}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl leading-relaxed text-muted">
          Not listed? We cover most of the Sydney metropolitan area. <Link href="/delivery/" className="link-u">See how delivery works</Link> or{" "}
          <Link href="/contact/" className="link-u">ask us</Link> about your suburb.
        </p>
      </section>
      <CTABand />
    </>
  );
}
