// ============================================
// FILE: data/categories.ts
// Blog category definitions
// ============================================

import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'beginner-guides',
    name: 'Beginner Guides',
    description: 'Start your hydroponic journey with our comprehensive beginner tutorials',
    color: 'bg-blue-500',
  },
  {
    slug: 'systems',
    name: 'Hydroponic Systems',
    description: 'Learn about different hydroponic systems - DWC, NFT, Ebb & Flow, and more',
    color: 'bg-purple-500',
  },
  {
    slug: 'nutrients',
    name: 'Nutrients & pH',
    description: 'Master nutrient solutions and pH management for optimal plant growth',
    color: 'bg-green-500',
  },
  {
    slug: 'plant-care',
    name: 'Plant Care',
    description: 'Growing tips for specific plants and troubleshooting common issues',
    color: 'bg-orange-500',
  },
  {
    slug: 'diy',
    name: 'DIY Projects',
    description: 'Build your own hydroponic systems with our step-by-step guides',
    color: 'bg-teal-500',
  },
  {
    slug: 'advanced',
    name: 'Advanced Techniques',
    description: 'Take your hydroponic skills to the next level with advanced methods',
    color: 'bg-pink-500',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getCategoryColor = (slug: string): string => {
  const category = getCategoryBySlug(slug);
  return category?.color || 'bg-gray-500';
};