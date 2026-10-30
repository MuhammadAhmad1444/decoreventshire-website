import { Breadcrumbs } from "@/components/ui";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-6 text-muted-2"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} /></div>
      <h1 className="h-display text-5xl md:text-6xl">{title}</h1>
      <p className="mt-4 text-sm text-muted-2">Last updated {updated}</p>
      <div className="mt-12 flex flex-col gap-10">
        {sections.map((s) => (
          <div key={s.h} className="flex flex-col gap-3">
            <h2 className="font-display text-[28px]">{s.h}</h2>
            {s.p.map((p) => <p key={p} className="leading-relaxed text-muted">{p}</p>)}
          </div>
        ))}
      </div>
    </section>
  );
}
