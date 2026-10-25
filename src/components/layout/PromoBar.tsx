"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { promo } from "@/data/site";
import { Icon, Sparkle } from "@/components/Icon";

const KEY = "deh-promo-dismissed";

export function PromoBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) setHidden(true); } catch {}
  }, []);

  if (hidden) return null;

  return (
    <div className="relative bg-forest text-[13px] tracking-[0.04em] text-linen">
      <div className="container-x flex min-h-11 items-center justify-center gap-x-4 gap-y-1 py-2 pr-12 text-center flex-wrap">
        <Sparkle size={13} className="hidden text-gold-light sm:block" />
        <span>{promo.text}</span>
        <Link href={promo.href} className="inline-flex min-h-10 items-center text-xs uppercase tracking-[0.16em] text-gold-light underline underline-offset-4 hover:text-cream">{promo.cta}</Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss offer banner"
        onClick={() => { setHidden(true); try { sessionStorage.setItem(KEY, "1"); } catch {} }}
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-linen hover:text-cream"
      >
        <Icon name="close" size={14} stroke={1.8} />
      </button>
    </div>
  );
}
