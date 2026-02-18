// ============================================
// FILE: app/blog/[slug]/page.tsx
// Individual blog post page - USES BlogPostClient
// ============================================

import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/blog/BlogPostClient';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - HydroGrow Blog`,
    description: post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pass the post to the client component
  return <BlogPostClient post={post} />;
}