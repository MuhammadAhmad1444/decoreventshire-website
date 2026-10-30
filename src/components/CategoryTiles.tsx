import Image from "@/components/Img";
import Link from "next/link";
import { categories, products } from "@/data/site";

/**
 * Row of rounded category cards used on catalogue pages. A deep dark-green fade over each
 * photo carries the name and item count, and ties together photos shot in different light.
 * On hover the card lifts, the photo zooms, a gold line draws under the name and the short
 * description slides up. The current category keeps an offset gold outline.
 */
export function CategoryTiles({ current }: { current?: string }) {
  return (
    <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 pt-5 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0 [&::-webkit-scrollbar]:hidden">
      {categories.map((c, i) => {
        const on = c.slug === current;
        const count = products.filter((p) => p.category === c.slug).length;
        return (
          // Rises in on load (not a scroll reveal): on phones most cards start off-screen inside the swipe strip.
          <div key={c.slug} className="tile-rise w-[160px] shrink-0 sm:w-[180px] lg:w-auto" style={{ ["--d" as string]: `${150 + i * 90}ms` }}>
            <Link href={`/hire/${c.slug}/`} aria-current={on ? "page" : undefined} className="group relative block">
              <span aria-hidden="true" className={`absolute inset-0 rounded-[26px] border transition-all duration-500 ease-out ${on ? "translate-x-2 -translate-y-2 border-gold" : "border-transparent group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:border-gold/70"}`} />
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[26px] bg-deep transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <Image src={c.image} alt="" fill sizes="(max-width: 1024px) 180px, 210px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-deep via-deep/45 to-deep/5 transition-opacity duration-500 group-hover:from-deep group-hover:via-deep/60" />
                <span className="absolute inset-x-4 bottom-4 flex flex-col text-left">
                  <span className="font-display text-[20px] leading-tight text-cream">{c.name}</span>
                  <span aria-hidden="true" className={`mt-2 h-px origin-left bg-gold-light transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-[0.25] group-hover:scale-x-100"}`} />
                  <span className="mt-2 text-xs font-semibold text-gold-light">{count} {count === 1 ? "item" : "items"}</span>
                  {/* Short description slides up on hover (pointer devices only). */}
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-xs leading-snug text-mist">{c.blurb}</span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
