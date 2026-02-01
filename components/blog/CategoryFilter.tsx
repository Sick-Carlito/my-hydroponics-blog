// ============================================
// FILE: components/blog/CategoryFilter.tsx
// Category filter component
// ============================================

'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { categories } from '@/data/categories';

interface CategoryFilterProps {
  onFilterChange?: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    if (onFilterChange) {
      onFilterChange(categorySlug);
    }
  };

  const getBadgeVariant = (slug: string) => {
    const variants: Record<string, any> = {
      'beginner-guides': 'blue',
      'systems': 'purple',
      'nutrients': 'green',
      'plant-care': 'orange',
      'diy': 'cyan',
      'advanced': 'pink',
    };
    return variants[slug] || 'ocean';
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          activeCategory === null
            ? 'bg-ocean-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </button>

      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            activeCategory === category.slug
              ? 'bg-ocean-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};