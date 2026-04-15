// ============================================
// FILE: components/blog/FeaturedPost.tsx
// Featured post - FULLY CLICKABLE
// ============================================

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types';

interface FeaturedPostProps {
  post: BlogPost;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const getBadgeVariant = (category: string) => {
    const variants: Record<string, any> = {
      'beginner-guides': 'blue',
      'systems-and-setups': 'purple',
      'crops-and-growing': 'orange',
      'diy': 'cyan',
      'troubleshooting': 'ocean',
    };
    return variants[category] || 'ocean';
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card variant="elevated" padding="none" className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="md:flex">
          {/* Image - OPTIMIZED with Next.js Image */}
          <div className="relative md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-vegetation-400 to-lime-600 overflow-hidden">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority // Load featured image first
              />
            ) : (
              <div className="flex items-center justify-center h-full p-12">
                <div className="text-center text-white">
                  <svg
                    className="w-32 h-32 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
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
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-8">
            <Badge variant={getBadgeVariant(post.category)} className="mb-3">
              {post.category.replace('-', ' ')}
            </Badge>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-slate-100 group-hover:text-vegetation-600 dark:group-hover:text-vegetation-400 transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-slate-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center text-sm text-gray-500 dark:text-slate-500 mb-6">
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Visual indicator - arrow that moves on hover */}
            <div className="inline-flex items-center text-vegetation-600 font-semibold group-hover:gap-3 gap-2 transition-all">
              Read Full Article
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};