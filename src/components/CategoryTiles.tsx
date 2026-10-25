import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/site";

/** Row of circular category shortcuts used on catalogue pages. */
export function CategoryTiles({ current }: { current?: string }) {
  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0 [&::-webkit-scrollbar]:hidden">
      {categories.map((c, i) => {
        const on = c.slug === current;
        return (
          // Load-time fade (not a scroll reveal): on phones most tiles start off-screen inside the swipe strip.
          <div key={c.slug} className="fade-in w-[132px] shrink-0 sm:w-[150px] lg:w-auto" style={{ ["--d" as string]: `${200 + i * 70}ms` }}>
            <Link href={`/hire/${c.slug}/`} aria-current={on ? "page" : undefined} className="group flex flex-col items-center gap-3 text-center">
              <span className={`relative block aspect-square w-full overflow-hidden rounded-full ring-1 ring-offset-4 ring-offset-cream transition-all duration-500 ${on ? "ring-gold" : "ring-transparent group-hover:ring-gold/60"}`}>
                <Image src={c.image} alt="" fill sizes="180px" className="img-zoom object-cover" />
              </span>
              <span className={`font-display text-xl leading-tight transition-colors ${on ? "text-gold-text" : "group-hover:text-sage"}`}>{c.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
