"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { categories, products, type Product } from "@/data/site";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ui";

/** Editorial category list: hover a row and the photo on the right cross-fades. */
export function CategoryShowcase() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
      <ul className="border-t border-cream/15" data-stagger>
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          const on = i === active;
          return (
            <li key={c.slug} className="border-b border-cream/15">
              <Link
                href={`/hire/${c.slug}/`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-5 py-6 sm:gap-8 sm:py-7"
              >
                <span className={`w-8 font-display text-lg tabular-nums transition-colors ${on ? "text-gold-light" : "text-cream/40"}`}>0{i + 1}</span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className={`font-display text-[32px] leading-none transition-all duration-500 sm:text-[44px] ${on ? "translate-x-2 text-cream" : "text-cream/65"}`}>{c.name}</span>
                  <span className={`text-sm transition-all duration-500 ${on ? "text-mist opacity-100" : "text-mist/70 lg:opacity-0"}`}>{c.blurb}</span>
                </span>
                <span className="hidden text-xs uppercase tracking-[0.2em] text-cream/50 sm:block">{count} {count === 1 ? "item" : "items"}</span>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${on ? "border-gold-light bg-gold-light text-deep" : "border-cream/25 text-cream"}`}>
                  <Icon name="arrow" size={18} className={`transition-transform duration-500 ${on ? "" : "-rotate-45"}`} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="relative hidden lg:block" data-reveal="clip">
        <div className="sticky top-32 aspect-[4/5] overflow-hidden">
          {categories.map((c, i) => (
            <Image
              key={c.slug} src={c.image} alt="" fill sizes="45vw"
              className={`object-cover transition-all duration-[1100ms] ease-out ${i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />
          ))}
          <span className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-cream">
            <span className="font-display text-3xl">{categories[active].name}</span>
            <Link href={`/hire/${categories[active].slug}/`} className="text-xs uppercase tracking-[0.2em] text-gold-light underline underline-offset-4">Browse</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Horizontal, snap-scrolling product carousel with arrow controls. */
export function ProductCarousel({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };
  return (
    <div>
      <div className="mb-8 flex justify-end gap-2.5">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous items" className="flex h-12 w-12 rotate-180 items-center justify-center rounded-full border border-forest/25 transition-colors hover:border-forest hover:bg-forest hover:text-cream"><Icon name="arrow" size={18} /></button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next items" className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/25 transition-colors hover:border-forest hover:bg-forest hover:text-cream"><Icon name="arrow" size={18} /></button>
      </div>
      <div ref={ref} className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-6 sm:scroll-pl-6 lg:scroll-pl-12 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {items.map((p) => (
          <div key={p.slug} data-card className="w-[78%] shrink-0 snap-start sm:w-[320px]">
            <ProductCard product={p} compact />
          </div>
        ))}
        <Link href="/hire/" data-card className="group flex w-[78%] shrink-0 snap-start flex-col items-center justify-center gap-5 border border-dashed border-gold bg-linen text-center sm:w-[320px]">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold-text transition-transform duration-500 group-hover:scale-110"><Icon name="arrow" size={22} /></span>
          <span className="font-display text-3xl">View all {products.length} items</span>
          <span className="text-sm text-muted">Chairs, tables, linen, décor &amp; more</span>
        </Link>
      </div>
    </div>
  );
}
