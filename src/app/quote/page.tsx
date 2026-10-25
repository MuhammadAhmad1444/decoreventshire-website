import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";

export const metadata: Metadata = {
  title: "Your Quote Cart",
  description: "Review your hire items, add your event details and send your quote request to Decor Events Hire.",
  alternates: { canonical: "/quote/" },
  robots: { index: false },
};

export default function QuotePage() {
  return <QuoteCart />;
}
