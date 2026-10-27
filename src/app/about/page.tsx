import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { business } from "@/data/site";
import { Icon, Sparkle } from "@/components/Icon";
import { WordReveal } from "@/components/Motion";
import { Breadcrumbs, CTABand, Eyebrow, HowItWorks, Reveal, Ribbon, RotatingBadge, SectionHeader, TrustStrip } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: "Decor Events Hire is a Sydney-based wedding and event furniture and décor hire business serving Sydney metro and the south-western suburbs.",
  alternates: { canonical: "/about/" },
};

const strip = [
  { src: "/images/work/setup-02.jpg", speed: "0.04", h: "h-[300px] md:h-[440px]" },
  { src: "/images/work/setup-20.jpg", speed: "0.1", h: "h-[300px] md:h-[520px] md:mt-16" },
  { src: "/images/work/setup-12.jpg", speed: "0.05", h: "h-[300px] md:h-[440px]" },
  { src: "/images/work/setup-22.jpg", speed: "0.12", h: "h-[300px] md:h-[520px] md:mt-24" },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full border border-gold/15" />
        <div className="container-x relative grid items-center gap-12 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-28 lg:pt-16">
          <div className="flex flex-col gap-7">
            <div className="fade-in text-muted-2"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} /></div>
            <p className="fade-in flex items-center gap-4 eyebrow" style={{ ["--d" as string]: "100ms" }}><span className="h-px w-12 bg-gold" />Our story</p>
            <h1 className="h-display text-[50px] md:text-7xl lg:text-[84px]">
              <WordReveal text="Beautiful events start with the" delay={150} /> <em className="text-sage"><WordReveal text="details." delay={560} /></em>
            </h1>
            <p className="fade-in lede" style={{ ["--d" as string]: "750ms" }}>{business.name} is a Sydney-based décor and furniture hire business, run by {business.contactName}. We supply elegant Tiffany chairs, tables, linen, backdrops and styled packages for weddings, birthdays and family celebrations across Sydney and the south-western suburbs.</p>
            <div className="fade-in flex flex-wrap gap-3 pt-1" style={{ ["--d" as string]: "900ms" }}>
              <Link href="/quote/" className="btn btn-primary">Get a Quote<Icon name="arrow" size={16} /></Link>
              <Link href="/contact/" className="btn btn-outline">Contact us</Link>
            </div>
          </div>
          <div className="fade-in relative flex items-center justify-center" style={{ ["--d" as string]: "300ms" }}>
            <span aria-hidden="true" className="absolute aspect-square w-[88%] rounded-full bg-linen" />
            <span aria-hidden="true" className="spin-slow absolute aspect-square w-[96%] rounded-full border border-dashed border-gold/40" />
            <Image src="/images/brand/logo-full.png" alt="Decor Events Hire logo" width={777} height={471} priority sizes="(max-width: 768px) 86vw, 560px" className="relative h-auto w-[86%] max-w-[560px]" />
          </div>
        </div>
      </section>

      {/* Staggered parallax image strip */}
      <section className="container-x grid grid-cols-2 items-start gap-3.5 md:grid-cols-4 md:gap-5">
        {strip.map((s, i) => (
          <Reveal key={s.src} variant="clip" delay={i * 120} className={`relative overflow-hidden ${s.h}`}>
            <div data-parallax={s.speed} className="absolute -inset-y-12 inset-x-0">
              <Image src={s.src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </section>

      {/* Statement */}
      <section className="container-x py-24 lg:py-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <Reveal variant="zoom"><Sparkle size={26} className="text-gold" /></Reveal>
          <p data-reveal="blur" className="h-display text-[34px] md:text-5xl lg:text-[56px]">
            &ldquo;We keep things simple: clear prices online, one easy quote request, and a personal reply. Then we deliver, set up and collect, so you can enjoy the day with <em className="text-sage">the people who matter</em>.&rdquo;
          </p>
          <Reveal delay={200} className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cream ring-1 ring-gold/50">
              <Image src="/images/brand/monogram.jpg" alt="" width={261} height={244} className="h-[88%] w-auto mix-blend-multiply" />
            </span>
            <span className="flex flex-col text-left">
              <span className="font-display text-2xl">Our promise</span>
              <span className="text-sm font-semibold text-gold-text">{business.name}</span>
            </span>
          </Reveal>
        </div>
      </section>

      <Ribbon items={["Weddings", "Engagements", "Birthdays", "Baby Showers", "Christenings", "Corporate Events", "Backyard Parties"]} />

      {/* Values */}
      <section className="container-x py-24 lg:py-32">
        <SectionHeader center eyebrow="Why choose us" title="Hire made easy" />
        <TrustStrip />
      </section>

      {/* What we offer */}
      <section className="relative overflow-hidden bg-forest py-24 text-cream lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-6">
            <Eyebrow light>What we do</Eyebrow>
            <h2 data-reveal="up" className="h-section">Furniture, linen &amp; décor, delivered and styled</h2>
            <ul data-stagger className="grid gap-4 sm:grid-cols-2">
              {["Tiffany, Americana & folding chairs", "Trestle & round tables", "Tablecloths, runners & napkins", "Flower walls & floral arches", "Neon signs, plinths & lanterns", "Ceiling & backdrop draping"].map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-cream/15 pb-4 text-[16px] text-mist"><Sparkle size={12} className="mt-1.5 shrink-0 text-gold-light" />{t}</li>
              ))}
            </ul>
            <Reveal className="flex flex-wrap gap-3 pt-2">
              <Link href="/hire/" className="btn btn-gold">Browse the collection</Link>
              <Link href="/packages/" className="btn btn-glass">See packages</Link>
            </Reveal>
          </div>
          <div className="relative h-[460px] lg:h-[580px]">
            <Reveal variant="clip" className="absolute right-0 top-0 h-[80%] w-[76%] overflow-hidden">
              <div data-parallax="0.06" className="absolute -inset-y-12 inset-x-0"><Image src="/images/work/setup-06.jpg" alt="" fill sizes="40vw" className="object-cover" /></div>
            </Reveal>
            <Reveal delay={250} className="absolute bottom-0 left-0 h-[48%] w-[50%] overflow-hidden border-[8px] border-forest">
              <Image src="/images/work/setup-19.jpg" alt="" fill sizes="25vw" className="object-cover" />
            </Reveal>
            <RotatingBadge className="absolute bottom-10 right-4 text-gold-light" />
          </div>
        </div>
      </section>

      <section className="bg-linen py-24 lg:py-32">
        <div className="container-x">
          <SectionHeader center eyebrow="How it works" title="From quote cart to beautifully set" />
          <HowItWorks />
        </div>
      </section>
      <CTABand />
    </>
  );
}
