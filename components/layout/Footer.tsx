// ============================================
// FILE: components/layout/Footer.tsx
// Footer with custom hydroponics droplet
// ============================================

import React from 'react';
import Link from 'next/link';
import { HydroDroplet } from '@/components/ui/HydroDroplet';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/blog?category=beginner-guides' },
      { label: 'Systems', href: '/blog?category=systems' },
      { label: 'About', href: '/about' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              {/* Custom Hydro Droplet */}
              <div className="w-10 h-10 rounded-xl bg-gray-800 shadow-md group-hover:shadow-lg transition-all flex items-center justify-center">
                <HydroDroplet size={32} animated={false} />
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none bg-gradient-to-r from-cyan-400 via-green-400 to-green-500 bg-clip-text text-transparent">
                  Hydroponics Central
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide leading-none mt-0.5">
                  Your Hub for Everything Hydroponics
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-md mt-4">
              Curating the best guides, tips, and resources for hydroponic growers. 
              From beginner basics to advanced techniques - we bring you quality content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Content</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Info</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Hydroponics Central. Growing without soil, powered by water.
          </p>

        </div>
      </div>
    </footer>
  );
};