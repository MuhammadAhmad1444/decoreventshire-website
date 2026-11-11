"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getOption, getPackage, getProduct } from "@/data/site";

export type CartKind = "product" | "package";
/** `option` is the chosen size or colour, for products that have options. */
export type CartItem = { kind: CartKind; slug: string; qty: number; option?: string };

type Toast = { id: number; name: string; qty: number } | null;

type CartCtx = {
  items: CartItem[];
  ready: boolean;
  count: number;
  add: (kind: CartKind, slug: string, qty?: number, option?: string) => void;
  setQty: (kind: CartKind, slug: string, qty: number, option?: string) => void;
  remove: (kind: CartKind, slug: string, option?: string) => void;
  clear: () => void;
  has: (kind: CartKind, slug: string, option?: string) => boolean;
  toast: Toast;
  dismissToast: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "deh-quote-cart-v1";

const same = (i: CartItem, kind: CartKind, slug: string, option?: string) => i.kind === kind && i.slug === slug && (i.option ?? "") === (option ?? "");

/** Whether a saved cart line still matches the catalogue (product exists, option still offered). */
function stillValid(i: CartItem) {
  if (i.kind === "package") return !!getPackage(i.slug);
  const p = getProduct(i.slug);
  if (!p) return false;
  return p.options?.length ? !!getOption(p, i.option) : !i.option;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        // Drop anything no longer in the catalogue.
        setItems(parsed.filter((i) => stillValid(i) && i.qty > 0));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((kind: CartKind, slug: string, qty = 1, option?: string) => {
    setItems((prev) => {
      const found = prev.find((i) => same(i, kind, slug, option));
      if (found) return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { kind, slug, qty, ...(option && { option }) }];
    });
    const name = kind === "product" ? getProduct(slug)?.name : getPackage(slug)?.name;
    setToast({ id: Date.now(), name: `${name ?? slug}${option ? ` – ${option}` : ""}`, qty });
  }, []);

  const setQty = useCallback((kind: CartKind, slug: string, qty: number, option?: string) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !same(i, kind, slug, option))
        : prev.map((i) => (same(i, kind, slug, option) ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((kind: CartKind, slug: string, option?: string) => {
    setItems((prev) => prev.filter((i) => !same(i, kind, slug, option)));
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      items, ready, add, setQty, remove,
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      has: (kind, slug, option) => items.some((i) => same(i, kind, slug, option)),
      toast,
      dismissToast: () => setToast(null),
    }),
    [items, ready, add, setQty, remove, toast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function lineInfo(item: CartItem) {
  if (item.kind === "product") {
    const p = getProduct(item.slug)!;
    const o = getOption(p, item.option);
    return {
      name: o ? `${p.name} – ${o.label}` : p.name,
      price: o ? o.price : p.price,
      unit: p.unit,
      image: o?.image ?? p.images[0],
      href: `/product/${p.slug}/`,
    };
  }
  const p = getPackage(item.slug)!;
  return { name: p.name, price: p.price, unit: p.priceNote, image: p.image, href: `/packages/${p.slug}/` };
}
