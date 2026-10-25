import type { Metadata } from "next";
import Image from "next/image";
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
                <span className="text-xs uppercase tracking-[0.22em] text-gold-text transition-colors group-hover:text-gold-light">{c.title}</span>
                <span className={`font-display text-xl leading-snug sm:text-2xl ${c.icon === "mail" ? "break-all" : "break-words"}`}>{c.value}</span>
              </>
            );
            const cls = "lift group flex h-full min-w-0 flex-col gap-4 border border-line bg-[#fffdf9] p-7 transition-colors duration-500 hover:bg-forest hover:text-cream";
            return (
              <Reveal key={c.title} delay={i * 90}>
                {c.href ? (c.href.startsWith("/") ? <Link href={c.href} className={cls}>{inner}</Link> : <a href={c.href} className={cls} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>) : <div className={cls}>{inner}</div>}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <div className="grid overflow-hidden bg-forest lg:grid-cols-[1fr_1.1fr]">
          <div className="relative hidden min-h-[640px] overflow-hidden lg:block">
            <Reveal variant="clip" className="absolute inset-0">
              <div data-parallax="0.06" className="absolute -inset-y-12 inset-x-0"><Image src="/images/work/setup-16.jpg" alt="" fill sizes="45vw" className="object-cover" /></div>
            </Reveal>
            <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" />
            <div className="absolute inset-x-10 bottom-10 flex flex-col gap-4 text-cream">
              <Image src="/images/brand/logo-light.png" alt="" width={777} height={471} className="h-24 w-auto self-start" />
              <p className="max-w-sm leading-relaxed text-mist">Prefer to build your order first? Add items to your quote cart and send everything in one go.</p>
              <Link href="/quote/" className="btn btn-gold self-start">Go to quote cart</Link>
            </div>
          </div>
          <Reveal className="m-2.5 bg-cream p-7 text-forest md:p-12">
            <ContactForm />
          </Reveal>
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
