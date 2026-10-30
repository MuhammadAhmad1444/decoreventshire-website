"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getPackage, getProduct } from "@/data/site";

export type CartKind = "product" | "package";
export type CartItem = { kind: CartKind; slug: string; qty: number };

type Toast = { id: number; name: string; qty: number } | null;

type CartCtx = {
  items: CartItem[];
  ready: boolean;
  count: number;
  add: (kind: CartKind, slug: string, qty?: number) => void;
  setQty: (kind: CartKind, slug: string, qty: number) => void;
  remove: (kind: CartKind, slug: string) => void;
  clear: () => void;
  has: (kind: CartKind, slug: string) => boolean;
  toast: Toast;
  dismissToast: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "deh-quote-cart-v1";

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
        setItems(parsed.filter((i) => (i.kind === "product" ? getProduct(i.slug) : getPackage(i.slug)) && i.qty > 0));
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

  const add = useCallback((kind: CartKind, slug: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.kind === kind && i.slug === slug);
      if (found) return prev.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { kind, slug, qty }];
    });
    const name = kind === "product" ? getProduct(slug)?.name : getPackage(slug)?.name;
    setToast({ id: Date.now(), name: name ?? slug, qty });
  }, []);

  const setQty = useCallback((kind: CartKind, slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.kind === kind && i.slug === slug))
        : prev.map((i) => (i.kind === kind && i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((kind: CartKind, slug: string) => {
    setItems((prev) => prev.filter((i) => !(i.kind === kind && i.slug === slug)));
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      items, ready, add, setQty, remove,
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      has: (kind, slug) => items.some((i) => i.kind === kind && i.slug === slug),
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
    return { name: p.name, price: p.price, unit: p.unit, image: p.images[0], href: `/product/${p.slug}/` };
  }
  const p = getPackage(item.slug)!;
  return { name: p.name, price: p.price, unit: p.priceNote, image: p.image, href: `/packages/${p.slug}/` };
}
