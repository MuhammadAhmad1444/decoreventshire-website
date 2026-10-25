"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, products, type CategorySlug } from "@/data/site";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ui";

export function FAQList({ items, initialOpen = 0 }: { items: { q: string; a: string }[]; initialOpen?: number }) {
  const [open, setOpen] = useState<number>(initialOpen);
  return (
    <div className="border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="flex min-h-[72px] w-full items-center justify-between gap-6 py-5 text-left font-display text-2xl leading-snug">
                {f.q}
                <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold text-gold-text transition-transform ${isOpen ? "rotate-45" : ""}`}><Icon name="plus" size={16} /></span>
              </button>
            </h3>
            <div id={`faq-${i}`} hidden={!isOpen} className="pb-7 pr-14 text-base leading-relaxed text-muted">{f.a}</div>
          </div>
        );
      })}
    </div>
  );
}

export function QuickQuote() {
  const router = useRouter();
  const [form, setForm] = useState({ date: "", type: "Wedding", suburb: "", guests: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams(Object.entries(form).filter(([, v]) => v));
    try { sessionStorage.setItem("deh-quick-quote", JSON.stringify(form)); } catch {}
    router.push(`/quote/?${q.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-sand bg-linen p-6 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end lg:p-8">
      <h2 className="font-display text-[28px] leading-tight sm:col-span-2 lg:col-span-5">Start your quote in 30 seconds</h2>
      <label className="label">Event date<input type="date" value={form.date} onChange={set("date")} className="field normal-case tracking-normal" /></label>
      <label className="label">Event type
        <select value={form.type} onChange={set("type")} className="field normal-case tracking-normal">
          {["Wedding", "Engagement", "Birthday", "Baby shower", "Christening", "Corporate", "Backyard party", "Other"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="label">Suburb<input type="text" value={form.suburb} onChange={set("suburb")} placeholder="e.g. Liverpool" className="field normal-case tracking-normal" /></label>
      <label className="label">Guests<input type="number" min={1} value={form.guests} onChange={set("guests")} placeholder="e.g. 80" className="field normal-case tracking-normal" /></label>
      <button type="submit" className="btn btn-primary h-13 sm:col-span-2 lg:col-span-1">Request a Quote</button>
    </form>
  );
}

export function Gallery({ images, columns = "md:columns-3" }: { images: { src: string; alt: string }[]; columns?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const move = useCallback((d: number) => setIndex((i) => (i == null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, close, move]);

  return (
    <>
      <div className={`columns-1 gap-4 sm:columns-2 ${columns} [&>*]:mb-4`}>
        {images.map((img, i) => (
          <button key={img.src + i} type="button" onClick={() => setIndex(i)} data-reveal="up" style={{ ["--d" as string]: `${(i % 4) * 90}ms` }} className="group relative block w-full overflow-hidden rounded-[2px] break-inside-avoid" aria-label={`Open photo: ${img.alt}`}>
            <Image src={img.src} alt={img.alt} width={900} height={1200} sizes="(max-width: 768px) 100vw, 33vw" className="img-zoom h-auto w-full" />
            <span className="absolute inset-0 flex items-center justify-center bg-deep/0 transition-colors duration-500 group-hover:bg-deep/35">
              <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-cream text-forest opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"><Icon name="plus" size={20} /></span>
            </span>
          </button>
        ))}
      </div>
      {index != null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[80] flex items-center justify-center bg-deep/95 p-4" onClick={(e) => e.target === e.currentTarget && close()}>
          <figure className="relative flex max-h-full max-w-5xl flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[index].src} alt={images[index].alt} className="max-h-[82vh] w-auto object-contain" />
            <figcaption className="text-center text-sm text-mist">{images[index].alt} · {index + 1} / {images.length}</figcaption>
          </figure>
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest"><Icon name="close" /></button>
          <button type="button" onClick={() => move(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-cream/90 text-forest"><Icon name="chevron" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-forest"><Icon name="chevron" /></button>
        </div>
      )}
    </>
  );
}

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function CatalogueBrowser({ initialCategory = "all" }: { initialCategory?: CategorySlug | "all" }) {
  const [cat, setCat] = useState<CategorySlug | "all">(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => (cat === "all" || p.category === cat) && (!q || `${p.name} ${p.short}`.toLowerCase().includes(q)));
    const price = (v: number | null) => (v == null ? Number.POSITIVE_INFINITY : v);
    if (sort === "price-asc") return [...filtered].sort((a, b) => price(a.price) - price(b.price));
    if (sort === "price-desc") return [...filtered].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
  }, [cat, query, sort]);

  const tabs: { slug: CategorySlug | "all"; name: string; count: number }[] = [
    { slug: "all", name: "All", count: products.length },
    ...categories.map((c) => ({ slug: c.slug, name: c.name, count: products.filter((p) => p.category === c.slug).length })),
  ];

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-4 flex flex-col gap-4 border-b border-line bg-cream/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:py-5">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t.slug} type="button" onClick={() => setCat(t.slug)} aria-pressed={cat === t.slug}
              className={`h-11 shrink-0 rounded-full border px-5 text-[12.5px] uppercase tracking-[0.12em] transition-colors ${cat === t.slug ? "border-forest bg-forest text-cream" : "border-[#d9cfbd] hover:border-forest"}`}
            >
              {t.name} <span className="opacity-70">({t.count})</span>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <label className="relative flex-1 lg:w-64">
            <span className="sr-only">Search hire items</span>
            <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-2" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items" className="field h-11 pl-11" />
          </label>
          <label>
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field h-11 w-auto pr-8">
              <option value="featured">Popular first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>
      <p className="mt-5 text-sm text-muted-2" aria-live="polite">Showing {list.length} {list.length === 1 ? "item" : "items"} · Prices are per item, hire only. Delivery quoted per job.</p>
      {list.length ? (
        <div key={`${cat}|${sort}|${query}`} className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <div key={p.slug} className="fade-in" style={{ ["--d" as string]: `${Math.min(i, 8) * 60}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center gap-4 bg-linen p-12 text-center">
          <p className="font-display text-3xl">Nothing matches “{query}”</p>
          <p className="text-muted">Try another search, or ask us. We may still be able to source it.</p>
          <button type="button" onClick={() => { setQuery(""); setCat("all"); }} className="btn btn-sm btn-outline">Clear filters</button>
        </div>
      )}
    </div>
  );
}

/** Product image gallery with thumbnails. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col gap-3.5">
      <div data-reveal="clip" className="group relative aspect-[4/5] overflow-hidden rounded-[2px] bg-linen">
        <Image key={images[i]} src={images[i]} alt={`${name}, photo ${i + 1}`} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="animate-fade-up object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 bg-cream/90 px-3 py-1.5 text-xs tabular-nums tracking-[0.16em] backdrop-blur">{i + 1} / {images.length}</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, n) => (
            <button key={src} type="button" onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-pressed={i === n} className={`relative aspect-square overflow-hidden rounded-[2px] border-2 ${i === n ? "border-gold" : "border-transparent"}`}>
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
