// ============================================
// FILE: app/page.tsx
// Updated homepage with blog posts
// ============================================

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { Newsletter } from '@/components/blog/Newsletter';
import { getRecentPosts } from '@/lib/mdx';
import Link from 'next/link';

export default async function HomePage() {
  const recentPosts = await getRecentPosts(6);

  return (
    <div>
      {/* Hero Section */}
      <Section variant="ocean" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Grow Smarter with Hydroponics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-ocean-50 max-w-3xl mx-auto">
              Your complete guide to soilless gardening. Learn to grow fresh produce faster, cleaner, and year-round.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Start Learning
                </Button>
              </Link>
              <Link href="/blog#categories">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Hydroponics Section */}
      <Section variant="light" padding="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Hydroponics?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of modern soilless gardening
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-ocean-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Faster Growth</h3>
              <p className="text-gray-600">Plants grow up to 50% faster than traditional soil gardening</p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Save Money</h3>
              <p className="text-gray-600">Use 90% less water and reduce your grocery bills significantly</p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Any Space</h3>
              <p className="text-gray-600">Perfect for apartments, balconies, and small indoor spaces</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest Blog Posts */}
      <Section variant="default" padding="lg">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Latest Articles
              </h2>
              <p className="text-gray-600">
                Expert guides and tips for hydroponic gardening
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline">
                View All
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section variant="default" padding="lg">
        <Container>
          <Newsletter />
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Growing?
            </h2>
            <p className="text-xl text-ocean-50 mb-8 max-w-2xl mx-auto">
              Join thousands of hydroponic gardeners and start your journey today!
            </p>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="text-ocean-600 hover:bg-ocean-50">
                Explore Our Guides
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}