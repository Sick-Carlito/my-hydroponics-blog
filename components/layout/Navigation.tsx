// ============================================
// FILE: components/layout/Navigation.tsx
// Navigation with custom hydroponics droplet
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HydroDroplet } from '@/components/ui/HydroDroplet';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Custom Hydro Droplet - NOT animated in nav */}
            <div className="w-10 h-10 rounded-xl bg-white shadow-md group-hover:shadow-lg transition-all group-hover:scale-105 flex items-center justify-center">
              <HydroDroplet size={32} animated={false} />
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none bg-gradient-to-r from-cyan-600 via-green-600 to-green-700 bg-clip-text text-transparent">
                Hydroponics Central
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide leading-none mt-0.5">
                Your Hub for Everything Hydroponics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Subscribe Button */}
            <Link href="/blog#newsletter">
              <button 
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-bold rounded-lg hover:from-cyan-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Subscribe Button */}
              <Link href="/blog#newsletter" onClick={() => setIsMobileMenuOpen(false)}>
                <button 
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-bold rounded-lg hover:from-cyan-700 hover:to-green-700 transition-all shadow-md"
                >
                  Subscribe
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};