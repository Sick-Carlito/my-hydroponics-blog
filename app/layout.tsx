// ============================================
// FILE: app/layout.tsx
// Root layout with skip link and accessibility
// ============================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'HydroGrow - Your Hydroponics Growing Guide',
    template: '%s | HydroGrow',
  },
  description: 'Learn everything about hydroponics with expert guides, system reviews, and growing tips.',
  keywords: ['hydroponics', 'gardening', 'growing', 'plants', 'vegetables', 'indoor growing'],
  authors: [{ name: 'HydroGrow Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'HydroGrow',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HydroGrow - Hydroponics Growing Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle',
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-vegetation-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-vegetation-300 transition-all"
        >
          Skip to main content
        </a>

        <Navigation />
        
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}