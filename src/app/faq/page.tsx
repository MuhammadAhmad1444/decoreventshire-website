import type { Metadata } from "next";
import Link from "next/link";
import { business, faqs } from "@/data/site";
import { FAQList } from "@/components/interactive";
import { CTABand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about quotes, delivery, setup, deposits and bookings for event hire with Decor Events Hire in Sydney.",
  alternates: { canonical: "/faq/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="Good to know" title="Questions," accent="answered" intro="Everything you need to know about hiring with us." image="/images/work/setup-08.jpg" crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <section className="mx-auto max-w-[920px] px-4 py-20 sm:px-6 lg:py-28">
        <div data-reveal="up"><FAQList items={faqs} /></div>
        <div data-reveal="up" className="mt-14 flex flex-col items-center gap-4 bg-linen p-10 text-center">
          <h2 className="font-display text-3xl">Still have a question?</h2>
          <p className="text-muted">Call {business.phoneLocal} or send us a message, and we&apos;re happy to help.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="btn btn-primary">Contact us</Link>
            <a href={business.phoneHref} className="btn btn-outline">Call now</a>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
