// ============================================
// FILE: data/categories.ts
// Category definitions - COMPLETE with all required fields
// ============================================

import { Category } from '@/types';

export const categories: Category[] = [
  {
    slug: 'beginner-guides',
    name: 'Beginner Guides',
    description: 'Start your hydroponic journey with our comprehensive beginner tutorials',
    icon: '🌱', // Seedling
    color: 'bg-blue-500',
    activeColor: 'bg-blue-500 text-white',
    inactiveColor: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
  {
    slug: 'systems',
    name: 'Systems',
    description: 'Explore different hydroponic system types and setups',
    icon: '⚙️', // Gear
    color: 'bg-purple-500',
    activeColor: 'bg-purple-500 text-white',
    inactiveColor: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  },
  {
    slug: 'nutrients',
    name: 'Nutrients',
    description: 'Master nutrient solutions and feeding schedules',
    icon: '💧', // Water droplet
    color: 'bg-green-500',
    activeColor: 'bg-green-500 text-white',
    inactiveColor: 'bg-green-100 text-green-700 hover:bg-green-200',
  },
  {
    slug: 'plant-care',
    name: 'Plant Care',
    description: 'Tips and techniques for healthy plant growth',
    icon: '🌿', // Herb
    color: 'bg-orange-500',
    activeColor: 'bg-orange-500 text-white',
    inactiveColor: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  },
  {
    slug: 'diy',
    name: 'DIY',
    description: 'Build your own hydroponic systems and equipment',
    icon: '🔧', // Wrench
    color: 'bg-teal-500',
    activeColor: 'bg-teal-500 text-white',
    inactiveColor: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
  },
  {
    slug: 'advanced',
    name: 'Advanced',
    description: 'Advanced techniques for experienced growers',
    icon: '🎓', // Graduation cap
    color: 'bg-pink-500',
    activeColor: 'bg-pink-500 text-white',
    inactiveColor: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};