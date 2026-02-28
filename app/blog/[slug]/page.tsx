// ============================================
// FILE: app/blog/[slug]/page.tsx
// Individual blog post with related posts & improved SEO
// ============================================

import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/blog/BlogPostClient';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Newsletter } from '@/components/blog/Newsletter';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/mdx';

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

  const publishedTime = new Date(post.date).toISOString();
  const url = `https://yourdomain.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author?.name || 'HydroGrow Team' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime,
      authors: [post.author?.name || 'HydroGrow Team'],
      url,
      images: [
        {
          url: post.image || `https://yourdomain.com/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || `https://yourdomain.com/og-default.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(post, 3);

  // JSON-LD structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image || 'https://yourdomain.com/default-og.jpg',
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author?.name || 'HydroGrow Team',
      url: 'https://yourdomain.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HydroGrow',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Blog Post Content */}
      <BlogPostClient post={post} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="light" padding="lg">
          <Container>
            <RelatedPosts posts={relatedPosts} />
          </Container>
        </Section>
      )}

      {/* Newsletter */}
      <Section variant="default" padding="lg">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </>
  );
}