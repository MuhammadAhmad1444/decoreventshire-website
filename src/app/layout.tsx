import type { Metadata, Viewport } from "next";
import { Manrope, Marcellus } from "next/font/google";
import "./globals.css";
import { business, categories } from "@/data/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { Footer } from "@/components/layout/Footer";
import { CartToast, MobileActionBar, WelcomePopup, WhatsAppFab } from "@/components/layout/Overlays";
import { MotionObserver } from "@/components/Motion";

// Marcellus echoes the flared Roman capitals of the logo wordmark; Manrope keeps body text clean and modern.
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Decor Events Hire | Event & Wedding Hire Campbelltown, Sydney",
    template: "%s | Decor Events Hire",
  },
  description:
    "Tiffany chair, table, linen and décor hire for weddings and parties in Campbelltown, Liverpool and across Sydney. Exact prices online, delivery and setup.",
  keywords: [
    "tiffany chair hire sydney", "wedding furniture hire sydney", "event hire sydney", "party hire sydney",
    "event hire south west sydney", "party hire liverpool", "wedding decor hire nsw", "backdrop hire sydney",
    "flower wall hire sydney", "table and chair hire sydney", "baby shower decor hire sydney",
  ],
  // Australian location signals for local search.
  other: { "geo.region": "AU-NSW", "geo.placename": "Campbelltown", "geo.position": "-34.0625415;150.8100642", "ICBM": "-34.0625415, 150.8100642", "content-language": "en-AU" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: business.url,
    siteName: business.name,
    images: [{ url: "/images/work/setup-20.jpg", width: 1200, height: 1600, alt: "Long tables with clear Tiffany chairs styled by Decor Events Hire" }],
  },
  twitter: { card: "summary_large_image" },
  // Icons come from src/app/favicon.ico, icon.png and apple-icon.png: square crops of the
  // original monogram, as Google only shows square favicons in search results.
};

export const viewport: Viewport = { themeColor: "#EEF2EC" };

// Business details for search engines (Google's business panel and local results).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${business.url}/#business`,
  name: business.name,
  description: "Wedding and event furniture and décor hire based in Campbelltown, delivering across Sydney and the south-west.",
  url: business.url,
  telephone: business.phone,
  email: business.email,
  image: `${business.url}/images/work/setup-20.jpg`,
  logo: `${business.url}/images/brand/logo.jpg`,
  sameAs: [business.socials.instagram, business.socials.facebook, business.googleProfileUrl],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" },
  ],
  areaServed: [
    { "@type": "City", name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
    ...business.suburbs.map((name) => ({ "@type": "Place", name: `${name}, NSW` })),
  ],
  knowsAbout: ["Wedding furniture hire", "Event décor hire", "Tiffany chair hire", "Flower wall hire", "Party hire"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event hire catalogue",
    itemListElement: categories.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${c.name} hire`, description: c.blurb, url: `${business.url}/hire/${c.slug}/` },
    })),
  },
  priceRange: "$$",
  currenciesAccepted: "AUD",
  // Coordinates of the Google Business Profile pin, so the map listing and website agree.
  geo: { "@type": "GeoCoordinates", latitude: -34.0625415, longitude: 150.8100642 },
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: business.address.country,
  },
  hasMap: business.mapsUrl,
};

// Site-level entry so search engines and AI tools tie every page to the business.
const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: business.name,
  url: business.url,
  inLanguage: "en-AU",
  publisher: { "@id": `${business.url}/#business` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${manrope.variable} ${marcellus.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen pb-[76px] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
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
