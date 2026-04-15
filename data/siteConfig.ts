// ============================================
// FILE: data/siteConfig.ts
// Site-wide configuration
// ============================================

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Hydroponics Central',
  title: 'Hydroponics Central - Your Complete Guide to Hydroponic Gardening',
  description: 'Learn everything about hydroponics - from beginner setups to advanced techniques. Grow fresh produce faster, cleaner, and year-round with our expert guides.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hydroponics-central.vercel.app',
  
  author: {
    name: 'Carl', // Change this to your name
    bio: 'Hydroponic gardening enthusiast and educator. Helping people grow their own fresh food using modern soilless techniques.',
    avatar: '/images/avatar.jpg', // Add your avatar image
  },

  newsletter: {
    enabled: true,
    provider: 'emailoctopus', // or 'mailerlite', 'convertkit', etc.
  },
};