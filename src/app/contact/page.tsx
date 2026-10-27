import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { business, faqs, whatsappLink } from "@/data/site";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { WordReveal } from "@/components/Motion";
import { ContactForm } from "@/components/ContactForm";
import { FAQList } from "@/components/interactive";
import { Breadcrumbs, Eyebrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${business.name} for wedding and event hire in Sydney. Call ${business.phoneLocal} or email ${business.email}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const cards = [
    { icon: "phone", title: "Call or text", value: business.phone, href: business.phoneHref },
    { icon: "whatsapp", title: "WhatsApp", value: "Chat with us", href: whatsappLink() },
    { icon: "mail", title: "Email", value: business.email, href: `mailto:${business.email}` },
    { icon: "pin", title: "Service area", value: business.area, href: "/delivery/" },
    { icon: "clock", title: "Hours", value: business.hours },
  ];
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full border border-gold/15" />
        <div className="container-x relative flex flex-col gap-7 pb-14 pt-10 lg:pb-20 lg:pt-16">
          <div className="fade-in text-muted-2"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /></div>
          <p className="fade-in flex items-center gap-4 eyebrow" style={{ ["--d" as string]: "100ms" }}><span className="h-px w-12 bg-gold" />Contact</p>
          <h1 className="h-display max-w-4xl text-[50px] md:text-7xl lg:text-[88px]">
            <WordReveal text="Let's talk about" delay={150} /> <em className="text-sage"><WordReveal text="your event." delay={400} /></em>
          </h1>
          <p className="fade-in lede max-w-2xl" style={{ ["--d" as string]: "650ms" }}>Questions about sizes, colours or quantities? Get in touch, or send a quote request with your items for the fastest reply.</p>
          <div className="fade-in flex flex-wrap gap-3" style={{ ["--d" as string]: "800ms" }}>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp"><WhatsAppIcon size={18} />Chat on WhatsApp</a>
            <Link href="/quote/" className="btn btn-outline">Request a quote</Link>
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold-text transition-colors duration-500 group-hover:border-gold-light group-hover:bg-gold-light group-hover:text-deep">{c.icon === "whatsapp" ? <WhatsAppIcon size={22} /> : <Icon name={c.icon} size={22} stroke={1.3} />}</span>
                <span className="text-sm font-semibold text-gold-text transition-colors group-hover:text-gold-light">{c.title}</span>
                <span className={`font-display text-xl leading-snug sm:text-2xl ${c.icon === "mail" ? "break-all" : "break-words"}`}>{c.value}</span>
              </>
            );
            const cls = "lift group flex h-full min-w-0 flex-col gap-4 border border-line bg-white p-7 transition-colors duration-500 hover:bg-forest hover:text-cream";
            return (
              <Reveal key={c.title} delay={i * 90}>
                {c.href ? (c.href.startsWith("/") ? <Link href={c.href} className={cls}>{inner}</Link> : <a href={c.href} className={cls} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>) : <div className={cls}>{inner}</div>}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <div data-reveal="up" className="grid overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_40px_80px_-40px_rgba(30,42,34,0.45)] lg:grid-cols-[1fr_1.1fr]">
          {/* Photo side: event photos cross-fade with a slow zoom (pure CSS, see .cycle-img). */}
          <div className="relative min-h-[420px] overflow-hidden bg-deep lg:min-h-[680px]">
            {["/images/work/setup-16.jpg", "/images/work/setup-20.jpg", "/images/work/setup-12.jpg", "/images/work/setup-02.jpg"].map((src, i) => (
              <div key={src} className="cycle-img absolute inset-0" style={{ ["--i" as string]: i }}>
                <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority={i === 0} />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/50 to-deep/0" />
            <div className="absolute inset-x-8 bottom-8 flex flex-col gap-5 text-cream md:inset-x-10 md:bottom-10">
              <p className="text-sm font-semibold text-gold-light">Prefer to plan it yourself?</p>
              <h2 className="font-display text-[34px] leading-[1.05] md:text-[42px]">Build your quote cart</h2>
              <p className="max-w-sm leading-relaxed text-mist">Add the chairs, tables and décor you like, then send everything in one request.</p>
              <Link href="/quote/" className="btn btn-primary self-start">Go to quote cart<Icon name="arrow" size={16} /></Link>
              <div className="mt-2 flex flex-col gap-2 border-t border-cream/15 pt-5 text-[15px] text-mist sm:flex-row sm:gap-8">
                <a href={business.phoneHref} className="flex items-center gap-2.5 hover:text-gold-light"><Icon name="phone" size={16} className="text-gold-light" />{business.phoneLocal}</a>
                <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 hover:text-gold-light"><Icon name="mail" size={16} className="text-gold-light" />{business.email}</a>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12 lg:p-14">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container-x grid gap-14 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:pb-32">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Before you ask</Eyebrow>
          <h2 data-reveal="up" className="h-section">Quick answers</h2>
          <Reveal className="flex flex-wrap gap-3">
            <Link href="/faq/" className="btn btn-outline">All FAQs</Link>
            <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Icon name="instagram" size={18} />Instagram</a>
          </Reveal>
        </div>
        <Reveal><FAQList items={faqs.slice(0, 5)} /></Reveal>
      </section>
    </>
  );
}
