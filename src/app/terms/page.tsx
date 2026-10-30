import type { Metadata } from "next";
import { business } from "@/data/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Hire Terms & Conditions",
  description: "Booking, deposit, delivery, damage and cancellation terms for furniture and décor hire with Decor Events Hire in Sydney.",
  alternates: { canonical: "/terms/" },
};

// Starter terms. Have these reviewed before relying on them.
export default function TermsPage() {
  return (
    <LegalPage
      title="Hire Terms & Conditions"
      updated="October 2026"
      sections={[
        { h: "Quotes & bookings", p: ["Submitting a quote request does not confirm a booking. Your booking is confirmed once you accept our written quote and pay the deposit.", "Prices shown on the website are for item hire only. Delivery, setup and collection are quoted per job."] },
        { h: "Deposit & payment", p: ["A 30% deposit secures your date. The remaining balance is due 7 days before your event.", "Discounts and offers are applied at the time of confirmation and cannot be combined unless stated."] },
        { h: "Changes & cancellations", p: ["Quantity changes can usually be made up to 7 days before your event, subject to availability.", "Cancellations made more than 30 days before the event receive a full deposit refund or credit. Within 30 days, the deposit is non-refundable but may be held as a credit at our discretion."] },
        { h: "Delivery, setup & access", p: ["You must provide accurate venue details, including stairs, lifts, parking and access times. Additional charges may apply if access differs from what was quoted.", "Items must be left in a safe, accessible location for collection at the agreed time."] },
        { h: "Care of hired items", p: ["Hired items remain the property of Decor Events Hire. Please keep them clean, dry and away from open flames.", "Items lost, stolen or damaged beyond normal wear are charged at repair or replacement cost."] },
        { h: "Weather", p: ["For outdoor events, you are responsible for providing suitable weather cover. We may decline to set up items where conditions are unsafe."] },
        { h: "Contact", p: [`Questions about these terms? Contact ${business.contactName} on ${business.phone} or ${business.email}.`] },
      ]}
    />
  );
}
