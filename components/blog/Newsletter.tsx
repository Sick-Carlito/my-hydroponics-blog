// ============================================
// FILE: components/blog/Newsletter.tsx
// Newsletter subscription component
// ============================================

'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call (you'll replace this with actual newsletter service later)
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing! Check your email to confirm.');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1000);

    // TODO: Integrate with actual newsletter service (EmailOctopus, MailerLite, etc.)
    // Example:
    // try {
    //   const response = await fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (response.ok) {
    //     setStatus('success');
    //   } else {
    //     setStatus('error');
    //   }
    // } catch (error) {
    //   setStatus('error');
    // }
  };

  return (
    <div className="bg-gradient-to-br from-ocean-600 via-cyan-500 to-ocean-700 rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Get Weekly Hydroponics Tips
        </h3>
        <p className="text-ocean-50 text-lg mb-8">
          Join 5,000+ growers receiving expert advice, system reviews, and growing tips every week.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-ocean-300 disabled:opacity-50"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === 'loading'}
            className="bg-white text-ocean-600 hover:bg-ocean-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="mt-4 text-green-200 font-semibold">{message}</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-200 font-semibold">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-ocean-100 text-sm mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};