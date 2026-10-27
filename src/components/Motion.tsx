"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Global motion driver. Watches every [data-reveal] / [data-stagger] element and adds
 * .is-in when it scrolls into view, and moves [data-parallax] elements on scroll.
 * Pages stay fully visible without JS (styles only hide elements under html.js).
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)").forEach((el) => io.observe(el));
    watch(document);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n instanceof HTMLElement && watch(n.parentNode ?? n))));
    mo.observe(document.body, { childList: true, subtree: true });

    // Anything already scrolled past (fast scrolling, anchor jumps, End key) is shown at once,
    // so content above the viewport is never left hidden.
    const revealPassed = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) { el.classList.add("is-in"); io.unobserve(el); }
      });
    };

    // Parallax
    let raf = 0;
    const items = () => Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const update = () => {
      raf = 0;
      revealPassed();
      const vh = window.innerHeight;
      for (const el of items()) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}

/** Splits a line into words that slide up one after another on load. */
export function WordReveal({ text, delay = 0, step = 70, className = "" }: { text: string; delay?: number; step?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i, all) => (
        <span key={i}>
          <span className="word-reveal">
            <span style={{ ["--d" as string]: `${delay + i * step}ms` }}>{w}</span>
          </span>
          {i < all.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
