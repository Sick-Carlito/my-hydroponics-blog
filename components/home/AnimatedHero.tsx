// ============================================
// FILE: components/home/AnimatedHero.tsx
// Epic animated hero with hydroponics droplet
// ============================================

import Link from 'next/link';
import { HydroDroplet } from '@/components/ui/HydroDroplet';

export const AnimatedHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-green-50 to-lime-50">
      {/* Animated background elements — hidden on mobile for paint performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating droplets — desktop only */}
        <div className="hidden md:block absolute top-20 left-[10%] opacity-10 animate-hero-float">
          <HydroDroplet size={80} animated={false} />
        </div>
        <div className="hidden md:block absolute top-40 right-[15%] opacity-10 animate-hero-float-delayed">
          <HydroDroplet size={60} animated={false} />
        </div>
        <div className="hidden md:block absolute bottom-32 left-[20%] opacity-10 animate-hero-float">
          <HydroDroplet size={100} animated={false} />
        </div>
        <div className="hidden md:block absolute bottom-20 right-[25%] opacity-10 animate-hero-float-delayed">
          <HydroDroplet size={70} animated={false} />
        </div>

        {/* Gradient blur circles — desktop only (blur-3xl is expensive on mobile GPU) */}
        <div className="hidden md:block absolute top-1/4 -left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-hero-pulse-slow" />
        <div className="hidden md:block absolute bottom-1/4 -right-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-hero-pulse-slow-delayed" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Giant animated droplet */}
        <div className="flex justify-center mb-12">
          <div className="relative" style={{ paddingTop: '40px' }}>
            {/* Shadow beneath droplet */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-r from-cyan-900/20 via-green-900/30 to-cyan-900/20 rounded-full blur-xl" />

            {/* Ripple effect behind droplet */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/30 to-green-400/30 animate-hero-ripple" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/20 to-green-400/20 animate-hero-ripple-delayed" />
            </div>

            {/* Main droplet */}
            <div className="relative z-10">
              <HydroDroplet size={140} animated={true} />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-600 via-green-600 to-green-700 bg-clip-text text-transparent">
            Hydroponics Central
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold animate-hero-fade-in">
          Your Hub for Everything Hydroponics
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-hero-fade-in-delayed">
          Curating the <span className="text-cyan-600 font-semibold">best guides</span>,
          <span className="text-green-600 font-semibold"> expert tips</span>, and
          <span className="text-green-700 font-semibold"> proven resources</span> for
          growing fresh produce without soil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-hero-fade-in-more-delayed">
          <Link href="/blog">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
              Browse All Guides
              <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>

          <Link href="/blog#newsletter">
            <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:border-green-500 hover:text-green-600 transition-all shadow-md hover:shadow-lg hover:scale-105 transform">
              Get Weekly Tips
              <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200 animate-hero-fade-in-latest">
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-semibold">
            Trusted by Growers Worldwide
          </p>
        </div>
      </div>
    </section>
  );
};
