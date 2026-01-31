// ============================================
// FILE: types/index.ts
// Core type definitions for the blog
// ============================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: Author;
  featured: boolean;
  image?: string;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
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
    pinterest?: string;
  };
  newsletter: {
    enabled: boolean;
    provider?: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}