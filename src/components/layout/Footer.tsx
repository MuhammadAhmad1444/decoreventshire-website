import Image from "next/image";
import Link from "next/link";
import { business, categories, events, whatsappLink } from "@/data/site";
import { Icon, WhatsAppIcon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="bg-deep text-mist">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label={`${business.name}, home`} className="flex items-center gap-4">
            <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-cream ring-1 ring-gold/40">
              <Image src="/images/brand/monogram.jpg" alt="" width={261} height={244} className="h-[88%] w-auto" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-brand text-2xl tracking-[0.05em] text-cream">Decor Events Hire</span>
              <span className="text-[10px] uppercase tracking-[0.34em] text-gold-light">{business.tagline}</span>
            </span>
          </Link>
          <p className="max-w-sm text-[15px] leading-relaxed">Elegant furniture and décor hire for weddings and celebrations across Sydney and the south-west. Delivered, styled and collected.</p>
          <div className="flex gap-2.5">
            {([["instagram", business.socials.instagram], ["facebook", business.socials.facebook], ["tiktok", business.socials.tiktok]] as const).map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3b4a3d] text-mist transition-colors hover:border-gold hover:text-gold-light">
                <Icon name={name} size={18} />
              </a>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3b4a3d] text-mist transition-colors hover:border-[#25D366] hover:text-[#25D366]">
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Hire" className="flex flex-col gap-3 text-[15px]">
          <span className="mb-2 text-xs uppercase tracking-[0.24em] text-gold-light">Hire</span>
          {categories.map((c) => (
            <Link key={c.slug} href={`/hire/${c.slug}/`} className="hover:text-gold-light">{c.name}</Link>
          ))}
          <Link href="/packages/" className="hover:text-gold-light">Packages</Link>
          <Link href="/offers/" className="hover:text-gold-light">Offers</Link>
        </nav>

        <nav aria-label="Events" className="flex flex-col gap-3 text-[15px]">
          <span className="mb-2 text-xs uppercase tracking-[0.24em] text-gold-light">Events</span>
          {events.map((e) => (
            <Link key={e.slug} href={`/events/${e.slug}/`} className="hover:text-gold-light">{e.name}</Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-[15px]">
          <span className="mb-2 text-xs uppercase tracking-[0.24em] text-gold-light">Contact</span>
          <span className="text-cream">{business.contactName}</span>
          <a href={business.phoneHref} className="flex items-center gap-3 hover:text-gold-light"><Icon name="phone" size={17} className="text-gold-light" />{business.phone}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-light"><WhatsAppIcon size={17} className="text-gold-light" />WhatsApp us</a>
          <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all hover:text-gold-light"><Icon name="mail" size={17} className="shrink-0 text-gold-light" />{business.email}</a>
          <span className="flex items-start gap-3"><Icon name="pin" size={17} className="mt-0.5 shrink-0 text-gold-light" />{business.area}</span>
          <span className="flex items-start gap-3"><Icon name="clock" size={17} className="mt-0.5 shrink-0 text-gold-light" />{business.hours}</span>
          <Link href="/quote/" className="btn btn-sm btn-gold mt-3 self-start">Get a Quote</Link>
        </div>
      </div>
      <div className="border-t border-[#334235]">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-[#aeb2a6] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {business.name} · ABN {business.abn}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/faq/" className="hover:text-gold-light">FAQs</Link>
            <Link href="/delivery/" className="hover:text-gold-light">Delivery & Service Area</Link>
            <Link href="/terms/" className="hover:text-gold-light">Hire Terms</Link>
            <Link href="/privacy/" className="hover:text-gold-light">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
