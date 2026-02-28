// ============================================
// FILE: app/blog/page.tsx
// Blog listing page with search
// ============================================

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Newsletter } from '@/components/blog/Newsletter';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { getAllBlogPosts, getFeaturedPosts } from '@/lib/mdx';

export const metadata = {
  title: 'Blog - HydroGrow',
  description: 'Learn everything about hydroponics with our expert guides, tips, and tutorials.',
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();
  const featuredPosts = await getFeaturedPosts();
  const featuredPost = featuredPosts[0];

  return (
    <div>
      {/* Hero Section */}
      <Section variant="ocean" padding="lg">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hydroponics Blog
            </h1>
            <p className="text-xl md:text-2xl text-vegetation-50 max-w-3xl mx-auto">
              Expert guides, tips, and tutorials for growing fresh produce with hydroponics
            </p>
          </div>
        </Container>
      </Section>

      {/* Featured Post */}
      {featuredPost && (
        <Section variant="light" padding="md">
          <Container>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Article</h2>
            <FeaturedPost post={featuredPost} />
          </Container>
        </Section>
      )}

      {/* Category Filter */}
      <Section variant="default" padding="md" id="categories">
        <Container>
          <CategoryFilter />
        </Container>
      </Section>

      {/* Search & All Posts */}
      <Section variant="light" padding="lg">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            All Articles
          </h2>
          
          {allPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts found.</p>
              <p className="text-gray-500 mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <BlogSearch posts={allPosts} />
          )}
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="default" padding="lg" id="newsletter">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </div>
  );
}