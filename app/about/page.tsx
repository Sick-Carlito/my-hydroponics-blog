import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Carl - Hydroponics Central',
  description: 'Meet Carl, the curator behind Hydroponics Central. Not an expert — just someone who reads everything about hydroponics so you don\'t have to.',
  openGraph: {
    title: 'About Carl - Hydroponics Central',
    description: 'Meet Carl, the curator behind Hydroponics Central. Not an expert — just someone who reads everything about hydroponics so you don\'t have to.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Carl - Hydroponics Central',
    description: 'Meet Carl, the curator behind Hydroponics Central.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-600 via-green-600 to-green-700 bg-clip-text text-transparent">
            About Hydroponics Central
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold">
            Hi, I'm Carl. I'm Not an Expert — I'm Your Research Assistant.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Opening Story */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              A few years ago, I wanted to grow my own lettuce. Sounds simple, right?
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Wrong.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              I spent <strong>hours</strong> falling down YouTube rabbit holes. I read conflicting Reddit threads. I bookmarked 47 tabs of "definitive guides" that all said different things.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              That's when I realized: <strong>the information exists, but it's scattered everywhere.</strong>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              So I started <strong className="text-green-600">Hydroponics Central</strong> — not as an expert, but as someone who's willing to do the research <em>for</em> you.
            </p>
          </div>

          {/* What I Do */}
          <div className="bg-gradient-to-br from-cyan-50 to-green-50 rounded-2xl p-8 mb-8 border border-green-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What I Actually Do</h2>
            <p className="text-gray-700 mb-4">Every week, I:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Read through those 47-tab browser sessions so you don't have to</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Compare conflicting advice from multiple sources</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Research what different experts recommend</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Organize everything into clear, beginner-friendly guides</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Share it all here — free, no BS</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-6 font-semibold">
              I'm not claiming to have 30 years of commercial growing experience. I'm a content curator who reads <em>everything</em> and tells you what actually works.
            </p>
          </div>

          {/* My Approach */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Approach</h2>
            <p className="text-gray-700 mb-4">I believe in:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔍</span>
                <div>
                  <h3 className="font-bold text-gray-900">Transparency</h3>
                  <p className="text-gray-600 text-sm">I cite my sources and link to original creators</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">💚</span>
                <div>
                  <h3 className="font-bold text-gray-900">Honesty</h3>
                  <p className="text-gray-600 text-sm">If I'm not sure, I say so</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✨</span>
                <div>
                  <h3 className="font-bold text-gray-900">Simplicity</h3>
                  <p className="text-gray-600 text-sm">No jargon. Explained like you're my friend.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <h3 className="font-bold text-gray-900">Reality</h3>
                  <p className="text-gray-600 text-sm">I recommend what I'd actually tell someone starting out</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-6 italic">
              I make money through honest affiliate links (which I clearly mark). No sponsored posts. No hidden agendas.
            </p>
          </div>

          {/* What You'll Find */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Find Here</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-600 mb-2">📚 Beginner Guides</h3>
                <p className="text-gray-600 text-sm">Assuming zero knowledge</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600 mb-2">⚖️ System Comparisons</h3>
                <p className="text-gray-600 text-sm">DWC vs. NFT vs. Kratky, actually explained</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600 mb-2">🔗 Curated Resources</h3>
                <p className="text-gray-600 text-sm">The best tutorials from across the web</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600 mb-2">⭐ Honest Reviews</h3>
                <p className="text-gray-600 text-sm">Researched product roundups</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600 mb-2">🔧 Troubleshooting</h3>
                <p className="text-gray-600 text-sm">Common problems, multiple solutions</p>
              </div>
              <div>
                <h3 className="font-bold text-green-600 mb-2">💡 Quick Tips</h3>
                <p className="text-gray-600 text-sm">Weekly practical advice you can use immediately</p>
              </div>
            </div>
          </div>

          {/* Why I Care */}
          <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl p-8 mb-8 border border-green-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why I Care About This</h2>
            <p className="text-gray-700 mb-4">Hydroponics is amazing because:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🏠</span>
                <span>You can grow food in an apartment</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">💧</span>
                <span>It uses 90% less water than soil</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🌿</span>
                <span>Fresh herbs year-round (seriously life-changing)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🎉</span>
                <span>It's fun to see things actually grow</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-6 font-semibold">
              But the learning curve is unnecessarily steep because information is everywhere and nowhere at the same time.
            </p>
            <p className="text-lg text-green-600 font-bold mt-4">
              I'm here to fix that.
            </p>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl shadow-xl p-8 mb-8 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join the Community</h2>
            <p className="text-lg mb-2">Every week, I send one curated guide + one quick tip.</p>
            <p className="text-xl font-bold mb-6">1,000+ growers subscribed. No spam. Just good content.</p>
            <Link href="/blog#newsletter">
              <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
                Get Weekly Tips →
              </button>
            </Link>
          </div>

          {/* Connect */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-gray-700 mb-6">Questions? Found a great resource?</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <a href="mailto:hello@hydroponicscentral.com" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                hello@hydroponicscentral.com
              </a>
              <a href="https://twitter.com/hydroponicscentral" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                @HydroponicsCentral
              </a>
            </div>
            <p className="text-gray-600 text-sm italic">I actually read and respond. 💚</p>
          </div>

          {/* Signature */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-lg text-gray-600 font-semibold mb-3">
              — Carl, Hydroponics Curator
            </p>
            <Link
              href="/author/carl"
              className="inline-flex items-center gap-2 text-vegetation-600 hover:text-vegetation-700 font-semibold text-sm transition-colors"
            >
              View all my articles →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}