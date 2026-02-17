// ============================================
// FILE: types/index.ts
// TypeScript type definitions
// ============================================

export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    instagram?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author?: Author;
  featured?: boolean;
  image?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
  activeColor: string;    // ← NEW: full active button classes
  inactiveColor: string;  // ← NEW: full inactive button classes
  icon?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: Author;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface NavLink {
  href: string;
  label: string;
}