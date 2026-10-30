"use client";

import { useState } from "react";
import { useCart, type CartKind } from "@/components/cart/CartProvider";
import { Icon } from "@/components/Icon";

export function QtyStepper({ value, onChange, label, size = "md", step = 1 }: { value: number; onChange: (v: number) => void; label: string; size?: "sm" | "md"; step?: number }) {
  const h = size === "sm" ? "h-12" : "h-14";
  return (
    <div className={`flex ${h} shrink-0 items-center rounded-2xl border border-line bg-white`}>
      <button type="button" onClick={() => onChange(Math.max(1, value - step))} aria-label={`Decrease ${label}`} className="flex h-full w-11 items-center justify-center text-forest hover:text-gold-text"><Icon name="minus" size={16} /></button>
      <input
        type="number" inputMode="numeric" min={1} value={value} aria-label={`${label} quantity`}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value || "1", 10) || 1))}
        className="h-full w-14 border-0 bg-transparent text-center text-[15px] [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => onChange(value + step)} aria-label={`Increase ${label}`} className="flex h-full w-11 items-center justify-center text-forest hover:text-gold-text"><Icon name="plus" size={16} /></button>
    </div>
  );
}

export function AddToQuote({ kind, slug, defaultQty = 1, size = "md", showQty = true, label = "Add to quote" }: { kind: CartKind; slug: string; defaultQty?: number; size?: "sm" | "md"; showQty?: boolean; label?: string }) {
  const { add, items } = useCart();
  const [qty, setQty] = useState(defaultQty);
  const inCart = items.find((i) => i.kind === kind && i.slug === slug);

  return (
    <div className="flex flex-wrap gap-2.5">
      {showQty && <QtyStepper value={qty} onChange={setQty} label={slug.replace(/-/g, " ")} size={size} />}
      {/* Wraps under the stepper when the card is too narrow for both on one row. */}
      <button type="button" onClick={() => add(kind, slug, qty)} className={`btn ${size === "sm" ? "btn-sm min-w-[172px] px-4" : "min-w-[190px]"} flex-1 whitespace-nowrap ${inCart ? "btn-primary" : "btn-outline"}`}>
        {inCart ? <><Icon name="check" size={16} stroke={2} />In quote ({inCart.qty})</> : label}
      </button>
    </div>
  );
}
