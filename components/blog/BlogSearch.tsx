// ============================================
// FILE: components/blog/BlogSearch.tsx
// Search functionality for blog
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/types';
import { BlogPostCard } from './BlogPostCard';

interface BlogSearchProps {
  posts: BlogPost[];
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ posts }) => {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;

    const lowerQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [posts, query]);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="search"
            placeholder="Search articles by title, category, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-vegetation-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
            aria-label="Search blog posts"
          />
          <svg
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results Count */}
        {query && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              {filteredPosts.length === 0 ? (
                <span className="text-red-600 font-medium">No articles found</span>
              ) : (
                <>
                  Found <span className="font-bold text-vegetation-600">{filteredPosts.length}</span> article
                  {filteredPosts.length !== 1 ? 's' : ''}
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredPosts.length === 0 && query ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-4">
            Try searching with different keywords or browse all articles below
          </p>
          <button
            onClick={() => setQuery('')}
            className="px-6 py-2 bg-vegetation-600 hover:bg-vegetation-700 text-white rounded-lg font-semibold transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};