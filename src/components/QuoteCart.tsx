"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { business, formatPrice, packages, whatsappLink } from "@/data/site";
import { lineInfo, useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/AddToQuote";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/ui";
import { submitEnquiry } from "@/lib/submit";

const eventTypes = ["Wedding", "Engagement", "Birthday", "Baby shower", "Christening", "Corporate", "Backyard party", "Other"];
const services = [
  { id: "delivery", label: "Delivery", note: "To your venue" },
  { id: "setup", label: "Setup & styling", note: "We place everything" },
  { id: "collection", label: "Pack-down & collection", note: "After your event" },
] as const;

type Form = {
  eventDate: string; eventType: string; guests: string; startTime: string; venue: string;
  name: string; phone: string; email: string; notes: string;
};

export function QuoteCart() {
  const { items, ready, setQty, remove, clear, add } = useCart();
  const [form, setForm] = useState<Form>({ eventDate: "", eventType: "Wedding", guests: "", startTime: "", venue: "", name: "", phone: "", email: "", notes: "" });
  const [svc, setSvc] = useState<Record<string, boolean>>({ delivery: true, setup: true, collection: true });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentSummary, setSentSummary] = useState("");

  // Prefill from the home-page quick quote bar.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setForm((f) => ({
      ...f,
      eventDate: p.get("date") ?? f.eventDate,
      eventType: p.get("type") ?? f.eventType,
      venue: p.get("suburb") ?? f.venue,
      guests: p.get("guests") ?? f.guests,
    }));
  }, []);

  const lines = useMemo(() => items.map((i) => ({ ...i, ...lineInfo(i) })), [items]);
  const subtotal = lines.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0);
  const hasUnpriced = lines.some((l) => l.price == null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  function summaryText() {
    return [
      ...lines.map((l) => `${l.qty} × ${l.name} (${formatPrice(l.price)} ${l.unit})`),
      `Estimated hire: ${formatPrice(subtotal)}${hasUnpriced ? " + items on quote" : ""}`,
      `Event: ${form.eventType} on ${form.eventDate || "TBC"}${form.startTime ? ` at ${form.startTime}` : ""}, ${form.guests || "?"} guests`,
      `Venue: ${form.venue}`,
      `Services: ${services.filter((s) => svc[s.id]).map((s) => s.label).join(", ") || "None"}`,
      `Name: ${form.name} · Phone: ${form.phone} · Email: ${form.email}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean).join("\n");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Partial<Record<keyof Form, string>> = {};
    if (!form.eventDate) errs.eventDate = "Please choose your event date.";
    if (!form.venue.trim()) errs.venue = "Please add your venue address or suburb.";
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^[\d\s()+-]{8,}$/.test(form.phone)) errs.phone = "Please enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    const summary = summaryText();
    const res = await submitEnquiry({
      type: "quote",
      ...form,
      services: services.filter((s) => svc[s.id]).map((s) => s.label),
      items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price, unit: l.unit })),
      subtotal,
      summary,
    });
    if (res.ok) {
      setSentSummary(summary);
      setStatus("sent");
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold text-sage"><Icon name="check" size={34} stroke={1.4} /></span>
        <h1 className="h-display text-5xl md:text-6xl">Thank you, your quote request is in.</h1>
        <p className="lede">We&apos;ll check availability for your date and email your quote, including delivery and setup, to <strong className="font-medium text-forest">{form.email}</strong>. Need it sooner? Call <a href={business.phoneHref} className="underline">{business.phoneLocal}</a>.</p>
        <details className="w-full border border-line bg-linen p-5 text-left">
          <summary className="cursor-pointer text-sm uppercase tracking-[0.16em]">Your request summary</summary>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-muted">{sentSummary}</pre>
        </details>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/gallery/" className="btn btn-outline">Get inspired</Link>
        </div>
      </section>
    );
  }

  const err = (k: keyof Form) => errors[k] && <span className="normal-case tracking-normal text-[#9b3b2f]">{errors[k]}</span>;

  return (
    <section className="container-x py-10 lg:py-14">
      <div className="mb-10 flex flex-col gap-4">
        <div className="text-muted-2"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quote request" }]} /></div>
        <h1 className="h-display text-5xl md:text-6xl lg:text-[72px]">Your quote cart</h1>
        <p className="max-w-2xl text-[17px] leading-relaxed text-muted">Review your items, add your event details and send. This is a request, not a payment. We confirm every booking personally.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-14">
          {/* Items */}
          <fieldset>
            <legend className="mb-4 text-[13px] font-medium uppercase tracking-[0.22em] text-gold-text">1 · Items {ready && `(${lines.length})`}</legend>
            {!ready ? (
              <div className="h-40 animate-pulse bg-linen" />
            ) : lines.length === 0 ? (
              <div className="flex flex-col items-start gap-4 bg-linen p-8">
                <p className="font-display text-3xl">Your cart is empty</p>
                <p className="text-muted">Browse the catalogue and add items, or just send your event details below and we&apos;ll recommend what you need.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/hire/" className="btn btn-sm btn-primary">Browse hire items</Link>
                  <button type="button" onClick={() => add("package", packages[0].slug, 1)} className="btn btn-sm btn-outline">Add {packages[0].name}</button>
                </div>
              </div>
            ) : (
              <ul className="border-t border-line">
                {lines.map((l) => (
                  <li key={l.kind + l.slug} className="flex flex-wrap items-center gap-4 border-b border-line py-5 sm:flex-nowrap">
                    <Link href={l.href} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[2px] sm:h-24 sm:w-24"><Image src={l.image} alt="" fill sizes="96px" className="object-cover" /></Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Link href={l.href} className="font-display text-2xl leading-tight hover:text-sage">{l.name}</Link>
                      <span className="text-sm text-muted-2">{formatPrice(l.price)} {l.unit}{l.kind === "package" ? " · package" : ""}</span>
                    </div>
                    <QtyStepper value={l.qty} onChange={(v) => setQty(l.kind, l.slug, v)} label={l.name} size="sm" />
                    <span className="w-24 text-right font-medium">{l.price == null ? "On quote" : formatPrice(l.price * l.qty)}</span>
                    <button type="button" onClick={() => remove(l.kind, l.slug)} aria-label={`Remove ${l.name}`} className="flex h-11 w-11 items-center justify-center text-muted-2 hover:text-[#9b3b2f]"><Icon name="trash" size={18} /></button>
                  </li>
                ))}
              </ul>
            )}
            {ready && lines.length > 0 && (
              <Link href="/hire/" className="mt-4 inline-flex items-center gap-2 py-2 text-[13px] uppercase tracking-[0.16em] text-sage hover:text-forest"><Icon name="plus" size={16} />Add more items</Link>
            )}
          </fieldset>

          {/* Event */}
          <fieldset className="flex flex-col gap-5">
            <legend className="mb-4 text-[13px] font-medium uppercase tracking-[0.22em] text-gold-text">2 · Your event</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="label">Event date *<input id="f-eventDate" type="date" value={form.eventDate} onChange={set("eventDate")} className="field normal-case tracking-normal" aria-invalid={!!errors.eventDate} />{err("eventDate")}</label>
              <label className="label">Event type
                <select value={form.eventType} onChange={set("eventType")} className="field normal-case tracking-normal">{eventTypes.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              <label className="label">Guest numbers<input type="number" min={1} value={form.guests} onChange={set("guests")} placeholder="e.g. 60" className="field normal-case tracking-normal" /></label>
              <label className="label">Event start time<input type="time" value={form.startTime} onChange={set("startTime")} className="field normal-case tracking-normal" /></label>
            </div>
            <label className="label">Venue address or suburb *<input id="f-venue" value={form.venue} onChange={set("venue")} placeholder="Street, suburb, postcode" className="field normal-case tracking-normal" aria-invalid={!!errors.venue} />{err("venue")}</label>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted">Delivery &amp; setup</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {services.map((s) => {
                  const on = svc[s.id];
                  return (
                    <label key={s.id} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-[2px] border px-4 py-3 transition-colors ${on ? "border-sage bg-sage-soft" : "border-[#d9cfbd] bg-white"}`}>
                      <input type="checkbox" checked={on} onChange={() => setSvc({ ...svc, [s.id]: !on })} className="h-5 w-5 accent-sage" />
                      <span className="flex flex-col"><span className="text-[15px]">{s.label}</span><span className="text-[13px] text-muted-2">{s.note}</span></span>
                    </label>
                  );
                })}
              </div>
            </div>
          </fieldset>

          {/* Contact */}
          <fieldset className="flex flex-col gap-5">
            <legend className="mb-4 text-[13px] font-medium uppercase tracking-[0.22em] text-gold-text">3 · Your details</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="label">Full name *<input id="f-name" value={form.name} onChange={set("name")} autoComplete="name" className="field normal-case tracking-normal" aria-invalid={!!errors.name} />{err("name")}</label>
              <label className="label">Phone *<input id="f-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="04xx xxx xxx" className="field normal-case tracking-normal" aria-invalid={!!errors.phone} />{err("phone")}</label>
            </div>
            <label className="label">Email *<input id="f-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" className="field normal-case tracking-normal" aria-invalid={!!errors.email} />{err("email")}</label>
            <label className="label">Notes, styling ideas or promo code<textarea rows={4} value={form.notes} onChange={set("notes")} placeholder="e.g. colour theme, venue access, WELCOME10" className="field h-auto py-3.5 normal-case tracking-normal" /></label>
          </fieldset>
        </div>

        {/* Summary */}
        <aside aria-label="Quote summary" className="flex w-full flex-col gap-5 border border-line bg-linen p-6 sm:p-8 lg:sticky lg:top-28 lg:w-[380px] lg:shrink-0">
          <h2 className="font-display text-[32px]">Quote summary</h2>
          {lines.length > 0 && (
            <ul className="flex flex-col gap-3 text-[15px]">
              {lines.map((l) => (
                <li key={l.kind + l.slug} className="flex justify-between gap-4"><span className="text-muted">{l.qty} × {l.name}</span><span className="shrink-0">{l.price == null ? "On quote" : formatPrice(l.price * l.qty)}</span></li>
              ))}
            </ul>
          )}
          <div className="flex flex-col gap-2.5 border-t border-line pt-4 text-[15px]">
            <div className="flex justify-between"><span className="text-muted">Item hire</span><span>{formatPrice(subtotal)}{hasUnpriced ? " +" : ""}</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted">Delivery &amp; setup</span><span className="text-right text-muted-2">Quoted per job</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted">Offers</span><span className="text-right text-muted-2">Applied on confirmation</span></div>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-4">
            <span className="text-[13px] uppercase tracking-[0.18em]">Estimated hire</span>
            <span className="font-display text-4xl text-sage">{formatPrice(subtotal)}</span>
          </div>
          {status === "error" && (
            <div role="alert" className="flex flex-col gap-2 border border-[#e3c1b9] bg-[#faeeea] p-4 text-sm leading-relaxed">
              <span>Sorry, we couldn&apos;t send your request just now.</span>
              <a className="underline" href={whatsappLink(`Hi Decor Events Hire! Here's my quote request:\n\n${summaryText()}`)} target="_blank" rel="noopener noreferrer">Send it on WhatsApp instead</a>
              <a className="underline" href={`mailto:${business.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(summaryText())}`}>Send it by email instead</a>
              <span>or call {business.phoneLocal}.</span>
            </div>
          )}
          <button type="submit" className="btn btn-primary h-[58px]" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send quote request"}</button>
          <p className="text-center text-[13px] leading-relaxed text-muted-2">No payment now. We&apos;ll confirm availability and your final price by email.</p>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-2"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>
          <a
            href={whatsappLink(`Hi Decor Events Hire! Here's my quote request:\n\n${summaryText()}`)}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-whatsapp-outline"
          >
            <WhatsAppIcon size={18} />Send via WhatsApp
          </a>
          <a href={business.phoneHref} className="flex min-h-11 items-center gap-3 border-t border-line pt-4 text-sm"><Icon name="phone" size={20} className="text-gold-text" />Prefer to talk? {business.phoneLocal}</a>
        </aside>
      </form>
    </section>
  );
}
