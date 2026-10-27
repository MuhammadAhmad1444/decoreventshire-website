"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, categories, events, formatPrice, packages, products, whatsappLink } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { Icon, WhatsAppIcon } from "@/components/Icon";

type MenuEntry = { label: string; href: string; meta?: string; caption: string; image: string };
type PreviewSpec = { title: string; entries: MenuEntry[]; all: { label: string; href: string }; help: { label: string; href: string } };
type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[]; preview?: PreviewSpec };

const countFor = (slug: string) => {
  const n = products.filter((p) => p.category === slug).length;
  return `${n} ${n === 1 ? "item" : "items"}`;
};

const nav: NavItem[] = [
  {
    label: "Hire Catalogue", href: "/hire/",
    children: [{ label: "All hire items", href: "/hire/" }, ...categories.map((c) => ({ label: c.name, href: `/hire/${c.slug}/`, note: c.blurb }))],
    preview: {
      title: "Hire catalogue",
      entries: categories.map((c) => ({ label: c.name, href: `/hire/${c.slug}/`, meta: countFor(c.slug), caption: c.blurb, image: c.image })),
      all: { label: "Browse all items", href: "/hire/" },
      help: { label: "Not sure? Ask us", href: "/quote/" },
    },
  },
  {
    label: "Packages", href: "/packages/",
    children: [{ label: "All packages", href: "/packages/" }, ...packages.map((p) => ({ label: p.name, href: `/packages/${p.slug}/`, note: p.guests }))],
    preview: {
      title: "Styled packages",
      entries: packages.map((p) => ({ label: p.name, href: `/packages/${p.slug}/`, meta: `From ${formatPrice(p.price)}`, caption: `${p.guests}. ${p.short}`, image: p.image })),
      all: { label: "Compare packages", href: "/packages/" },
      help: { label: "Build your own instead", href: "/hire/" },
    },
  },
  {
    label: "Events", href: "/events/",
    children: events.map((e) => ({ label: e.name, href: `/events/${e.slug}/` })),
    preview: {
      title: "Events we style",
      entries: events.map((e) => ({ label: e.name, href: `/events/${e.slug}/`, caption: e.headline, image: e.image })),
      all: { label: "See all events", href: "/events/" },
      help: { label: "Ask for a recommendation", href: "/quote/" },
    },
  },
  { label: "Offers", href: "/offers/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/** Small gold arch over the current page's link (and on hover), echoing the arch frames. */
function ArchMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 h-[7px] w-3.5 -translate-x-1/2 rounded-t-full border border-b-0 border-gold transition-all duration-300 ${
        on ? "opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-60"
      }`}
    />
  );
}

/**
 * Dropdown used by every menu: an editorial list on the left beside one large arch photo that
 * changes with the row you point at, so only one photo shows at a time and nothing clashes.
 * It is anchored to the header row, so the panel starts exactly where the link ends.
 */
function PreviewMenu({ spec, off, onPick }: { spec: PreviewSpec; off: boolean; onPick: () => void }) {
  const [active, setActive] = useState(0);
  const current = spec.entries[active];
  return (
    <div
      onClick={(e) => { if ((e.target as HTMLElement).closest("a")) onPick(); }}
      className={`invisible absolute inset-x-0 top-full z-50 translate-y-2 opacity-0 transition-all duration-300 ${
        off ? "" : "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      }`}
    >
      <div className="mx-auto grid max-w-[920px] grid-cols-[1.15fr_0.85fr] gap-12 rounded-b-3xl border border-t-0 border-sand bg-cream py-9 pl-10 pr-12 shadow-[0_30px_60px_-20px_rgba(30,42,34,0.25)]">
        <div className="flex flex-col">
          <p className="eyebrow mb-3">{spec.title}</p>
          <ul className="border-t border-line">
            {spec.entries.map((e, i) => {
              const on = i === active;
              return (
                <li key={e.href} className="border-b border-line">
                  <Link href={e.href} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="flex items-center gap-4 py-3">
                    <span className={`flex-1 font-display text-[21px] leading-tight transition-all duration-300 ${on ? "translate-x-1.5 text-gold-text" : "text-forest"}`}>{e.label}</span>
                    {e.meta && <span className="whitespace-nowrap text-sm text-muted-2">{e.meta}</span>}
                    <Icon name="arrow" size={15} className={`shrink-0 transition-all duration-300 ${on ? "text-gold-text opacity-100" : "-translate-x-1 opacity-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center gap-6">
            <Link href={spec.all.href} className="btn btn-sm btn-primary min-h-11">{spec.all.label}</Link>
            <Link href={spec.help.href} className="link-u">{spec.help.label}</Link>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="relative mx-auto w-full max-w-[290px]">
            <div aria-hidden="true" className="arch absolute inset-0 translate-x-3 -translate-y-3 border border-gold/70" />
            <div className="arch relative aspect-[4/5] bg-linen">
              {spec.entries.map((e, i) => (
                <Image key={e.href} src={e.image} alt="" fill sizes="290px" className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
          </div>
          <p key={current.href} className="fade-in mx-auto mt-5 max-w-[290px] text-center text-sm leading-relaxed text-muted">{current.caption}</p>
        </div>
      </div>
    </div>
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

  // Dropdowns open on hover and keyboard focus. After a pick they must close even though the
  // pointer and focus are still on the link, so `menuOff` holds them shut until the pointer
  // leaves that menu.
  const [menuOff, setMenuOff] = useState(false);
  const closeMenus = () => {
    setMenuOff(true);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const cartLabel = `Quote cart, ${ready ? count : 0} items`;

  const bag = (
    <Link href="/quote/" aria-label={cartLabel} className="relative flex h-11 w-11 items-center justify-center rounded-full border border-sand text-forest transition-colors hover:border-gold">
      <Icon name="bag" />
      {ready && count > 0 && (
        <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-deep">{count > 999 ? "999+" : count}</span>
      )}
    </Link>
  );

  const navLink = (item: NavItem) => (
    <Link
      href={item.href}
      onClick={item.preview ? closeMenus : undefined}
      aria-current={isActive(item.href) ? "page" : undefined}
      className={`flex h-[68px] items-center gap-1 whitespace-nowrap px-3 text-[15px] font-medium transition-colors 2xl:px-4 ${isActive(item.href) ? "text-gold-text" : "text-forest hover:text-gold-text"}`}
    >
      {/* Full-height link: the dropdown starts exactly where the link ends, so the pointer never crosses a gap. */}
      <span className="relative"><ArchMark on={isActive(item.href)} />{item.label}</span>
      {item.children && <Icon name="chevron" size={11} className="rotate-90 opacity-50 transition-transform group-hover:-rotate-90" />}
    </Link>
  );

  const navItem = (item: NavItem) =>
    item.preview ? (
      // Not relative: the panel positions against the header row so it spans the page centre.
      <div key={item.href} className="group" onMouseLeave={() => setMenuOff(false)}>
        {navLink(item)}
        <PreviewMenu spec={item.preview} off={menuOff} onPick={closeMenus} />
      </div>
    ) : (
      <div key={item.href}>{navLink(item)}</div>
    );

  return (
    <header
      // While the drawer is open the header (its stacking context) must sit above the bottom action bar.
      className={`sticky top-0 ${open ? "z-50" : "z-40"} transition-[box-shadow,border-color] duration-500 ${
        scrolled ? "border-b border-sand shadow-[0_10px_40px_-12px_rgba(30,42,34,0.18)]" : "border-b border-sand/70"
      }`}
    >
      {/* The blur lives on its own layer: backdrop-filter on the header itself would trap the
          fixed mobile drawer inside the header's box. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cream/95 backdrop-blur-md" />
      {/* Desktop: one slim row. Logo, menu, then contact and quote actions. The row is the
          positioning box for the full-width Hire Catalogue photo menu. */}
      <div className="container-x relative hidden h-[68px] items-center justify-between gap-6 xl:flex">
        <Link href="/" aria-label={`${business.name}, home`} className="relative block h-[56px] w-[92px] shrink-0">
          <Image src="/images/brand/logo-full.png" alt="" fill priority sizes="92px" className="object-contain" />
        </Link>

        <nav aria-label="Main" className="flex items-center">{nav.map(navItem)}</nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <div className="group relative">
            <button type="button" aria-haspopup="true" aria-label="Talk to us" className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-sand px-3 text-sm font-semibold text-forest transition-colors hover:border-gold 2xl:px-4">
              <Icon name="phone" size={16} /><span className="hidden 2xl:inline">Talk to us</span>
            </button>
            <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="flex w-[260px] flex-col gap-1 rounded-3xl border border-sand bg-cream p-2 shadow-[0_24px_60px_rgba(30,42,34,0.14)]">
                <a href={business.phoneHref} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-linen"><Icon name="phone" size={17} className="text-gold-text" />Call {business.phoneLocal}</a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-linen"><span className="text-[#12805c]"><WhatsAppIcon size={17} /></span>Chat on WhatsApp</a>
              </div>
            </div>
          </div>
          {bag}
          <Link href="/quote/" className="btn btn-sm btn-primary min-h-11 whitespace-nowrap">Get a quote</Link>
        </div>
      </div>

      {/* Phones and tablets: menu left, logo centred, quote bag right. */}
      <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center xl:hidden">
        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="flex h-11 w-11 items-center justify-center justify-self-start rounded-full text-forest hover:bg-linen">
          <Icon name="menu" />
        </button>
        <Link href="/" aria-label={`${business.name}, home`} className="relative block h-[50px] w-[82px]">
          <Image src="/images/brand/logo-full.png" alt="" fill priority sizes="82px" className="object-contain" />
        </Link>
        <div className="flex items-center gap-2 justify-self-end">
          <Link href="/quote/" className="btn btn-sm btn-primary hidden min-h-10 whitespace-nowrap md:inline-flex">Get a quote</Link>
          {bag}
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-[visibility] duration-300 xl:hidden ${open ? "visible" : "pointer-events-none invisible"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-deep/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <div role="dialog" aria-modal="true" aria-label="Menu" className={`absolute left-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-cream shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-20 items-center justify-between border-b border-sand px-5">
            <Image src="/images/brand/logo-full.png" alt={business.name} width={92} height={56} className="h-14 w-auto" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-sand">
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
