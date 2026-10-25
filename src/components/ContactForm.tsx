"use client";

import { useState } from "react";
import { business } from "@/data/site";
import { submitEnquiry } from "@/lib/submit";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Please enter a valid email.";
    if (!data.message?.trim()) errs.message = "Please add a short message.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await submitEnquiry({ type: "contact", ...data });
    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3">
        <h3 className="font-display text-4xl">Message sent</h3>
        <p className="leading-relaxed text-muted">Thanks for getting in touch. We&apos;ll reply by email or phone soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <h3 className="font-display text-[32px]">Send us a message</h3>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="label">Name *<input name="name" autoComplete="name" className="field normal-case tracking-normal" aria-invalid={!!errors.name} />{errors.name && <span className="normal-case tracking-normal text-[#9b3b2f]">{errors.name}</span>}</label>
        <label className="label">Phone<input name="phone" type="tel" autoComplete="tel" className="field normal-case tracking-normal" /></label>
      </div>
      <label className="label">Email *<input name="email" type="email" autoComplete="email" className="field normal-case tracking-normal" aria-invalid={!!errors.email} />{errors.email && <span className="normal-case tracking-normal text-[#9b3b2f]">{errors.email}</span>}</label>
      <label className="label">Event date (if known)<input name="eventDate" type="date" className="field normal-case tracking-normal" /></label>
      <label className="label">Message *<textarea name="message" rows={5} className="field h-auto py-3.5 normal-case tracking-normal" aria-invalid={!!errors.message} />{errors.message && <span className="normal-case tracking-normal text-[#9b3b2f]">{errors.message}</span>}</label>
      {status === "error" && (
        <p role="alert" className="border border-[#e3c1b9] bg-[#faeeea] px-4 py-3 text-[15px]">Sorry, your message couldn&apos;t be sent. Please email <a className="underline" href={`mailto:${business.email}`}>{business.email}</a> or call {business.phoneLocal}.</p>
      )}
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
