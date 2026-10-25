import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { business } from "@/data/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { Footer } from "@/components/layout/Footer";
import { CartToast, MobileActionBar, WelcomePopup, WhatsAppFab } from "@/components/layout/Overlays";
import { MotionObserver } from "@/components/Motion";

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-jost", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Decor Events Hire | Wedding & Event Furniture Hire Sydney",
    template: "%s | Decor Events Hire",
  },
  description:
    "Tiffany chair, table, linen and décor hire for weddings, birthdays and events across Sydney and the south-western suburbs. Exact prices online, delivery and setup available.",
  keywords: ["tiffany chair hire sydney", "wedding furniture hire", "event hire south west sydney", "party hire liverpool", "backdrop hire sydney", "table and chair hire"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: business.name,
    images: [{ url: "/images/work/setup-20.jpg", width: 1200, height: 1600, alt: "Long tables with clear Tiffany chairs styled by Decor Events Hire" }],
  },
  icons: { icon: "/images/brand/monogram.jpg", apple: "/images/brand/monogram.jpg" },
};

export const viewport: Viewport = { themeColor: "#263428" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  description: "Wedding and event furniture and décor hire in Sydney.",
  url: business.url,
  telephone: business.phone,
  email: business.email,
  image: `${business.url}/images/brand/logo.jpg`,
  areaServed: ["Sydney", "South Western Sydney", ...business.suburbs],
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${jost.variable} ${cormorant.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen pb-[76px] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionObserver />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-4 focus:py-3 focus:text-cream">Skip to content</a>
        <CartProvider>
          <PromoBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartToast />
          <MobileActionBar />
          <WhatsAppFab />
          <WelcomePopup />
        </CartProvider>
      </body>
    </html>
  );
}
