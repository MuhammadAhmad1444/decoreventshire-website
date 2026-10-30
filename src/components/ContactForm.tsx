"use client";

import { useState } from "react";
import { business } from "@/data/site";
import { submitEnquiry } from "@/lib/submit";
import { Icon } from "@/components/Icon";

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
      <div role="status" className="flex h-full flex-col items-start justify-center gap-4">
        <span className="pop-in flex h-16 w-16 items-center justify-center rounded-full bg-gold text-deep"><Icon name="check" size={28} stroke={2} /></span>
        <h3 className="font-display text-4xl text-forest">Message sent</h3>
        <p className="max-w-md leading-relaxed text-muted">Thanks for getting in touch. We&apos;ll reply by email or phone soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="mb-2 flex flex-col gap-2">
        <p className="eyebrow">Contact form</p>
        <h3 className="font-display text-[34px] leading-tight text-forest md:text-[40px]">Send us a message</h3>
        <p className="text-muted">Tell us about your event and we&apos;ll get back to you personally.</p>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Your name" required autoComplete="name" error={errors.name} />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      </div>
      <Field name="email" label="Email address" type="email" required autoComplete="email" error={errors.email} />
      <Field name="eventDate" label="Event date (if known)" type="date" />
      <Field name="message" label="Your message" required textarea error={errors.message} />
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#e3c1b9] bg-[#faeeea] px-4 py-3 text-[15px]">Sorry, your message couldn&apos;t be sent. Please email <a className="underline" href={`mailto:${business.email}`}>{business.email}</a> or call {business.phoneLocal}.</p>
      )}
      <button type="submit" className="btn btn-primary mt-1 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : <>Send message<Icon name="arrow" size={16} /></>}
      </button>
      <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-2">We only use your details to reply to your enquiry.</p>
    </form>
  );
}

/**
 * Text field with a label that sits inside the box and floats up when the field is focused or
 * filled (the input's placeholder is a single space so :placeholder-shown can detect "empty").
 * Date fields always show their mm/dd/yyyy hint, so their label stays floated.
 */
function Field({ name, label, type = "text", required, autoComplete, error, textarea }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string; error?: string; textarea?: boolean }) {
  const id = `f-${name}`;
  const box = `peer w-full rounded-2xl border bg-cream/40 px-4 pb-2.5 pt-6 text-[15px] text-forest outline-none transition-all duration-200 placeholder:text-transparent focus:bg-white focus:shadow-[0_0_0_4px_rgba(187,140,79,0.15)] ${
    error ? "border-[#9b3b2f]" : "border-line focus:border-gold"
  }`;
  const floated = type === "date";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {textarea ? (
          <textarea id={id} name={name} rows={5} placeholder=" " aria-invalid={!!error} className={`${box} resize-y`} />
        ) : (
          <input id={id} name={name} type={type} placeholder=" " autoComplete={autoComplete} aria-invalid={!!error} className={`${box} h-14`} />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 text-muted-2 transition-all duration-200 ${
            floated
              ? "top-2 text-xs font-semibold"
              : "top-4 text-[15px] peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-gold-text peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold"
          }`}
        >
          {label}{required && <span className="text-gold-text"> *</span>}
        </label>
      </div>
      {error && <span className="pl-1 text-sm text-[#9b3b2f]">{error}</span>}
    </div>
  );
}
