import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Hydroponics Central',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-vegetation-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-8xl font-black text-vegetation-200 mb-4">404</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8">
          Looks like this page went off the deep end. Let&apos;s get you back to growing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-vegetation-600 text-white font-bold rounded-xl hover:bg-vegetation-700 transition-colors shadow-sm"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white text-vegetation-600 font-bold rounded-xl border-2 border-vegetation-200 hover:border-vegetation-400 transition-colors"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
