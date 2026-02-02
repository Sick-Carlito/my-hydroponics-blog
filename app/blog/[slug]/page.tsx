// ============================================
// FILE: app/blog/[slug]/page.tsx
// Individual blog post page
// ============================================

import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Newsletter } from '@/components/blog/Newsletter';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { marked } from 'marked';
import Link from 'next/link';

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

  // Convert markdown to HTML
  const contentHtml = marked(post.content);

  const getBadgeVariant = (category: string) => {
    const variants: Record<string, any> = {
      'beginner-guides': 'blue',
      'systems': 'purple',
      'nutrients': 'green',
      'plant-care': 'orange',
      'diy': 'cyan',
      'advanced': 'pink',
    };
    return variants[category] || 'ocean';
  };

  return (
    <div>
      {/* Article Header */}
      <Section variant="light" padding="lg">
        <Container size="md">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Button>
            </Link>
          </div>

          <Badge variant={getBadgeVariant(post.category)} className="mb-4">
            {post.category.replace('-', ' ')}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Article Content */}
      <Section variant="default" padding="lg">
        <Container size="md">
          <article 
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mb-4
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-ocean-600 prose-a:no-underline hover:prose-a:text-ocean-700
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-ocean-500 prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:text-ocean-600 prose-code:bg-ocean-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:text-slate-100
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Author Bio */}
          {post.author && (
            <div className="mt-12 p-6 bg-ocean-50 rounded-xl border-2 border-ocean-200">
              <div className="flex items-start gap-4">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-1">
                    About {post.author.name}
                  </h4>
                  <p className="text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Articles
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="light" padding="lg">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </div>
  );
}