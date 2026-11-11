"use client";

import { useState } from "react";
import { formatPrice, whatsappLink, whatsappMessages, type Product } from "@/data/site";
import { AddToQuote } from "@/components/AddToQuote";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { GALLERY_SHOW } from "@/components/interactive";

/**
 * Price, size/colour picker, add-to-quote and WhatsApp button for a product page.
 * Picking an option changes the price shown, what goes in the quote cart and the photo.
 */
export function ProductBuy({ product: p }: { product: Product }) {
  const options = p.options ?? [];
  const [label, setLabel] = useState(options[0]?.label);
  const chosen = options.find((o) => o.label === label);
  const price = chosen ? chosen.price : p.price;
  const name = chosen ? `${p.name} – ${chosen.label}` : p.name;

  const pick = (l: string) => {
    setLabel(l);
    const img = options.find((o) => o.label === l)?.image;
    if (img) window.dispatchEvent(new CustomEvent(GALLERY_SHOW, { detail: img }));
  };

  return (
    <>
      <div className="fade-in flex items-baseline gap-3 border-b border-line pb-6" style={{ ["--d" as string]: "260ms" }}>
        <span className="font-display text-[56px] leading-none text-sage" aria-live="polite">{formatPrice(price)}</span>
        <span className="text-muted-2">{p.unit}{price != null ? ", hire only" : ""}</span>
      </div>

      {options.length > 0 && (
        <fieldset className="fade-in flex flex-col gap-3" style={{ ["--d" as string]: "300ms" }}>
          <legend className="mb-3 text-sm font-semibold text-forest">
            {p.optionLabel ?? "Option"}: <span className="font-normal text-muted">{label}</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {options.map((o) => {
              const on = o.label === label;
              return (
                <button
                  key={o.label} type="button" onClick={() => pick(o.label)} aria-pressed={on}
                  className={`min-h-12 rounded-2xl border px-4 py-2.5 text-left text-[15px] leading-tight transition-colors duration-300 ${on ? "border-forest bg-forest text-cream" : "border-line bg-white text-forest hover:border-gold"}`}
                >
                  {o.label}
                  {new Set(options.map((x) => x.price)).size > 1 && (
                    <span className={`block text-xs ${on ? "text-cream/80" : "text-muted-2"}`}>{formatPrice(o.price)}</span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <p className="fade-in text-[17px] leading-relaxed text-muted" style={{ ["--d" as string]: "340ms" }}>{p.description}</p>
      <ul className="fade-in grid gap-3 sm:grid-cols-2" style={{ ["--d" as string]: "420ms" }}>
        {p.details.map((d) => (
          <li key={d} className="flex items-start gap-3 text-[15px]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sage"><Icon name="check" size={12} stroke={2.2} /></span>{d}
          </li>
        ))}
      </ul>
      <div className="fade-in pt-2" style={{ ["--d" as string]: "500ms" }}>
        <AddToQuote key={label} kind="product" slug={p.slug} option={label} defaultQty={p.defaultQty ?? 1} label="Add to quote cart" />
        <a href={whatsappLink(whatsappMessages.product(name, `${formatPrice(price)} ${p.unit}`))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp-outline mt-2.5 w-full">
          <WhatsAppIcon size={18} />Ask about this item on WhatsApp
        </a>
      </div>
    </>
  );
}
