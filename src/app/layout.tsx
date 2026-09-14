import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { restaurant } from "@/data/restaurant";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.siteUrl),
  title: {
    default: `${restaurant.name} · ${restaurant.address.city}`,
    template: `%s · ${restaurant.shortName}`,
  },
  description: restaurant.description,
  keywords: [
    "ristorante",
    "cocktail bar",
    restaurant.address.city,
    "cucina italiana",
    "menu digitale",
    "prenotazione",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: restaurant.shortName,
    title: restaurant.name,
    description: restaurant.tagline,
    images: [{ url: "/images/brand/hero.webp", width: 1600, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: restaurant.name,
    description: restaurant.tagline,
    images: ["/images/brand/hero.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1b1a18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-charcoal-900 focus:px-4 focus:py-2 focus:text-sm focus:text-ivory-50"
        >
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
