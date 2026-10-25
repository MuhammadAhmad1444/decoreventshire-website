import type { Metadata } from "next";
import { business } from "@/data/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy/" } };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        { h: "What we collect", p: ["When you send a quote request, contact form or sign up for offers, we collect the details you provide, such as your name, phone, email, event details and venue address."] },
        { h: "How we use it", p: ["We use your details only to respond to your enquiry, prepare quotes, deliver your booking and, if you opted in, send occasional offers. You can unsubscribe at any time."] },
        { h: "Storage & sharing", p: ["Your information is stored securely and is never sold. We only share details with service providers needed to run our business, such as email hosting."] },
        { h: "Your quote cart", p: ["Items in your quote cart are stored in your own browser so they're there when you come back. Clearing your browser data removes them."] },
        { h: "Access & questions", p: [`To access or correct your information, contact us on ${business.phone} or ${business.email}.`] },
      ]}
    />
  );
}
