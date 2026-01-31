// ============================================
// FILE: data/siteConfig.ts
// Site-wide configuration
// ============================================

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Hydroponics Blog',
  title: 'HydroGrow - Your Complete Guide to Hydroponic Gardening',
  description: 'Learn everything about hydroponics - from beginner setups to advanced techniques. Grow fresh produce faster, cleaner, and year-round with our expert guides.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  author: {
    name: 'Your Name', // Change this to your name
    bio: 'Hydroponic gardening enthusiast and educator. Helping people grow their own fresh food using modern soilless techniques.',
    avatar: '/images/avatar.jpg', // Add your avatar image
    social: {
      twitter: 'https://twitter.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
    },
  },

  social: {
    twitter: 'https://twitter.com/hydrogrow',
    facebook: 'https://facebook.com/hydrogrow',
    instagram: 'https://instagram.com/hydrogrow',
    youtube: 'https://youtube.com/@hydrogrow',
    pinterest: 'https://pinterest.com/hydrogrow',
  },

  newsletter: {
    enabled: true,
    provider: 'emailoctopus', // or 'mailerlite', 'convertkit', etc.
  },
};