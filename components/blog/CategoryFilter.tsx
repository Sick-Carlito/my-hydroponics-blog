// ============================================
// FILE: components/blog/CategoryFilter.tsx
// Category filter - FIXED active button
// ============================================

'use client';

import React, { useState } from 'react';
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

  const activeClass = 'text-white shadow-lg';
  const inactiveClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* All Posts button */}
      <button
        onClick={() => handleCategoryClick(null)}
        style={activeCategory === null ? { backgroundColor: '#16a34a' } : {}}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          activeCategory === null ? activeClass : inactiveClass
        }`}
      >
        All Posts
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          style={activeCategory === category.slug ? { backgroundColor: '#16a34a' } : {}}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            activeCategory === category.slug ? activeClass : inactiveClass
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};