import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Hydroponics Central',
  description: 'How Hydroponics Central collects, uses, and protects your data.',
  openGraph: {
    title: 'Privacy Policy — Hydroponics Central',
    description: 'How Hydroponics Central collects, uses, and protects your data.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-slate-900">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        <h1 className="text-4xl font-black text-gray-900 dark:text-slate-100 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 dark:text-slate-500 text-sm mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-gray-700 dark:text-slate-300 leading-relaxed">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">The short version</h2>
            <p>
              Hydroponics Central collects only what it needs to run: your email address if you subscribe to the newsletter, and anonymous usage data through Google Analytics. We don&apos;t sell your data. We don&apos;t share it except with the services listed below that help run this site.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 space-y-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">What we collect and why</h2>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-1">Newsletter subscriptions</h3>
              <p className="text-sm">
                If you subscribe to the Hydroponics Central newsletter, we collect your email address. It is stored by <strong>EmailOctopus</strong> and used only to send you the newsletter you signed up for. You can unsubscribe at any time using the link in any email we send. We never add you to any list without your explicit opt-in.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-1">Analytics</h3>
              <p className="text-sm">
                We use <strong>Google Analytics</strong> (via Google Tag Manager) to understand which articles are read and how visitors find the site. This data is anonymous and aggregated — we cannot identify individual visitors. Google&apos;s privacy policy governs how that data is handled on their end.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-1">Affiliate links</h3>
              <p className="text-sm">
                Some links on this site are affiliate links, primarily to Amazon. If you click one and make a purchase, we may earn a small commission at no extra cost to you. Clicking an affiliate link does not give us any personal information about you.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-1">No cookies beyond analytics</h3>
              <p className="text-sm">
                We do not set any first-party cookies. Google Analytics uses its own cookies as described in Google&apos;s data policy. We do not use advertising cookies, retargeting, or tracking pixels.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Third-party services</h2>
            <ul className="space-y-2 text-sm">
              <li><strong className="text-gray-900 dark:text-slate-100">EmailOctopus</strong> — stores and sends the newsletter. Their privacy policy applies to how they handle your email address.</li>
              <li><strong className="text-gray-900 dark:text-slate-100">Google Analytics / Tag Manager</strong> — anonymous site traffic data.</li>
              <li><strong className="text-gray-900 dark:text-slate-100">Vercel</strong> — hosts this website. Standard server logs (IP address, browser, page requested) are retained per Vercel&apos;s data retention policy.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Your rights</h2>
            <p className="text-sm mb-3">
              If you are based in the EU or UK, you have rights under GDPR including the right to access, correct, or delete your data. If you are in California, you have rights under CCPA.
            </p>
            <p className="text-sm">
              To exercise any of these rights — or if you have any privacy-related question — email us at{' '}
              <a href="mailto:hello@hydroponicscentral.com" className="text-vegetation-600 dark:text-vegetation-400 hover:underline font-medium">
                hello@hydroponicscentral.com
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">Changes to this policy</h2>
            <p className="text-sm">
              If we make any material changes to this policy, we will update the date at the top of this page. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
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
