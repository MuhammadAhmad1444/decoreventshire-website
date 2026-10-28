import Image from "@/components/Img";
import Link from "next/link";
import { business, formatPrice, offers, whatsappLink, type EventType, type Package, type Product } from "@/data/site";
import { GoldDivider, Icon, Sparkle, WhatsAppIcon } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";
import { WordReveal } from "@/components/Motion";

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "blur" | "clip" | "clip-x" | "line";

/** Wrapper that fades/slides its content in when scrolled into view (see globals.css). */
export function Reveal({ children, as: Tag = "div", variant = "up", delay = 0, className = "" }: { children?: React.ReactNode; as?: React.ElementType; variant?: RevealVariant; delay?: number; className?: string }) {
  return (
    <Tag data-reveal={variant} style={delay ? ({ ["--d" as string]: `${delay}ms` } as React.CSSProperties) : undefined} className={className}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <span className={`flex items-center text-sm font-semibold ${center ? "justify-center" : ""} ${light ? "text-eucalypt" : "text-sage"}`}>
      {children}
    </span>
  );
}

export function SectionHeader({ eyebrow, title, intro, center = false, action, light = false }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; center?: boolean; action?: React.ReactNode; light?: boolean }) {
  if (center) {
    return (
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-5 text-center md:mb-16">
        {eyebrow && <Eyebrow center light={light}>{eyebrow}</Eyebrow>}
        <h2 data-reveal="up" className="h-section">{title}</h2>
        <Reveal variant="zoom" delay={150}><GoldDivider /></Reveal>
        {intro && <p data-reveal="up" style={{ ["--d" as string]: "200ms" }} className={`leading-relaxed ${light ? "text-mist" : "text-muted"}`}>{intro}</p>}
      </div>
    );
  }
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
      <div className="flex max-w-2xl flex-col gap-5">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2 data-reveal="up" className="h-section">{title}</h2>
        {intro && <p data-reveal="up" style={{ ["--d" as string]: "120ms" }} className={`leading-relaxed ${light ? "text-mist" : "text-muted"}`}>{intro}</p>}
      </div>
      {action && <Reveal delay={150}>{action}</Reveal>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  // Lets Google show the page's place in the site ("Home > Hire > Chairs") in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.label, ...(it.href && { item: `${business.url}${it.href}` }),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] tracking-[0.06em]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-gold">/</span>}
            {it.href ? <Link href={it.href} className="u-grow">{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Gold arch outline that draws itself in on load (see .draw-arch), echoing the ring in the logo.
 * Place inside a relative 4:5 box; the path matches the .arch shape at that ratio.
 */
export function ArchOutline({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 500" preserveAspectRatio="none" className={`draw-arch pointer-events-none absolute inset-0 h-full w-full overflow-visible text-gold ${className}`}>
      {/* Starts bottom-left so the line travels up, over the top and back down. */}
      <path d="M1 480 V200 A199 199 0 0 1 399 200 V480 Q399 499 380 499 H20 Q1 499 1 480 Z" pathLength={1} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Light page hero shared by the inner pages, matching the home hero: text on the left,
 * the photo framed in an arch with an offset gold outline (the ring from the logo).
 */
export function PageHero({ title, accent, intro, image, crumbs, eyebrow, children }: { title: string; accent?: string; intro?: React.ReactNode; image: string; crumbs: { label: string; href?: string }[]; eyebrow?: string; children?: React.ReactNode }) {
  const words = title.split(" ").length;
  return (
    <section className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -right-56 -top-56 h-[620px] w-[620px] rounded-full bg-sage-soft" />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:pb-24">
        <div className="flex flex-col gap-6">
          <div className="fade-in text-muted-2" style={{ ["--d" as string]: "100ms" }}><Breadcrumbs items={crumbs} /></div>
          {eyebrow && <p className="fade-in eyebrow" style={{ ["--d" as string]: "150ms" }}>{eyebrow}</p>}
          <h1 className="h-display max-w-3xl text-[46px] text-forest md:text-6xl lg:text-[76px]">
            <WordReveal text={title} delay={200} />
            {accent && <> <WordReveal text={accent} delay={200 + words * 70} /></>}
          </h1>
          {intro && <p className="fade-in lede max-w-2xl" style={{ ["--d" as string]: "600ms" }}>{intro}</p>}
          {children && <div className="fade-in" style={{ ["--d" as string]: "800ms" }}>{children}</div>}
        </div>
        <div className="fade-in relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mr-0" style={{ ["--d" as string]: "300ms" }}>
          <ArchOutline className="translate-x-2.5 -translate-y-2.5 sm:translate-x-5 sm:-translate-y-5" />
          <div className="arch relative aspect-[4/5] bg-linen">
            <div className="rise absolute inset-0">
              <Image src={image} alt="" fill priority sizes="(max-width: 1024px) 80vw, 360px" className="kenburns-slow object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `sizes` should match the grid the card sits in, so phones don't download desktop-size photos. */
export function ProductCard({ product, compact = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" }: { product: Product; compact?: boolean; sizes?: string }) {
  const href = `/product/${product.slug}/`;
  const alt = product.images[1];
  return (
    <article className="group flex h-full flex-col gap-4">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-linen">
        <Image src={product.images[0]} alt={product.name} fill sizes={sizes} className="img-zoom object-cover" />
        {alt && <Image src={alt} alt="" fill sizes={sizes} className="scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100" />}
        {product.popular && <span className="absolute left-3.5 top-3.5 rounded-full bg-cream/95 px-3 py-1.5 text-sm font-semibold">Popular</span>}
        <span className="absolute inset-x-3.5 bottom-3.5 flex translate-y-3 items-center justify-between rounded-full bg-cream/95 px-4 py-3 text-sm font-semibold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View details<Icon name="arrow" size={15} />
        </span>
      </Link>
      <div className="flex items-baseline justify-between gap-3">
        <Link href={href} className={`-my-1.5 py-1.5 font-display leading-tight transition-colors hover:text-sage ${compact ? "text-[22px]" : "text-[25px]"}`}>{product.name}</Link>
        <span className="flex shrink-0 flex-col items-end">
          <span className="text-lg font-medium">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted-2">{product.unit}</span>
        </span>
      </div>
      {!compact && <p className="-mt-1 text-sm leading-relaxed text-muted">{product.short}</p>}
      {/* Pinned to the bottom so controls line up across a row, even when a name wraps. */}
      <div className="mt-auto"><AddToQuote kind="product" slug={product.slug} defaultQty={product.defaultQty ?? 1} size="sm" /></div>
    </article>
  );
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const href = `/packages/${pkg.slug}/`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="img-zoom object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 bg-forest px-3 py-1.5 text-sm font-semibold text-gold-light">{pkg.guests}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <Link href={href} className="font-display text-[30px] leading-tight transition-colors hover:text-sage">{pkg.name}</Link>
        <p className="text-[15px] leading-relaxed text-muted">{pkg.short}</p>
        <ul className="flex flex-col gap-2 text-[15px]">
          {pkg.includes.slice(0, 4).map((i) => (
            <li key={i.item} className="flex gap-3"><span className="w-8 shrink-0 font-display text-xl leading-none text-gold-text">{i.qty}</span>{i.item}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <span className="flex flex-col">
            <span className="font-display text-4xl leading-none text-sage">{formatPrice(pkg.price)}</span>
            <span className="mt-1 text-xs text-muted-2">{pkg.priceNote}</span>
          </span>
          <Link href={href} className="flex items-center gap-2 text-sm font-semibold text-sage">
            Details<span className="flex h-9 w-9 items-center justify-center rounded-full border border-sage/40 transition-all duration-500 group-hover:border-sage group-hover:bg-sage group-hover:text-cream"><Icon name="arrow" size={15} /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EventCard({ ev, tall = false }: { ev: EventType; tall?: boolean }) {
  return (
    <Link href={`/events/${ev.slug}/`} className={`group relative block overflow-hidden text-cream ${tall ? "h-full min-h-[300px]" : "h-[420px]"}`}>
      <Image src={ev.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="img-zoom object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <span className="flex flex-col gap-1.5">
          <span className="font-display text-[34px] leading-none">{ev.name}</span>
          <span className="max-h-0 overflow-hidden text-sm text-mist opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{ev.intro.split(".")[0]}.</span>
        </span>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/50 transition-all duration-500 group-hover:border-gold-light group-hover:bg-gold-light group-hover:text-deep sm:-rotate-45 sm:group-hover:rotate-0"><Icon name="arrow" size={17} /></span>
      </span>
    </Link>
  );
}

export function OffersGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {offers.map((o, i) => {
        const dark = i === 1;
        return (
          <Reveal key={o.id} delay={i * 90}>
            <div className={`lift group relative flex h-full flex-col gap-5 overflow-hidden p-8 ${dark ? "bg-forest text-cream" : "border border-line bg-cream"}`}>
              <span aria-hidden="true" className={`absolute -right-10 -top-10 h-32 w-32 rounded-full border transition-transform duration-700 group-hover:scale-150 ${dark ? "border-gold-light/30" : "border-gold/30"}`} />
              <Icon name={o.icon} size={30} stroke={1.2} className={dark ? "text-gold-light" : "text-gold-text"} />
              <span className={`text-sm font-semibold ${dark ? "text-gold-light" : "text-gold-text"}`}>{o.title}</span>
              <span className="font-display text-[56px] leading-none">{o.value}</span>
              <p className={`text-[15px] leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{o.text}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

const steps = [
  ["bag", "Build your cart", "Browse the collection and add the pieces, packages and quantities you need."],
  ["calendar", "Send your details", "Share your date, venue and guest numbers, and whether you'd like setup."],
  ["check", "We confirm", "We check availability and send your final quote, including delivery."],
  ["truck", "We deliver & style", "We set up before your event and collect once the celebration is over."],
] as const;

export function HowItWorks() {
  return (
    <div className="relative">
      <span aria-hidden="true" data-reveal="line" className="absolute left-0 right-0 top-8 hidden h-px bg-gold lg:block" />
      <ol data-stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([icon, t, b], i) => (
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
  );
}

/**
 * Closing call to action on every page: light and airy like the rest of the site, with the
 * signature arch photo beside one clear action. WhatsApp and phone sit beneath as quiet
 * contact tiles rather than competing buttons.
 */
export function CTABand({
  title = "Let's style your",
  accent = "next celebration",
  text = "Tell us your date and guest numbers, and we'll put together a quote with everything you need.",
  image = "/images/work/setup-20.jpg",
}: { title?: string; accent?: string; text?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-sage-soft">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -bottom-48 h-[520px] w-[520px] rounded-full border border-gold/25" />
      <div className="container-x relative grid items-center gap-14 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-32">
        <div data-reveal="zoom" className="relative mx-auto w-full max-w-[340px] lg:mx-0">
          <div aria-hidden="true" className="arch absolute inset-0 translate-x-4 -translate-y-4 border border-gold" />
          <div className="arch relative aspect-[4/5] bg-linen">
            <div data-parallax="0.06" className="absolute -inset-y-8 inset-x-0">
              <Image src={image} alt="" fill sizes="340px" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 data-reveal="up" className="h-display max-w-2xl text-[42px] text-forest md:text-6xl lg:text-[68px]">{title} {accent}</h2>
          <p data-reveal="up" style={{ ["--d" as string]: "120ms" }} className="lede max-w-xl">{text}</p>
          <div data-reveal="up" style={{ ["--d" as string]: "220ms" }}>
            <Link href="/quote/" className="btn btn-primary">Get a free quote<Icon name="arrow" size={16} /></Link>
          </div>
          <div data-stagger className="mt-2 grid w-full max-w-xl gap-3 sm:grid-cols-2">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-gold">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12805c] text-white"><WhatsAppIcon size={19} /></span>
              <span className="flex flex-col">
                <span className="font-semibold text-forest">WhatsApp us</span>
                <span className="text-sm text-muted">Send questions or venue photos</span>
              </span>
            </a>
            <a href={business.phoneHref} className="group flex items-center gap-4 rounded-2xl border border-line bg-cream p-4 transition-colors hover:border-gold">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold text-gold-text"><Icon name="phone" size={18} /></span>
              <span className="flex flex-col">
                <span className="font-semibold text-forest">Call {business.phoneLocal}</span>
                <span className="text-sm text-muted">{business.hours}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    ["tag", "Exact prices, upfront", "Every item shows its hire price, so you can plan before you enquire."],
    ["truck", "Delivered & set up", "We deliver, set up and collect. Delivery is quoted per job."],
    ["pin", "Sydney & South-West", "Servicing Sydney metro and the south-western suburbs."],
    ["heart", "Personal service", "Every booking is confirmed personally, so nothing is left to chance."],
  ] as const;
  return (
    <div data-stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([icon, t, b]) => (
        <div key={t} className="group flex flex-col gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold-text transition-colors duration-500 group-hover:bg-forest group-hover:text-gold-light"><Icon name={icon} size={26} stroke={1.2} /></span>
          <h3 className="font-display text-[26px] font-medium">{t}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{b}</p>
        </div>
      ))}
    </div>
  );
}

export function RotatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-36 w-36 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs><path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text fill="currentColor" fontSize="15.5" letterSpacing="5.2" className="font-sans uppercase">
          <textPath href="#badge-circle">Decor Events Hire · Wedding &amp; Event Décor ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center"><Sparkle size={26} className="text-gold" /></span>
    </div>
  );
}

export function Ribbon({ items, speed = "55s" }: { items: string[]; speed?: string }) {
  return (
    <section aria-label="Highlights" className="marquee-wrap overflow-hidden border-y border-line py-7">
      <div className="marquee" style={{ ["--speed" as string]: speed }}>
        {[...items, ...items].map((r, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-10 pr-10 font-display text-4xl text-forest/80 md:text-5xl">
            {r}<Sparkle size={16} className="text-gold" />
          </span>
        ))}
      </div>
    </section>
  );
}
