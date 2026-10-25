"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon, Sparkle } from "@/components/Icon";
import { WordReveal } from "@/components/Motion";

const slides = [
  { src: "/images/hero/hero-1.jpg", caption: "Waterfront long tables" },
  { src: "/images/hero/hero-2.jpg", caption: "Floral ballroom reception" },
  { src: "/images/hero/hero-3.jpg", caption: "Clear Tiffany rounds" },
  { src: "/images/hero/hero-4.jpg", caption: "Garden greenery styling" },
  { src: "/images/hero/hero-5.jpg", caption: "Golden evening glamour" },
];
const DURATION = 6500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const t = setTimeout(() => { setIndex((i) => (i + 1) % slides.length); setCycle((c) => c + 1); }, DURATION);
    return () => clearTimeout(t);
  }, [index, paused]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const go = (i: number) => { setIndex(i); setCycle((c) => c + 1); };

  return (
    // Fills the screen, but grows when the content is taller (short laptop screens),
    // so nothing is clipped or covered by the quick-quote card below.
    <section aria-label="Welcome" className="relative -mt-20 flex flex-col overflow-hidden bg-deep text-cream lg:-mt-24" style={{ minHeight: "min(100svh, 1080px)" }}>
      {/* Slides */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => (
          <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === index ? "opacity-100" : "opacity-0"}`}>
            <Image
              key={i === index ? `${s.src}-${cycle}` : s.src}
              src={s.src} alt="" fill priority={i < 2} sizes="100vw"
              className={`object-cover ${i === index ? "kenburns" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-deep/85 via-deep/45 to-deep/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-transparent to-deep/50" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-12 pt-32 sm:pb-14 lg:justify-center lg:pt-36">
        <div className="max-w-3xl">
          <p className="fade-in flex items-center gap-4 text-xs font-medium uppercase tracking-[0.34em] text-gold-light" style={{ ["--d" as string]: "100ms" }}>
            <span className="h-px w-12 bg-gold-light" />Wedding &amp; event décor hire · Sydney
          </p>
          <h1 className="h-display mt-7 text-[50px] leading-[0.98] sm:text-7xl lg:text-[96px] xl:text-[108px]">
            <WordReveal text="Elegant hire for" delay={200} />
            <br />
            <em className="text-gold-light"><WordReveal text="unforgettable" delay={420} /></em>
            <br />
            <WordReveal text="celebrations." delay={560} />
          </h1>
          <p className="fade-in mt-7 max-w-xl text-lg font-light leading-relaxed text-[#ece7dc] sm:text-xl" style={{ ["--d" as string]: "850ms" }}>
            Tiffany chairs, tables, linen, flower walls and styled packages, delivered and set up across Sydney and the south-west.
          </p>
          <div className="fade-in mt-10 flex flex-wrap gap-3.5" style={{ ["--d" as string]: "1050ms" }}>
            <Link href="/quote/" className="btn btn-gold">Get a Free Quote<Icon name="arrow" size={16} /></Link>
            <Link href="/hire/" className="btn btn-glass">Explore the Collection</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar: slide controls + package teaser */}
      {/* sm:pb-24 leaves room for the quick-quote card, which overlaps the hero by 56px from sm up. */}
      <div className="container-x fade-in relative pb-8 sm:pb-24" style={{ ["--d" as string]: "1300ms" }}>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-cream/20 pt-6">
          <div className="flex items-center gap-5">
            <span className="font-display text-2xl tabular-nums">
              0{index + 1}<span className="text-cream/50"> / 0{slides.length}</span>
            </span>
            <div className="flex gap-2" role="group" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button key={s.src} type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${s.caption}`} aria-pressed={i === index} className="group flex h-11 items-center">
                  <span className="relative block h-[2px] w-10 overflow-hidden bg-cream/30 sm:w-14">
                    {i === index && <span key={cycle} className="hero-progress absolute inset-0 bg-gold-light" style={{ ["--dur" as string]: `${DURATION}ms` }} />}
                    {i < index && <span className="absolute inset-0 bg-cream/70" />}
                  </span>
                </button>
              ))}
            </div>
            <span key={cycle} className="fade-in hidden text-sm text-cream/75 md:inline">{slides[index].caption}</span>
          </div>
          <Link href="/packages/backyard-birthday/" className="group hidden items-center gap-4 border border-cream/25 bg-cream/10 p-4 pr-5 backdrop-blur-md transition-colors hover:bg-cream hover:text-forest lg:flex">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light text-gold-light group-hover:border-gold group-hover:text-gold-text"><Sparkle size={18} /></span>
            <span className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-light group-hover:text-gold-text">Backyard Birthday Package</span>
              <span className="font-display text-2xl">From $800 · up to 20 guests</span>
            </span>
            <Icon name="arrow" size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>


    </section>
  );
}
