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
import { siteConfig } from '@/data/siteConfig';

const baseUrl = siteConfig.url;

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
  const url = `${baseUrl}/blog/${post.slug}`;

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
          url: post.image || `${baseUrl}/og-default.jpg`,
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
      images: [post.image || `${baseUrl}/og-default.jpg`],
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

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image || `${baseUrl}/og-image.jpg`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Carl',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hydroponics Central',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  // FAQPage JSON-LD (only when post has FAQs — earns Google "People Also Ask" rich results)
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null;

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${baseUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQ schema — only rendered when post has FAQs */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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