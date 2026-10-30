"use client";

import Image from "@/components/Img";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, products, type CategorySlug } from "@/data/site";
import imageSizes from "@/data/image-sizes.json";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ui";
import imageLoader from "@/lib/image-loader";

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

/**
 * Photo board: photos keep their true shape in tight flowing columns, with no captions or
 * badges, so the pictures carry the page. A gentle zoom on hover; click opens the viewer.
 */
export function Gallery({ images, columns = "lg:columns-3" }: { images: { src: string; alt: string }[]; columns?: string }) {
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
      <div className={`columns-2 gap-3 sm:gap-4 ${columns}`}>
        {images.map((img, i) => {
          const [w, h] = (imageSizes as Record<string, number[]>)[img.src] ?? [900, 1200];
          return (
            <button
              key={img.src + i} type="button" onClick={() => setIndex(i)} aria-label={`Open photo: ${img.alt}`}
              data-reveal="up" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
              className="group mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-md bg-linen sm:mb-4"
            >
              <Image src={img.src} alt={img.alt} width={w} height={h} sizes="(max-width: 1024px) 50vw, 33vw" className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            </button>
          );
        })}
      </div>

      {index != null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[80] flex items-center justify-center bg-deep/95 p-4 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && close()}>
          <span className="absolute left-4 top-4 rounded-full bg-cream/10 px-4 py-2 text-sm text-mist">{index + 1} / {images.length}</span>
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest"><Icon name="close" /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={index} src={imageLoader({ src: images[index].src, width: 1920 })} alt={images[index].alt} className="fade-in max-h-[86vh] w-auto max-w-full rounded-md object-contain" style={{ ["--d" as string]: "0ms" }} />
          <button type="button" onClick={() => move(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-cream/90 text-forest hover:bg-cream"><Icon name="chevron" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-forest hover:bg-cream"><Icon name="chevron" /></button>
        </div>
      )}
    </>
  );
}

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: Sort; label: string }[] = [
  { value: "featured", label: "Popular first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

/**
 * Sort control styled to match the site (a native <select> list cannot be styled). Works as a
 * listbox: click or Enter/Space/Arrow Down opens it, arrows move, Enter picks, Escape or a
 * click outside closes.
 */
function SortMenu({ value, onChange }: { value: Sort; onChange: (v: Sort) => void }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((o) => o.value === value) ?? sortOptions[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openMenu = () => { setHi(sortOptions.findIndex((o) => o.value === value)); setOpen(true); };
  const pick = (v: Sort) => { onChange(v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(sortOptions.length - 1, h + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(sortOptions[hi].value); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button" onClick={() => (open ? setOpen(false) : openMenu())} onKeyDown={onKey}
        aria-haspopup="listbox" aria-expanded={open} aria-label={`Sort by: ${current.label}`}
        className={`flex h-11 items-center gap-2 whitespace-nowrap rounded-full border bg-white pl-5 pr-4 text-sm transition-colors ${open ? "border-gold" : "border-line hover:border-gold"}`}
      >
        <span className="text-muted-2">Sort:</span>
        <span className="font-semibold text-forest">{current.label}</span>
        <Icon name="chevron" size={12} className={`text-gold-text transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
      <ul
        role="listbox" aria-label="Sort by"
        className={`absolute right-0 top-full z-30 mt-2 w-56 origin-top-right rounded-2xl border border-line bg-cream p-1.5 shadow-[0_24px_50px_-20px_rgba(30,42,34,0.35)] transition-all duration-200 ${open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}
      >
        {sortOptions.map((o, i) => {
          const selected = o.value === value;
          return (
            <li
              key={o.value} role="option" aria-selected={selected}
              onMouseEnter={() => setHi(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(o.value)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors ${i === hi ? "bg-linen" : ""} ${selected ? "font-semibold text-forest" : "text-muted"}`}
            >
              {o.label}
              {selected && <Icon name="check" size={15} stroke={2} className="text-gold-text" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

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
      {/* Sticks under the header while browsing. Row 1: category tabs on one line (swipeable on
          phones). Row 2: result count beside search and sort. */}
      <div className="sticky top-16 z-20 -mx-4 bg-cream/95 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 xl:top-[68px] lg:mx-0 lg:px-0">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2.5 overflow-x-auto border-b border-line px-4 pb-4 pt-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = cat === t.slug;
            return (
              <button
                key={t.slug} type="button" onClick={() => setCat(t.slug)} aria-pressed={on}
                className={`flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border pl-5 pr-2 text-sm font-semibold transition-all duration-300 ${
                  on ? "border-forest bg-forest text-cream shadow-[0_10px_24px_-12px_rgba(30,42,34,0.6)]" : "border-line bg-white text-forest hover:border-gold"
                }`}
              >
                {t.name}
                <span className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs ${on ? "bg-gold text-deep" : "bg-sage-soft text-muted"}`}>{t.count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-2" aria-live="polite">Showing {list.length} {list.length === 1 ? "item" : "items"}. Prices are per item, hire only; delivery is quoted per job.</p>
          <div className="flex gap-3">
            <label className="relative flex-1 sm:w-60 sm:flex-none">
              <span className="sr-only">Search hire items</span>
              <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-2" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search items" className="field h-11 rounded-full pl-11" />
            </label>
            <SortMenu value={sort} onChange={setSort} />
          </div>
        </div>
      </div>
      {list.length ? (
        <div key={`${cat}|${sort}|${query}`} className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <div key={p.slug} className="fade-in" style={{ ["--d" as string]: `${Math.min(i, 8) * 60}ms` }}>
              <ProductCard product={p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" />
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
      <div data-reveal="clip" className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-linen">
        <Image key={images[i]} src={images[i]} alt={`${name}, photo ${i + 1}`} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="animate-fade-up object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 bg-cream/90 px-3 py-1.5 text-xs tabular-nums tracking-[0.16em] backdrop-blur">{i + 1} / {images.length}</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, n) => (
            <button key={src} type="button" onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-pressed={i === n} className={`relative aspect-square overflow-hidden rounded-2xl border-2 ${i === n ? "border-gold" : "border-transparent"}`}>
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
