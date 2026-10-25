import Link from "next/link";
import { GoldDivider } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-28 text-center">
      <span className="eyebrow">Page not found</span>
      <h1 className="h-display text-6xl md:text-7xl">This page has been packed away.</h1>
      <GoldDivider />
      <p className="lede">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the party.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/hire/" className="btn btn-outline">Browse hire items</Link>
      </div>
    </section>
  );
}
