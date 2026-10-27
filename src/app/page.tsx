import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { business, events, faqs, offers, packages, products } from "@/data/site";
import { Icon, Sparkle } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";
import { FAQList, QuickQuote } from "@/components/interactive";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { CategoryShowcase, GalleryShowcase, ProductCarousel } from "@/components/home/HomeInteractive";
import { CTABand, Eyebrow, PackageCard, Reveal, RotatingBadge } from "@/components/ui";

const ribbon = ["Tiffany Chairs", "Flower Walls", "Floral Arches", "Round Tables", "Neon Signs", "Ceiling Draping", "Long Banquet Tables", "Gold Chargers", "Fairy Light Curtains", "Backyard Packages"];

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const featured = [...products.filter((p) => p.popular), ...products.filter((p) => !p.popular)].slice(0, 10);
  const signature = packages[0];

  return (
    <>
      <HeroSlideshow />

      {/* Quick quote, directly under the hero */}
      <section id="welcome" className="container-x relative z-10">
        <div data-reveal="up" className="overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgba(30,42,34,0.35)]"><QuickQuote /></div>
      </section>

      {/* Ribbon marquee */}
      <section aria-label="What we hire" className="marquee-wrap mt-20 overflow-hidden border-y border-line py-7 lg:mt-28">
        <div className="marquee" style={{ ["--speed" as string]: "55s" }}>
          {[...ribbon, ...ribbon].map((r, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 pr-10 font-display text-4xl text-forest/80 md:text-5xl">
              {r}<Sparkle size={16} className="text-gold" />
            </span>
          ))}
        </div>
      </section>

      {/* Editorial intro */}
      <section className="container-x grid items-center gap-16 py-24 lg:grid-cols-2 lg:gap-24 lg:py-36">
        <div className="relative order-2 h-[520px] sm:h-[620px] lg:order-1">
          <div data-reveal="clip" className="absolute left-0 top-0 arch h-[78%] w-[68%]">
            <div data-parallax="0.06" className="absolute -inset-y-10 inset-x-0">
              <Image src="/images/work/setup-02.jpg" alt="Round reception table with white Tiffany chairs and a tall floral centrepiece" fill sizes="(max-width: 1024px) 70vw, 34vw" className="object-cover" />
            </div>
          </div>
          <div data-reveal="up" style={{ ["--d" as string]: "250ms" }} className="absolute bottom-0 right-0 h-[54%] w-[52%] overflow-hidden rounded-3xl border-[10px] border-cream shadow-[0_30px_60px_-20px_rgba(38,52,40,0.35)]">
            <Image src="/images/work/setup-16.jpg" alt="Long table with white hydrangeas, candles and gold-rim plates" fill sizes="(max-width: 1024px) 55vw, 26vw" className="object-cover" />
          </div>
          <RotatingBadge className="absolute bottom-6 left-2 text-forest sm:bottom-12 sm:left-6" />
        </div>
        <div className="order-1 flex flex-col gap-7 lg:order-2">
          <Eyebrow>Welcome to Decor Events Hire</Eyebrow>
          <h2 data-reveal="up" className="h-display text-[44px] md:text-6xl lg:text-[68px]">We style the space, <em className="text-sage">you</em> enjoy the moment.</h2>
          <p data-reveal="up" style={{ ["--d" as string]: "120ms" }} className="lede">From intimate backyard birthdays to 100-guest receptions, we supply beautiful furniture and décor with honest, upfront pricing. Then we deliver, set up and collect, so your day feels effortless.</p>
          <ul data-stagger className="grid gap-5 border-t border-line pt-7 sm:grid-cols-3">
            {[["tag", "Exact prices online"], ["truck", "Delivered & styled"], ["heart", "Personal service"]].map(([icon, t]) => (
              <li key={t} className="flex flex-col gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold-text"><Icon name={icon} size={20} stroke={1.3} /></span>
                <span className="font-display text-2xl leading-tight">{t}</span>
              </li>
            ))}
          </ul>
          <div data-reveal="up" className="flex flex-wrap gap-3.5 pt-2">
            <Link href="/about/" className="btn btn-outline">Our story</Link>
            <a href={business.phoneHref} className="btn btn-sm h-14 gap-2.5 whitespace-nowrap px-2 text-forest hover:text-gold-text"><Icon name="phone" size={18} />{business.phoneLocal}</a>
          </div>
        </div>
      </section>

      {/* Category showcase (dark) */}
      {/* overflow-clip (not hidden) so the sticky category photo still sticks */}
      <section className="relative overflow-clip bg-forest py-24 text-cream lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-gold/10" />
        <div className="container-x relative">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-2xl flex-col gap-5">
              <Eyebrow light>The collection</Eyebrow>
              <h2 data-reveal="up" className="h-section">Everything to dress your venue</h2>
            </div>
            <Link data-reveal="up" href="/hire/" className="btn btn-glass">Full catalogue</Link>
          </div>
          <CategoryShowcase />
        </div>
      </section>

      {/* Featured products carousel */}
      <section className="pt-24 lg:pt-32">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Most-loved pieces</Eyebrow>
            <h2 className="h-section">Build your quote cart</h2>
            <p className="leading-relaxed text-muted">Choose your pieces and quantities, then send one request. We&apos;ll confirm your date and add delivery and setup.</p>
          </div>
          <Link href="/hire/" className="btn btn-outline">View all items</Link>
        </div>
        {/* Full width, so cards glide in from the page edge rather than being cut by the container. */}
        <div className="mt-10"><ProductCarousel items={featured} /></div>
      </section>

      {/* Signature package */}
      <section className="mt-20 bg-linen lg:mt-28">
        <div className="container-x grid items-center gap-14 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          <div className="relative h-[460px] sm:h-[560px] lg:h-[660px]">
            <span aria-hidden="true" data-reveal="zoom" className="absolute -left-4 -top-4 bottom-4 right-4 border border-gold" />
            <div data-reveal="clip" className="absolute inset-0 overflow-hidden">
              <div data-parallax="0.08" className="absolute -inset-y-12 inset-x-0">
                <Image src={signature.image} alt="Backyard birthday long table with white chairs, pink runner and gold chargers" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div data-reveal="up" style={{ ["--d" as string]: "300ms" }} className="absolute -bottom-6 right-4 flex flex-col items-center bg-forest px-7 py-5 text-cream shadow-xl sm:right-8">
              <span className="text-sm font-semibold text-gold-light">From</span>
              <span className="font-display text-5xl leading-none">$800</span>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <Eyebrow>Signature package</Eyebrow>
            <h2 data-reveal="up" className="h-display text-[44px] md:text-[60px]">The Backyard<br /><em className="text-sage">Birthday</em> Package</h2>
            <p data-reveal="up" className="lede">{signature.description}</p>
            <ul data-stagger className="border-t border-line">
              {signature.includes.map((i) => (
                <li key={i.item} className="flex items-center gap-5 border-b border-line py-5 text-[17px]">
                  <span className="w-14 font-display text-[34px] leading-none text-gold-text">{i.qty}</span>{i.item}
                </li>
              ))}
            </ul>
            <div data-reveal="up" className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex-1"><AddToQuote kind="package" slug={signature.slug} showQty={false} label="Add package to quote" /></div>
              <Link href={`/packages/${signature.slug}/`} className="btn btn-outline">View details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container-x py-24 lg:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Packages</Eyebrow>
            <h2 data-reveal="up" className="h-section">Styled sets, one simple price</h2>
          </div>
          <Link data-reveal="up" href="/packages/" className="link-u">Compare all packages</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(1, 4).map((p, i) => <Reveal key={p.slug} delay={i * 100}><PackageCard pkg={p} /></Reveal>)}
        </div>
      </section>

      {/* Events bento */}
      <section className="bg-sage-soft py-24 lg:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-col items-center gap-5 text-center">
            <Eyebrow>Events we style</Eyebrow>
            <h2 data-reveal="up" className="h-section max-w-3xl">Every celebration, beautifully seated</h2>
          </div>
          <div data-stagger className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[280px]">
            {events.map((e, i) => (
              <Link
                key={e.slug}
                href={`/events/${e.slug}/`}
                className={`group relative overflow-hidden rounded-2xl text-cream ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""} ${i === 3 ? "lg:col-span-2" : ""}`}
              >
                <Image src={e.image} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="img-zoom object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <span className="flex flex-col gap-1">
                    <span className={`font-display leading-none ${i === 0 ? "text-5xl" : "text-[32px]"}`}>{e.name}</span>
                    <span className="max-h-0 overflow-hidden text-sm text-mist opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">{e.headline}</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/50 transition-all duration-500 group-hover:rotate-0 group-hover:border-gold-light group-hover:bg-gold-light group-hover:text-deep sm:-rotate-45"><Icon name="arrow" size={17} /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-24 lg:py-32">
        <div className="mb-16 flex flex-col items-center gap-5 text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 data-reveal="up" className="h-section max-w-3xl">From quote cart to beautifully set, in four steps</h2>
        </div>
        <div className="relative">
          <span aria-hidden="true" data-reveal="line" className="absolute left-0 right-0 top-8 hidden h-px bg-gold lg:block" />
          <ol data-stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["bag", "Build your cart", "Browse the collection and add the pieces, packages and quantities you need."],
              ["calendar", "Send your details", "Share your date, venue and guest numbers, and whether you'd like setup."],
              ["check", "We confirm", "We check availability and send your final quote, including delivery."],
              ["truck", "We deliver & style", "We set up before your event and collect once the celebration is over."],
            ].map(([icon, t, b], i) => (
              <li key={t} className="relative flex flex-col items-start gap-4 lg:items-center lg:text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-cream text-gold-text">
                  <Icon name={icon} size={24} stroke={1.3} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-[11px] font-medium text-cream">{i + 1}</span>
                </span>
                <h3 className="font-display text-[28px]">{t}</h3>
                <p className="max-w-xs text-[15px] leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal="up" className="mt-14 flex justify-center"><Link href="/quote/" className="btn btn-primary">Start my quote<Icon name="arrow" size={16} /></Link></div>
      </section>

      {/* Offers */}
      <section className="relative overflow-hidden bg-linen py-24 lg:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-2xl flex-col gap-5">
              <Eyebrow>Ways to save</Eyebrow>
              <h2 data-reveal="up" className="h-section">Current offers</h2>
            </div>
            <Link data-reveal="up" href="/offers/" className="link-u">Offer terms</Link>
          </div>
          <div data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o, i) => (
              <div key={o.id}>
              <div className={`lift group relative flex h-full flex-col gap-5 overflow-hidden p-8 ${i === 1 ? "bg-forest text-cream" : "bg-cream"}`}>
                <span aria-hidden="true" className={`absolute -right-10 -top-10 h-32 w-32 rounded-full border transition-transform duration-700 group-hover:scale-150 ${i === 1 ? "border-gold-light/30" : "border-gold/30"}`} />
                <Icon name={o.icon} size={30} stroke={1.2} className={i === 1 ? "text-gold-light" : "text-gold-text"} />
                <span className={`text-sm font-semibold ${i === 1 ? "text-gold-light" : "text-gold-text"}`}>{o.title}</span>
                <span className="font-display text-[56px] leading-none">{o.value}</span>
                <p className={`text-[15px] leading-relaxed ${i === 1 ? "text-mist" : "text-muted"}`}>{o.text}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery marquee */}
      <section className="py-24 lg:py-32">
        <div className="container-x mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>Real events, real setups</Eyebrow>
            <h2 data-reveal="up" className="h-section">Recently styled by us</h2>
          </div>
          <div data-reveal="up" className="flex flex-wrap gap-3">
            <Link href="/gallery/" className="btn btn-outline">View gallery</Link>
            <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Icon name="instagram" size={18} />Instagram</a>
          </div>
        </div>
        <div className="container-x"><GalleryShowcase /></div>
      </section>

      {/* FAQ + service area */}
      <section className="container-x grid gap-16 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:pb-32">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Good to know</Eyebrow>
          <h2 data-reveal="up" className="h-section">Questions, answered</h2>
          <p data-reveal="up" className="leading-relaxed text-muted">We service the Sydney metropolitan area and the south-western suburbs, including {business.suburbs.slice(0, 6).join(", ")} and surrounds.</p>
          <div data-reveal="up" className="flex flex-wrap gap-3">
            <Link href="/faq/" className="btn btn-outline">All FAQs</Link>
            <Link href="/delivery/" className="link-u self-center">Delivery details</Link>
          </div>
        </div>
        <div data-reveal="up"><FAQList items={faqs.slice(0, 6)} /></div>
      </section>

      <CTABand />
    </>
  );
}
