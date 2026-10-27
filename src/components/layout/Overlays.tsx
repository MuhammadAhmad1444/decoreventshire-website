"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, welcomeCode, whatsappLink } from "@/data/site";
import { useCart } from "@/components/cart/CartProvider";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { submitEnquiry } from "@/lib/submit";

/** "Added to quote" confirmation that slides in after any add-to-cart. */
export function CartToast() {
  const { toast, dismissToast, count } = useCart();
  if (!toast) return null;
  return (
    <div key={toast.id} role="status" className="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-32px)] max-w-md -translate-x-1/2 animate-fade-up border border-sand bg-cream p-4 shadow-[0_24px_60px_rgba(38,52,40,0.2)] md:bottom-28 md:left-auto md:right-8 md:translate-x-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-cream"><Icon name="check" size={16} stroke={2} /></span>
        <div className="flex-1">
          <p className="text-[15px]"><strong className="font-medium">{toast.qty} × {toast.name}</strong> added to your quote cart.</p>
          <div className="mt-3 flex gap-4">
            <Link href="/quote/" onClick={dismissToast} className="link-u">View cart ({count})</Link>
            <button type="button" onClick={dismissToast} className="text-sm font-semibold text-muted-2 hover:text-forest">Keep browsing</button>
          </div>
        </div>
        <button type="button" onClick={dismissToast} aria-label="Dismiss" className="flex h-8 w-8 items-center justify-center text-muted-2"><Icon name="close" size={14} /></button>
      </div>
    </div>
  );
}

/** Sticky call / WhatsApp / quote bar for phones. */
export function MobileActionBar() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  if (pathname.startsWith("/quote")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-sand bg-cream/95 p-3 backdrop-blur md:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <a href={business.phoneHref} aria-label={`Call ${business.phoneLocal}`} className="btn btn-sm btn-outline w-12 shrink-0 px-0"><Icon name="phone" size={18} /></a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-whatsapp flex-1 gap-2 px-2"><WhatsAppIcon size={17} />WhatsApp</a>
      <Link href="/quote/" className="btn btn-sm btn-primary flex-1 px-2">Quote{ready && count > 0 ? ` (${count})` : ""}</Link>
    </div>
  );
}

/** Floating "Chat on WhatsApp" button for tablet and desktop (phones use the action bar). */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-8 right-8 z-40 hidden items-center md:flex"
    >
      <span className="pointer-events-none mr-3 translate-x-2 whitespace-nowrap bg-deep px-4 py-2.5 text-[13px] text-cream opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_-8px_rgba(18,128,92,0.65)] transition-transform duration-300 group-hover:scale-105">
        <span aria-hidden="true" className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsAppIcon size={30} className="relative" />
      </span>
    </a>
  );
}

const POP_KEY = "deh-welcome-seen";

/** New-visitor offer pop-up, shown once per browser. */
export function WelcomePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let seen = false;
    try { seen = !!localStorage.getItem(POP_KEY); } catch {}
    if (seen || pathname.startsWith("/quote")) return;
    // Wait until the visitor is engaged: 30s on the page or 60% scrolled, whichever comes first.
    const stop = () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
    const show = () => { stop(); setOpen(true); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.6) show();
    };
    const t = setTimeout(show, 30000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try { localStorage.setItem(POP_KEY, "1"); } catch {}
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Please enter a valid email."); return; }
    setError("");
    setState("sending");
    await submitEnquiry({ type: "welcome", email });
    setState("done");
    try { localStorage.setItem(POP_KEY, "1"); } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-deep/55 p-4" onClick={(e) => e.target === e.currentTarget && close()}>
      <div role="dialog" aria-modal="true" aria-labelledby="welcome-title" className="relative grid w-full max-w-[860px] animate-fade-up overflow-hidden bg-cream shadow-2xl md:grid-cols-2">
        <div className="relative hidden min-h-[480px] md:block">
          <Image src="/images/work/setup-23.jpg" alt="" fill sizes="430px" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
          <span className="eyebrow">Welcome offer</span>
          {state === "done" ? (
            <>
              <h2 id="welcome-title" className="h-display text-[44px]">You&apos;re in.</h2>
              <p className="leading-relaxed text-muted">Your code is <strong className="tracking-[0.14em] text-forest">{welcomeCode}</strong>. Add it to the notes in your quote request for 10% off your first hire.</p>
              <Link href="/hire/" onClick={close} className="btn btn-primary">Start browsing</Link>
            </>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
              <h2 id="welcome-title" className="h-display text-[44px]">Enjoy <em className="text-sage">10% off</em> your first hire</h2>
              <p className="leading-relaxed text-muted">Join our list for styling ideas and offers, and we&apos;ll show your welcome code straight away.</p>
              <label className="label">Email address
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" className="field normal-case tracking-normal" aria-invalid={!!error} />
              </label>
              {error && <p className="-mt-2 text-sm text-[#9b3b2f]">{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Unlocking…" : "Unlock my offer"}</button>
              <button type="button" onClick={close} className="h-11 text-sm text-muted-2 underline underline-offset-4 hover:text-forest">No thanks</button>
            </form>
          )}
        </div>
        <button ref={closeRef} type="button" onClick={close} aria-label="Close offer" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow">
          <Icon name="close" size={16} stroke={1.8} />
        </button>
      </div>
    </div>
  );
}
