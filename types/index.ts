// ============================================
// FILE: types/index.ts
// Type definitions - COMPLETE
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
    linkedin?: string;
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
  color?: string;
  activeColor: string;
  inactiveColor: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title?: string;
  description: string;
  url: string;
  author: {
    name: string;
    bio?: string;
    avatar?: string;
    email?: string;
    twitter?: string;
    social?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      github?: string;
      youtube?: string;
      pinterest?: string;
    };
  };
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    pinterest?: string;
  };
  newsletter?: {
    enabled: boolean;
    provider?: string;
  };
}