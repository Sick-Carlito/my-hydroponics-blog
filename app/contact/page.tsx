import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact — Hydroponics Central',
  description: 'Get in touch with Carl at Hydroponics Central. Found an error, have a question, or want to suggest a topic?',
  openGraph: {
    title: 'Contact — Hydroponics Central',
    description: 'Get in touch with Carl at Hydroponics Central.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        <h1 className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-3">Get in Touch</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg mb-10">
          I read every email. If something here helped you — or if you spotted something wrong — I genuinely want to hear it.
        </p>

        <div className="space-y-6">

          {/* Primary contact */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Email</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm mb-5">
              The best way to reach me. I aim to respond within a few days.
            </p>
            <a
              href="mailto:hello@hydroponicscentral.com"
              className="inline-flex items-center gap-3 px-6 py-3 bg-vegetation-600 text-white font-bold rounded-xl hover:bg-vegetation-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              hello@hydroponicscentral.com
            </a>
          </div>

          {/* What to write about */}
          <div className="bg-gradient-to-br from-vegetation-50 to-lime-50/60 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-vegetation-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">What I want to hear</h2>
            <ul className="space-y-3 text-gray-700 dark:text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-vegetation-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
                <div>
                  <strong className="text-gray-900 dark:text-slate-100">Errors and outdated information</strong> — if a price is wrong, a link is broken, or a fact doesn&apos;t hold up, please tell me. I&apos;d rather fix it than leave it.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-vegetation-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
                <div>
                  <strong className="text-gray-900 dark:text-slate-100">Better sources</strong> — if you know of a peer-reviewed study or university extension resource I missed, I want to see it.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-vegetation-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
                <div>
                  <strong className="text-gray-900 dark:text-slate-100">Topic requests</strong> — if there&apos;s a hydroponic question you can&apos;t find a good answer to, that&apos;s a guide I should probably write.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-vegetation-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span>
                <div>
                  <strong className="text-gray-900 dark:text-slate-100">General questions</strong> — I&apos;m not a growing expert, but I&apos;m happy to point you toward the right resources.
                </div>
              </li>
            </ul>
          </div>

          {/* What not to send */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <p className="text-amber-800 dark:text-amber-300 text-sm">
              <strong>Please don&apos;t send</strong> sponsored post requests, link exchange proposals, or AI-generated content pitches. They go straight to trash.
            </p>
          </div>

          {/* Newsletter */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Want weekly tips instead?</h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mb-5">One curated hydroponic tip every week. Free, no spam.</p>
            <Link
              href="/blog#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-vegetation-600 text-vegetation-600 dark:text-vegetation-400 dark:border-vegetation-500 font-bold rounded-xl hover:bg-vegetation-600 hover:text-white dark:hover:bg-vegetation-600 dark:hover:text-white transition-all"
            >
              Subscribe to the newsletter
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-vegetation-600 dark:text-vegetation-400 hover:text-vegetation-700 font-semibold text-sm transition-colors">
              ← Back to Hydroponics Central
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
