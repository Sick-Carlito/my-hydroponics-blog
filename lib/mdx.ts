// ============================================
// FILE: lib/mdx.ts
// MDX blog post utilities
// ============================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';
import { calculateReadingTime, getExcerpt } from './utils';

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || getExcerpt(content),
        content,
        date: data.date || new Date().toISOString(),
        readTime: data.readTime || calculateReadingTime(content),
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        author: data.author || {
          name: 'HydroGrow Team',
          bio: 'Passionate about hydroponic gardening',
        },
        featured: data.featured || false,
        image: data.image,
      } as BlogPost;
    });

  // Sort by date (newest first)
  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    // Try .mdx first, then .md
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || getExcerpt(content),
      content,
      date: data.date || new Date().toISOString(),
      readTime: data.readTime || calculateReadingTime(content),
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      author: data.author || {
        name: 'HydroGrow Team',
        bio: 'Passionate about hydroponic gardening',
      },
      featured: data.featured || false,
      image: data.image,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 6): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, limit);
}

// ============================================
// ADD TO: lib/mdx.ts
// Related posts functionality
// ============================================

// Add this function to your existing lib/mdx.ts file

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  
  // Filter out current post
  const otherPosts = allPosts.filter(p => p.slug !== currentPost.slug);
  
  // Calculate relevance score for each post
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets highest score
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Matching tags get medium score
    const matchingTags = post.tags?.filter(tag => 
      currentPost.tags?.includes(tag)
    ) || [];
    score += matchingTags.length * 3;
    
    // More recent posts get slight boost
    const daysDiff = Math.abs(
      new Date(post.date).getTime() - new Date(currentPost.date).getTime()
    ) / (1000 * 60 * 60 * 24);
    if (daysDiff < 30) score += 2;
    if (daysDiff < 7) score += 3;
    
    return { post, score };
  });
  
  // Sort by score and return top N
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}