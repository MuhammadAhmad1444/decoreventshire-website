"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, categories, events, packages, whatsappLink } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { Icon, WhatsAppIcon } from "@/components/Icon";

type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

const nav: NavItem[] = [
  {
    label: "Hire Catalogue", href: "/hire/",
    children: [{ label: "All hire items", href: "/hire/" }, ...categories.map((c) => ({ label: c.name, href: `/hire/${c.slug}/`, note: c.blurb }))],
  },
  {
    label: "Packages", href: "/packages/",
    children: [{ label: "All packages", href: "/packages/" }, ...packages.map((p) => ({ label: p.name, href: `/packages/${p.slug}/`, note: p.guests }))],
  },
  {
    label: "Events", href: "/events/",
    children: events.map((e) => ({ label: e.name, href: `/events/${e.slug}/` })),
  },
  { label: "Offers", href: "/offers/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/** Routes whose page opens with a dark full-bleed hero (HeroSlideshow or PageHero). */
function hasDarkHero(pathname: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    p === "/" ||
    p.startsWith("/hire/") ||
    p === "/packages/" ||
    p.startsWith("/events/") ||
    ["/offers/", "/gallery/", "/delivery/", "/faq/"].includes(p)
  );
}

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Over a full-bleed dark hero the header floats transparently until you scroll.
  const overlay = hasDarkHero(pathname) && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
        overlay ? "border-b border-cream/15 bg-transparent" : "border-b border-sand bg-cream/95 shadow-[0_10px_40px_-12px_rgba(38,52,40,0.18)] backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4 lg:h-24">
        <Link href="/" aria-label={`${business.name}, home`} className="relative block h-16 w-[106px] shrink-0 lg:h-[84px] lg:w-[139px]">
          <Image src="/images/brand/logo-full.png" alt="" fill priority sizes="140px" className={`object-contain transition-opacity duration-500 ${overlay ? "opacity-0" : "opacity-100"}`} />
          <Image src="/images/brand/logo-light.png" alt="" fill priority sizes="140px" className={`object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-opacity duration-500 ${overlay ? "opacity-100" : "opacity-0"}`} />
        </Link>

        <nav aria-label="Main" className="hidden items-center xl:flex">
          {nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`relative flex h-12 items-center gap-1 whitespace-nowrap px-2.5 text-[12.5px] font-medium uppercase tracking-[0.13em] transition-colors 2xl:px-3.5 ${
                  overlay ? "text-cream hover:text-gold-light" : isActive(item.href) ? "text-gold-text" : "text-forest hover:text-gold-text"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
                {item.children && <Icon name="chevron" size={12} className="rotate-90 opacity-60 transition-transform group-hover:-rotate-90" />}
                <span aria-hidden="true" className={`absolute inset-x-2.5 bottom-1.5 h-px origin-left bg-current transition-transform duration-500 ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mt-1 border border-sand bg-cream p-3 shadow-[0_24px_60px_rgba(38,52,40,0.14)]">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block rounded-[2px] px-4 py-3 transition-colors hover:bg-linen">
                        <span className="block font-display text-xl leading-tight">{c.label}</span>
                        {c.note && <span className="mt-0.5 block text-[13px] leading-snug text-muted-2">{c.note}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={business.phoneHref} aria-label={`Call ${business.phoneLocal}`} title={`Call ${business.phoneLocal}`} className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-gold sm:flex ${overlay ? "border-cream/40 text-cream" : "border-sand text-forest"}`}>
            <Icon name="phone" size={18} />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp" className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors hover:border-[#12805c] hover:bg-[#12805c] hover:text-white sm:flex ${overlay ? "border-cream/40 text-cream" : "border-sand text-[#12805c]"}`}>
            <WhatsAppIcon size={19} />
          </a>
          <Link href="/quote/" aria-label={`Quote cart, ${ready ? count : 0} items`} className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors hover:border-gold ${overlay ? "border-cream/40 text-cream" : "border-sand text-forest"}`}>
            <Icon name="bag" />
            {ready && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-deep">{count > 999 ? "999+" : count}</span>
            )}
          </Link>
          <Link href="/quote/" className={`btn btn-sm hidden shrink-0 whitespace-nowrap sm:inline-flex ${overlay ? "btn-gold" : "btn-primary"}`}>Get a Quote</Link>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors xl:hidden ${overlay ? "border-cream/40 text-cream" : "border-sand text-forest"}`}>
            <Icon name="menu" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-[visibility] duration-300 xl:hidden ${open ? "visible" : "pointer-events-none invisible"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-deep/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <div role="dialog" aria-modal="true" aria-label="Menu" className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-cream shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex h-20 items-center justify-between border-b border-sand px-5">
            <Image src="/images/brand/logo-full.png" alt={business.name} width={777} height={471} className="h-14 w-auto" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-12 w-12 items-center justify-center rounded-full border border-sand">
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-3">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-sand/70">
                {item.children ? (
                  <>
                    <button type="button" onClick={() => setExpanded(expanded === item.href ? null : item.href)} aria-expanded={expanded === item.href} className="flex w-full items-center justify-between py-4 text-left font-display text-[26px]">
                      {item.label}
                      <Icon name="plus" size={18} className={`text-gold-text transition-transform ${expanded === item.href ? "rotate-45" : ""}`} />
                    </button>
                    {expanded === item.href && (
                      <div className="flex flex-col pb-3">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="py-2.5 pl-3 text-[15px] text-muted hover:text-forest">{c.label}</Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="block py-4 font-display text-[26px]">{item.label}</Link>
                )}
              </div>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-sand p-5">
            <Link href="/quote/" className="btn btn-primary w-full">Get a Quote</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full"><WhatsAppIcon size={18} />Chat on WhatsApp</a>
            <a href={business.phoneHref} className="btn btn-outline w-full"><Icon name="phone" size={18} />Call {business.phoneLocal}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
