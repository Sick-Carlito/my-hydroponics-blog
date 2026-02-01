// ============================================
// FILE: components/blog/FeaturedPost.tsx
// Featured blog post component
// ============================================

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types';

interface FeaturedPostProps {
  post: BlogPost;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
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
    <Card variant="elevated" padding="none" className="overflow-hidden">
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/2 bg-gradient-to-br from-ocean-400 to-cyan-600 p-12 flex items-center justify-center">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white">
              <svg
                className="w-32 h-32 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl font-semibold">Featured Guide</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8">
          <Badge variant={getBadgeVariant(post.category)} className="mb-3">
            {post.category.replace('-', ' ')}
          </Badge>

          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            {post.title}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>{formatDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <Button variant="primary">
              Read Full Article
              <svg
                className="w-4 h-4 ml-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};