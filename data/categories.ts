// ============================================
// FILE: data/categories.ts
// Category definitions - COMPLETE with all required fields
// ============================================

import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'beginner-guides',
    name: 'Beginner Guides',
    description: 'Start your hydroponic journey — first builds, first crops, and everything you need to know before spending a dollar',
    icon: '🌱',
    color: 'bg-blue-500',
    activeColor: 'bg-blue-500 text-white',
    inactiveColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
  {
    slug: 'systems-and-setups',
    name: 'Systems & Setups',
    description: 'Every hydroponic system type explained — DWC, NFT, Kratky, ebb and flow, and how to choose the right one for your space',
    icon: '⚙️',
    color: 'bg-purple-500',
    activeColor: 'bg-purple-500 text-white',
    inactiveColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  },
  {
    slug: 'crops-and-growing',
    name: 'Crops & Growing',
    description: 'Which crops grow best hydroponically, how to grow them, and the real numbers on yield, harvest time, and nutrients',
    icon: '🌿',
    color: 'bg-orange-500',
    activeColor: 'bg-orange-500 text-white',
    inactiveColor: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  },
  {
    slug: 'diy',
    name: 'DIY',
    description: 'Build your own hydroponic systems from common parts — with real parts lists, costs, and step-by-step instructions',
    icon: '🔧',
    color: 'bg-teal-500',
    activeColor: 'bg-teal-500 text-white',
    inactiveColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
  },
  {
    slug: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Diagnose and fix the most common hydroponic problems — yellowing leaves, root rot, pH drift, algae, and more',
    icon: '🔍',
    color: 'bg-amber-500',
    activeColor: 'bg-amber-500 text-white',
    inactiveColor: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};