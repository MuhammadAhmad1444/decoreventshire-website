"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, formatPrice, gallery, products, type Product } from "@/data/site";
import { Icon } from "@/components/Icon";
import { AddToQuote } from "@/components/AddToQuote";

/**
 * Editorial category list beside the signature arch. Every row always shows its description so
 * rows stay even; the active row is marked by a gold line growing down its left edge, and the
 * arch photo and caption on the right follow it.
 */
export function CategoryShowcase() {
  const [active, setActive] = useState(0);
  const current = categories[active];
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
      <ul className="border-t border-cream/15" data-stagger>
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          const on = i === active;
          return (
            <li key={c.slug} className="relative border-b border-cream/15">
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-px origin-top bg-gold-light transition-transform duration-500 ${on ? "scale-y-100" : "scale-y-0"}`} />
              <Link
                href={`/hire/${c.slug}/`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 pl-6 sm:grid-cols-[1fr_auto_auto] sm:pl-8"
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className={`font-display text-[30px] leading-none transition-colors duration-300 sm:text-[38px] ${on ? "text-cream" : "text-cream/75"}`}>{c.name}</span>
                  <span className={`text-sm leading-snug transition-colors duration-300 ${on ? "text-mist" : "text-mist/60"}`}>{c.blurb}</span>
                </span>
                <span className={`hidden text-sm font-semibold transition-colors duration-300 sm:block ${on ? "text-gold-light" : "text-gold-light/60"}`}>{count} {count === 1 ? "item" : "items"}</span>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${on ? "border-gold-light bg-gold-light text-deep" : "border-cream/25 text-cream/80"}`}>
                  <Icon name="arrow" size={17} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden lg:block">
        <div className="sticky top-28 mx-auto max-w-[420px]" data-reveal="zoom" style={{ ["--d" as string]: "200ms" }}>
          <div className="relative">
            <div aria-hidden="true" className="arch absolute inset-0 translate-x-5 -translate-y-5 border border-gold-light/60" />
            <div className="arch relative aspect-[4/5] bg-deep">
              {categories.map((c, i) => (
                <Image
                  key={c.slug} src={c.image} alt="" fill sizes="420px"
                  className={`object-cover transition-all duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                />
              ))}
            </div>
          </div>
          <div key={current.slug} className="fade-in mt-8 flex items-end justify-between gap-6 border-t border-cream/15 pt-5">
            <div>
              <p className="font-display text-[28px] leading-none text-cream">{current.name}</p>
              <p className="mt-2 text-sm text-mist/80">{current.blurb}</p>
            </div>
            <Link href={`/hire/${current.slug}/`} className="flex shrink-0 items-center gap-2 text-sm font-semibold text-gold-light hover:text-cream">
              Browse {current.name.toLowerCase()}<Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Gallery-style card for the moving strip: just the photo, category, name and price, so the
 * strip reads like a showcase rather than a form. Quantity and "Add to quote" slide up over the
 * photo on hover or keyboard focus (and stay shown on touch screens, which cannot hover).
 */
function StripCard({ product }: { product: Product }) {
  const href = `/product/${product.slug}/`;
  const category = categories.find((c) => c.slug === product.category)?.name;
  return (
    <article className="group/card w-[260px] shrink-0 sm:w-[300px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-linen shadow-[0_24px_44px_-30px_rgba(30,42,34,0.55)] transition-all duration-500 ease-out group-hover/card:-translate-y-1.5 group-hover/card:shadow-[0_36px_60px_-30px_rgba(30,42,34,0.6)]">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image src={product.images[0]} alt="" fill sizes="300px" className="object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-105" />
        </Link>
        {product.popular && <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-forest">Popular</span>}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 rounded-2xl bg-cream/95 p-3 opacity-0 shadow-lg backdrop-blur transition-all duration-500 ease-out group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <AddToQuote kind="product" slug={product.slug} defaultQty={product.defaultQty ?? 1} size="sm" />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          {category && <p className="text-xs font-semibold text-sage">{category}</p>}
          <Link href={href} className="mt-1 block font-display text-[22px] leading-tight text-forest transition-colors hover:text-gold-text">{product.name}</Link>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-lg font-semibold text-forest">{formatPrice(product.price)}</span>
          <span className="block text-xs text-muted-2">{product.unit}</span>
        </p>
      </div>
    </article>
  );
}

/** Product strip on the home page: a slow, endless drift of StripCards. */
export function ProductCarousel({ items }: { items: Product[] }) {
  // One run of cards, rendered twice so the strip loops seamlessly. The copy stays clickable
  // (half the time it is the part on screen) but is hidden from screen readers and taken out
  // of the tab order, so keyboard users meet each product once. Not `inert`: that would also
  // block the mouse.
  const copyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    copyRef.current?.querySelectorAll("a, button, input").forEach((el) => el.setAttribute("tabindex", "-1"));
  }, []);
  const run = (copy: boolean) => (
    <div ref={copy ? copyRef : undefined} className="flex shrink-0 gap-7 pr-7" aria-hidden={copy || undefined}>
      {items.map((p) => <StripCard key={p.slug} product={p} />)}
      <Link href="/hire/" className="group/all flex w-[260px] shrink-0 flex-col sm:w-[300px]">
        <span className="flex aspect-[4/5] flex-col items-center justify-center gap-5 rounded-[26px] border border-gold/60 bg-sage-soft p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold-text transition-transform duration-500 group-hover/all:scale-110"><Icon name="arrow" size={22} /></span>
          <span className="font-display text-3xl leading-tight">View all {products.length} items</span>
          <span className="text-sm text-muted">Chairs, tables, linen, décor and more</span>
        </span>
      </Link>
    </div>
  );

  return (
    // Drifts slowly left to right on its own and pauses while you point at or tab into a card,
    // so choosing a quantity is never a race. Soft fades at both edges instead of a hard cut.
    <div data-reveal="up" className="marquee-wrap overflow-hidden pb-4 pt-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="drift" style={{ ["--speed" as string]: "90s" }}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

/**
 * Recent work: one photo framed in the signature arch with its description set like a
 * place card, beside a grid of thumbnails that choose which setup the arch shows.
 */
export function GalleryShowcase() {
  const items = gallery.slice(0, 8);
  const [active, setActive] = useState(0);
  const current = items[active];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div className="relative mx-auto w-full max-w-[440px] lg:mx-0" data-reveal="zoom">
        <div aria-hidden="true" className="arch absolute inset-0 translate-x-3 -translate-y-3 border border-gold sm:translate-x-5 sm:-translate-y-5" />
        <div className="arch relative aspect-[4/5] bg-linen">
          {items.map((g, i) => (
            <Image
              key={g.src} src={g.src} alt={i === active ? g.alt : ""} fill sizes="(max-width: 1024px) 90vw, 440px"
              className={`object-cover transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8" data-reveal="up" style={{ ["--d" as string]: "200ms" }}>
        {/* Place card: the photo's description, updated as you pick a thumbnail. */}
        <figure className="rounded-3xl border border-line bg-white px-7 py-6" aria-live="polite">
          <span className="text-sm font-semibold text-sage">Setup {active + 1} of {items.length}</span>
          <figcaption key={current.src} className="fade-in mt-2 font-display text-2xl leading-snug text-forest md:text-[28px]">{current.alt}</figcaption>
        </figure>

        <div className="grid grid-cols-4 gap-3 sm:gap-4" role="group" aria-label="Choose a setup">
          {items.map((g, i) => (
            <button
              key={g.src} type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
              aria-label={g.alt} aria-pressed={i === active}
              className={`relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${i === active ? "ring-2 ring-gold ring-offset-4 ring-offset-cream" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={g.src} alt="" fill sizes="(max-width: 640px) 22vw, 140px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
