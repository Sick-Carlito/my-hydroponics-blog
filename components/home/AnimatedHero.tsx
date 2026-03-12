// ============================================
// FILE: components/home/AnimatedHero.tsx
// Epic animated hero with hydroponics droplet
// ============================================

'use client';

import React from 'react';
import Link from 'next/link';
import { HydroDroplet } from '@/components/ui/HydroDroplet';

export const AnimatedHero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-green-50 to-lime-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating droplets in background */}
        <div className="absolute top-20 left-[10%] opacity-10 animate-float">
          <HydroDroplet size={80} animated={false} />
        </div>
        <div className="absolute top-40 right-[15%] opacity-10 animate-float-delayed">
          <HydroDroplet size={60} animated={false} />
        </div>
        <div className="absolute bottom-32 left-[20%] opacity-10 animate-float">
          <HydroDroplet size={100} animated={false} />
        </div>
        <div className="absolute bottom-20 right-[25%] opacity-10 animate-float-delayed">
          <HydroDroplet size={70} animated={false} />
        </div>

        {/* Gradient circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
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
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/30 to-green-400/30 animate-ripple" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-300">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/20 to-green-400/20 animate-ripple" />
            </div>
            
            {/* Main droplet - ANIMATED! */}
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

        {/* Tagline with animation */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-semibold animate-fade-in">
          Your Hub for Everything Hydroponics
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-delayed">
          Curating the <span className="text-cyan-600 font-semibold">best guides</span>, 
          <span className="text-green-600 font-semibold"> expert tips</span>, and 
          <span className="text-green-700 font-semibold"> proven resources</span> for 
          growing fresh produce without soil.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-more-delayed">
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
        <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in-latest">
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-semibold">
            Trusted by Growers Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">500+ Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
              <span className="font-medium">10K+ Growers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">Daily Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
        }

        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow 4s ease-in-out 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.2s backwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.4s backwards;
        }

        .animate-fade-in-more-delayed {
          animation: fade-in 0.8s ease-out 0.6s backwards;
        }

        .animate-fade-in-latest {
          animation: fade-in 0.8s ease-out 0.8s backwards;
        }
      `}</style>
    </section>
  );
};