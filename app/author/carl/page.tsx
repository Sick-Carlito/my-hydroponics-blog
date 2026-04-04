import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Carl — Hydroponics Curator | Hydroponics Central',
  description: 'Carl is the researcher and curator behind Hydroponics Central. Not an expert grower — just someone who reads everything so you don\'t have to.',
  openGraph: {
    title: 'Carl — Hydroponics Curator | Hydroponics Central',
    description: 'Carl is the researcher and curator behind Hydroponics Central. Not an expert grower — just someone who reads everything so you don\'t have to.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carl — Hydroponics Curator | Hydroponics Central',
    description: 'Carl is the researcher and curator behind Hydroponics Central.',
  },
};

const baseUrl = siteConfig.url;

export default async function AuthorPage() {
  const allPosts = await getAllBlogPosts();
  const carlPosts = allPosts.filter(
    (post) => !post.author?.name || post.author.name.toLowerCase().includes('carl')
  );

  // JSON-LD Person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Carl',
    url: `${baseUrl}/author/carl`,
    jobTitle: 'Hydroponics Curator & Researcher',
    worksFor: {
      '@type': 'Organization',
      name: 'Hydroponics Central',
      url: baseUrl,
    },
    description: 'Content curator who researches hydroponics guides from trusted sources so readers don\'t have to.',
    sameAs: [
      'https://twitter.com/HydroponicsCentral',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-vegetation-50/50 to-white">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-vegetation-500 to-lime-400 flex items-center justify-center shadow-xl">
                <span className="text-5xl font-black text-white">C</span>
              </div>
            </div>

            {/* Name + Title */}
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-vegetation-600 mb-1">Author & Curator</p>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">Carl</h1>
              <p className="text-lg text-gray-500 font-medium mb-4">Hydroponics Researcher · Hydroponics Central</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-vegetation-100 text-vegetation-700 rounded-full text-sm font-semibold">
                  {carlPosts.length} Articles Published
                </span>
                <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold">
                  Curator · Not a Guru
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">

          {/* Who I am */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-gray-900 mb-4">Who I Am</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              A few years ago, I wanted to grow my own lettuce. Sounds simple. It wasn&apos;t. I spent hours falling down YouTube rabbit holes, reading conflicting Reddit threads, and bookmarking 47 tabs of &quot;definitive guides&quot; that all said different things.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              So I built <strong className="text-vegetation-600">Hydroponics Central</strong> — not as an expert, but as someone willing to do the research <em>for</em> you. I&apos;m not claiming 30 years of commercial growing experience. I&apos;m a content curator who reads everything and tells you what actually works.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every guide I publish is researched from credible sources — USDA, university extensions, peer-reviewed studies — and I always link to them so you can verify everything yourself.
            </p>
          </div>

          {/* How I Research */}
          <div className="bg-gradient-to-br from-vegetation-50 to-lime-50/60 rounded-2xl border border-vegetation-100 p-8">
            <h2 className="text-xl font-black text-gray-900 mb-5">How I Research Every Article</h2>
            <div className="space-y-4">
              {[
                { step: '01', title: 'I start with the science', desc: 'Peer-reviewed studies from PubMed/PMC, USDA resources, and university extension programs like UMN and NMSU. If a claim can\'t be traced to a credible source, it doesn\'t go in.' },
                { step: '02', title: 'I cross-check conflicting advice', desc: 'Hydroponics communities are full of contradicting opinions. I read multiple sources and only include points where credible sources broadly agree — or I flag the disagreement clearly.' },
                { step: '03', title: 'I find what most guides skip', desc: 'I specifically look for the honest caveats, real costs, and common failure points that beginner articles tend to gloss over. That\'s where the real value is.' },
                { step: '04', title: 'I link to every source', desc: 'Every statistic and factual claim in my articles links back to its source. You should never have to take my word for anything.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-vegetation-500 text-white flex items-center justify-center text-xs font-black">
                    {step}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">{title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold text-amber-800 mb-1">A note on expertise</p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  I am not a licensed agronomist, commercial grower, or plant scientist. Everything published on Hydroponics Central is thoroughly researched from credible third-party sources, which are always linked. When in doubt, consult a professional or your local agricultural extension office.
                </p>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Articles by Carl
              <span className="ml-3 text-base font-semibold text-gray-400">({carlPosts.length})</span>
            </h2>

            {carlPosts.length === 0 ? (
              <p className="text-gray-500">No articles published yet. Check back soon.</p>
            ) : (
              <div className="space-y-4">
                {carlPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-5 bg-white rounded-2xl border border-gray-100 p-5 hover:border-vegetation-300 hover:shadow-md transition-all"
                  >
                    {/* Category dot */}
                    <div className="flex-shrink-0 w-1.5 rounded-full bg-vegetation-400 self-stretch" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-vegetation-600 mb-1">
                        {post.category.replace(/-/g, ' ')}
                      </p>
                      <h3 className="font-bold text-gray-900 group-hover:text-vegetation-600 transition-colors leading-snug mb-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                      <p className="text-xs text-gray-400">{formatDate(post.date)}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-vegetation-500 flex-shrink-0 self-center transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <h2 className="text-xl font-black text-gray-900 mb-2">Get in Touch</h2>
            <p className="text-gray-500 mb-5">Found a better source? Spotted an error? I genuinely want to know.</p>
            <a
              href="mailto:hello@hydroponicscentral.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-vegetation-600 text-white font-bold rounded-xl hover:bg-vegetation-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              hello@hydroponicscentral.com
            </a>
            <p className="text-gray-400 text-sm mt-4 italic">I read and respond to every email. 💚</p>
          </div>

          {/* Link back to about */}
          <div className="text-center">
            <Link href="/about" className="text-vegetation-600 hover:text-vegetation-700 font-semibold text-sm transition-colors">
              ← Read the full About page
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
