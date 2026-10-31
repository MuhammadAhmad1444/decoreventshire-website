"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkle } from "@/components/Icon";
import { WordReveal } from "@/components/Motion";
import { ArchOutline } from "@/components/ui";

const slides = [
  { src: "/images/hero/hero-1.jpg", caption: "Waterfront long tables" },
  { src: "/images/hero/hero-2.jpg", caption: "Floral ballroom reception" },
  { src: "/images/hero/hero-3.jpg", caption: "Clear Tiffany rounds" },
  { src: "/images/hero/hero-4.jpg", caption: "Garden greenery styling" },
  { src: "/images/hero/hero-5.jpg", caption: "Golden evening glamour" },
];
const DURATION = 6500;

// Resting place of each card in the deck: 0 is the front, 1 and 2 peek out behind it.
const deck: React.CSSProperties[] = [
  { transform: "none", zIndex: 30 },
  { transform: "translate(16px, -6px) rotate(3.5deg) scale(0.97)", zIndex: 20 },
  { transform: "translate(30px, -10px) rotate(7deg) scale(0.94)", zIndex: 10 },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  // Shuffles every DURATION ms; pauses only while the tab is hidden.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go((index + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const go = (i: number) => {
    if (i === index) return;
    setPrev(index);
    setIndex(i);
    setCycle((c) => c + 1);
  };


  return (
    // Light split hero: headline left, slideshow framed in an arch (the shape of the floral
    // arches on hire) with an offset gold outline echoing the ring in the logo.
    <section aria-label="Welcome" className="relative overflow-hidden bg-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-40 h-[640px] w-[640px] rounded-full bg-sage-soft" />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 xl:gap-24 lg:pb-28 lg:pt-16">
        <div className="max-w-2xl">
          <p className="fade-in eyebrow" style={{ ["--d" as string]: "100ms" }}>Wedding and event hire · Campbelltown &amp; Sydney</p>
          <h1 className="h-display mt-6 text-[50px] text-forest sm:text-7xl lg:text-[68px] xl:text-[88px]">
            <WordReveal text="Party & event hire for" delay={200} />{" "}
            <WordReveal text="unforgettable celebrations." delay={420} />
          </h1>
          <p className="fade-in lede mt-7 max-w-xl" style={{ ["--d" as string]: "850ms" }}>
            Event and wedding hire from our Campbelltown base: Tiffany chairs, tables, linen, flower walls and styled packages, delivered and set up across Sydney and the south-west.
          </p>
          <div className="fade-in mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "1000ms" }}>
            <Link href="/quote/" className="btn btn-primary">Get a free quote</Link>
            <Link href="/hire/" className="btn btn-outline">Browse the collection</Link>
          </div>
          <ul className="fade-in mt-12 grid max-w-lg grid-cols-3 gap-3 border-t border-line pt-6 text-sm text-muted sm:gap-4" style={{ ["--d" as string]: "1150ms" }}>
            <li><span className="block font-display text-xl text-forest sm:text-2xl">Exact</span>prices online</li>
            <li><span className="block font-display text-xl text-forest sm:text-2xl">Delivered</span>and set up</li>
            <li><span className="block font-display text-xl text-forest sm:text-2xl">Sydney</span>and the south-west</li>
          </ul>
        </div>

        <div className="fade-in relative mx-auto w-full max-w-[500px] lg:mr-0" style={{ ["--d" as string]: "300ms" }}>
          {/* A deck of arch-shaped photos. The front card shows; the next two peek out behind it,
              tilted like a fanned stack. On each change the front card sweeps out to the left,
              tucks behind the stack, and the next card settles forward. */}
          <div className="relative aspect-[4/5]">
            <div className="rise absolute inset-0">
              {slides.map((s, i) => {
                const pos = (i - index + slides.length) % slides.length;
                const leaving = i === prev && cycle > 0;
                return (
                  <div
                    key={leaving ? `${s.src}-out-${cycle}` : s.src}
                    aria-hidden={pos !== 0}
                    className={`arch absolute inset-0 bg-linen shadow-[0_30px_60px_-30px_rgba(30,42,34,0.45)] transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${leaving ? "shuffle-out" : ""}`}
                    style={{ ...deck[Math.min(pos, deck.length - 1)], opacity: pos < 3 ? (pos === 2 ? 0.85 : 1) : 0 }}
                  >
                    <Image
                      key={pos === 0 ? `${s.src}-${cycle}` : s.src}
                      src={s.src} alt={s.caption} fill priority={i < 2} sizes="(max-width: 1024px) 90vw, 500px"
                      className={`object-cover ${pos === 0 ? "kenburns" : ""}`}
                    />
                  </div>
                );
              })}
            </div>
            <ArchOutline className="z-[35] translate-x-2.5 -translate-y-2.5 sm:translate-x-6 sm:-translate-y-6" />
          </div>

          <Link href="/packages/backyard-birthday/" className="group absolute left-3 bottom-24 z-50 flex items-center gap-4 rounded-2xl bg-white p-4 pr-5 shadow-[0_24px_50px_-24px_rgba(30,42,34,0.45)] transition-colors hover:bg-forest hover:text-cream sm:-left-12">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-soft text-gold-text group-hover:bg-cream/10 group-hover:text-gold-light"><Sparkle size={17} /></span>
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-sage group-hover:text-gold-light">Backyard Birthday Package</span>
              <span className="font-display text-xl">From $800, up to 20 guests</span>
            </span>
          </Link>

          <div className="mt-6 flex items-center justify-between gap-4 pl-1">
            <span key={cycle} className="fade-in text-sm text-muted">{slides[index].caption}</span>
            <div className="flex gap-1.5" role="group" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button key={s.src} type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${s.caption}`} aria-pressed={i === index} className="flex h-11 w-7 items-center justify-center">
                  <span className={`block h-2 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-gold" : "w-2 bg-sand"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
