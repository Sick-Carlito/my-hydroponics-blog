// ============================================
// FILE: app/layout.tsx
// Root layout with skip link and accessibility
// ============================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/data/siteConfig";

const baseUrl = siteConfig.url;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default:
      "Hydroponics Central - Your Complete Guide to Hydroponic Gardening",
    template: "%s | Hydroponics Central",
  },
  description:
    "Learn everything about hydroponics — from beginner setups to advanced techniques. Grow fresh produce faster, cleaner, and year-round with our expert guides.",
  keywords: [
    "hydroponics",
    "hydroponic gardening",
    "DWC",
    "indoor growing",
    "growing guides",
    "plants",
    "vegetables",
  ],
  authors: [{ name: "Carl" }],
  metadataBase: new URL(baseUrl),
  alternates: {
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Hydroponics Central",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Hydroponics Central - Hydroponic Gardening Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HydroponicsCentral",
    creator: "@HydroponicsCentral",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable} suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
      </head>
      <body className='font-sans antialiased'>
        {/* Skip to main content link for accessibility */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-vegetation-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-vegetation-300 transition-all'
        >
          Skip to main content
        </a>

        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-80Q32RZ7VL'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-80Q32RZ7VL');
          `}
        </Script>

        {/* Organization + WebSite schema for Google E-E-A-T */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Hydroponics Central",
                url: baseUrl,
                logo: `${baseUrl}/og-image.jpg`,
                description:
                  "Curated hydroponics guides and resources for growers of all levels.",
                founder: { "@type": "Person", name: "Carl" },
                sameAs: [
                  "https://twitter.com/HydroponicsCentral",
                  "https://facebook.com/hydrogrow",
                  "https://instagram.com/hydrogrow",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Hydroponics Central",
                url: baseUrl,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${baseUrl}/blog?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />

        <ThemeProvider>
          <Navigation />

          <main id='main-content' tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
