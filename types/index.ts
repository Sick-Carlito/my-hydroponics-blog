// ============================================
// FILE: types/index.ts
// Type definitions - FIXED with linkedin
// ============================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
  author?: Author;
  image?: string;
  featured?: boolean;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;  // ADDED THIS
    instagram?: string;
    facebook?: string;
    github?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color?: string;        // ADDED THIS
  activeColor: string;
  inactiveColor: string;
}