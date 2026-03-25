// ============================================
// FILE: components/blog/Newsletter.tsx
// Newsletter with GREEN GRADIENT + Server API
// ============================================

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Call our Next.js API route (server-side)
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        
        if (data.alreadySubscribed) {
          setMessage('✅ You\'re already subscribed! Check your inbox for our emails.');
        } else {
          setMessage('🎉 Thanks for subscribing! Check your email to confirm.');
        }
        
        setEmail('');
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Oops! Something went wrong. Please try again.');
      console.error('Newsletter error:', error);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-br from-vegetation-600 via-lime-500 to-vegetation-700 rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Get Weekly Hydroponics Tips
        </h3>
        <p className="text-vegetation-50 text-lg mb-8">
          Join 1,000+ growers receiving expert advice, system reviews, and growing tips every week.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="bg-white flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-vegetation-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={status === 'loading'}
            className="text-vegetation-600 hover:bg-vegetation-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
            <p className="text-white font-semibold">{message}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
            <p className="text-white font-semibold">{message}</p>
          </div>
        )}

        <p className="text-vegetation-100 text-sm mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};