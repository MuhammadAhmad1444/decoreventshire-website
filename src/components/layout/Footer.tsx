import Image from "@/components/Img";
import Link from "next/link";
import { business, categories, events, whatsappLink } from "@/data/site";
import { Icon, WhatsAppIcon } from "@/components/Icon";

// Secondary pages live in the slim bottom row, keeping the footer compact.
const company = [
  { label: "About us", href: "/about/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Delivery & service area", href: "/delivery/" },
  { label: "Areas we serve", href: "/areas/" },
  { label: "Hire terms", href: "/terms/" },
  { label: "Privacy", href: "/privacy/" },
];

export function Footer() {
  const linkCls = "text-mist transition-colors hover:text-gold-light";
  // Contact bar: the three ways to reach the business, set like the details on an invitation.
  const contacts = [
    { label: "Call", value: business.phoneLocal, href: business.phoneHref, icon: <Icon name="phone" size={16} /> },
    { label: "Email", value: business.email, href: `mailto:${business.email}`, icon: <Icon name="mail" size={16} /> },
    { label: "WhatsApp", value: "Message us", href: whatsappLink(), icon: <WhatsAppIcon size={16} />, external: true },
  ];
  return (
    <footer className="bg-deep text-cream">
      <div className="container-x">
        <div data-stagger className="grid border-b border-cream/10 sm:grid-cols-3">
          {contacts.map((c, i) => (
            <a
              key={c.label} href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex flex-col gap-2 py-7 sm:py-9 ${i > 0 ? "border-t border-cream/10 sm:border-l sm:border-t-0 sm:pl-8 lg:pl-12" : ""}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-gold-light">{c.icon}{c.label}</span>
              <span className="flex items-center gap-3 font-display text-[22px] leading-tight text-cream transition-colors group-hover:text-gold-light lg:text-[26px]">
                {c.value}
                <Icon name="arrow" size={16} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>

        <div data-stagger className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.9fr] lg:gap-12">
          <div className="flex flex-col gap-5">
            {/* Brand lockup: the original DEH monogram, unaltered, cropped so its wreath fills a round
                badge; a hairline gold divider; then the name and tagline. */}
            <Link href="/" aria-label={`${business.name}, home`} className="flex items-center gap-4">
              <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-[#fefdf9] ring-1 ring-gold/60 ring-offset-[3px] ring-offset-deep">
                <Image src="/images/brand/monogram.jpg" alt="" fill sizes="72px" className="scale-[1.18] object-cover object-[52%_58%]" />
              </span>
              <span aria-hidden="true" className="h-12 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
              <span className="flex flex-col gap-1.5">
                <span className="whitespace-nowrap font-display text-[24px] leading-none text-cream">Decor Events Hire</span>
                <span className="text-[13px] tracking-[0.06em] text-gold-light">{business.tagline}</span>
              </span>
            </Link>
            <p className="max-w-sm text-[15px] leading-relaxed text-mist">Elegant furniture and décor hire for weddings and celebrations, delivered, styled and collected.</p>
            <div className="flex flex-col gap-2 text-[15px] text-mist">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-gold-light"><Icon name="pin" size={16} className="mt-0.5 shrink-0 text-gold-light" />{business.addressLine}</a>
              <span className="flex items-start gap-3"><Icon name="truck" size={16} className="mt-0.5 shrink-0 text-gold-light" />{business.area}</span>
              <span className="flex items-start gap-3"><Icon name="clock" size={16} className="mt-0.5 shrink-0 text-gold-light" />{business.hours}</span>
            </div>
          </div>

          <nav aria-label="Hire" className="flex flex-col gap-2.5 text-[15px]">
            <span className="mb-1.5 font-display text-xl text-gold-light">Hire</span>
            {categories.map((c) => <Link key={c.slug} href={`/hire/${c.slug}/`} className={linkCls}>{c.name}</Link>)}
            <Link href="/packages/" className={linkCls}>Packages</Link>
          </nav>

          <nav aria-label="Events" className="flex flex-col gap-2.5 text-[15px]">
            <span className="mb-1.5 font-display text-xl text-gold-light">Events</span>
            {events.map((e) => <Link key={e.slug} href={`/events/${e.slug}/`} className={linkCls}>{e.name}</Link>)}
          </nav>

          <nav aria-label="Follow us" className="flex flex-col gap-2.5 text-[15px]">
            <span className="mb-1.5 font-display text-xl text-gold-light">Follow us</span>
            <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkCls}`}><Icon name="instagram" size={17} className="text-gold-light" />Instagram</a>
            <a href={business.socials.facebook} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkCls}`}><Icon name="facebook" size={17} className="text-gold-light" />Facebook</a>
            <Link href="/gallery/" className={`flex items-center gap-3 ${linkCls}`}><Icon name="arrow" size={17} className="text-gold-light" />Our gallery</Link>
            <a href={business.reviewUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkCls}`}><Icon name="star" size={17} className="text-gold-light" />Review us on Google</a>
          </nav>
        </div>
      </div>

      {/* Slim bottom row: copyright and secondary pages. */}
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-3 py-5 text-sm text-mist/80 lg:flex-row lg:items-center lg:justify-between">
          {/* The ABN shows once a real number replaces the "[ABN]" placeholder in site.ts. */}
          <span>© {new Date().getFullYear()} {business.name}{/^\d/.test(business.abn) && ` · ABN ${business.abn}`}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            {company.map((l) => <Link key={l.href} href={l.href} className="hover:text-gold-light">{l.label}</Link>)}
          </span>
        </div>
      </div>
    </footer>
  );
}
