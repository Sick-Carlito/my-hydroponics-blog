import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Hydroponics Central',
  description: 'Terms of use for Hydroponics Central.',
  openGraph: {
    title: 'Terms of Service — Hydroponics Central',
    description: 'Terms of use for Hydroponics Central.',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        <h1 className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-2">Terms of Service</h1>
        <p className="text-gray-500 dark:text-slate-500 text-sm mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Who runs this site</h2>
            <p>
              Hydroponics Central is run by Carl, an independent content curator. By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 space-y-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Content and accuracy</h2>
            <p className="text-sm">
              Everything published on Hydroponics Central is researched from third-party sources and provided for informational purposes only. Carl is a content curator — not a licensed agronomist, plant scientist, or agricultural professional.
            </p>
            <p className="text-sm">
              While we make every effort to cite credible sources and present accurate information, we make no guarantee that the content is complete, error-free, or current. Growing results vary widely depending on environment, equipment, and individual skill. Always cross-reference advice with qualified professionals or your local agricultural extension office before making significant decisions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Affiliate links</h2>
            <p className="text-sm">
              Some links on this site are affiliate links, primarily through the Amazon Associates program. If you click a link and purchase a product, we may earn a commission at no additional cost to you. Affiliate relationships do not influence our editorial opinions — we only recommend products we believe are genuinely worth considering based on our research.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Intellectual property</h2>
            <p className="text-sm">
              The written content, structure, and design of Hydroponics Central are the property of Carl / Hydroponics Central. You are welcome to quote short excerpts with a clear link back to the original article. Reproducing full articles without permission is not allowed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Limitation of liability</h2>
            <p className="text-sm">
              Hydroponics Central and its author are not liable for any damages arising from your use of — or inability to use — this site or its content. This includes but is not limited to financial loss, crop failure, or equipment damage. Use the information here at your own discretion.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">External links</h2>
            <p className="text-sm">
              We link to external sources to support factual claims. We are not responsible for the content, accuracy, or privacy practices of those external sites. Links do not constitute endorsement.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Changes to these terms</h2>
            <p className="text-sm">
              We may update these terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after changes are posted means you accept the updated terms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Questions</h2>
            <p className="text-sm">
              If you have any questions about these terms, email us at{' '}
              <a href="mailto:hello@hydroponicscentral.com" className="text-vegetation-600 dark:text-vegetation-400 hover:underline font-medium">
                hello@hydroponicscentral.com
              </a>
              .
            </p>
          </div>

          <div className="text-center pt-4">
            <Link href="/" className="text-vegetation-600 dark:text-vegetation-400 hover:text-vegetation-700 font-semibold text-sm transition-colors">
              ← Back to Hydroponics Central
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
