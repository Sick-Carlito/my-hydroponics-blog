// ============================================
// FILE: components/blog/RelatedPosts.tsx
// Related posts section
// ============================================

import { BlogPost } from '@/types';
import { BlogPostCard } from './BlogPostCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-vegetation-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-vegetation-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Continue Reading</h2>
          <p className="text-gray-500 text-sm">Articles you might find interesting</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};