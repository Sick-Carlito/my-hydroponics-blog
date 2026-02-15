// ============================================
// FILE: components/blog/BlogPostClient.tsx
// Client Component with TOC, Progress Bar, Interactive Elements
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Newsletter } from '@/components/blog/Newsletter';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types';
import { marked } from 'marked';

interface BlogPostClientProps {
  post: BlogPost;
}

export const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [contentHtml, setContentHtml] = useState('');

  // Convert markdown to HTML
  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await marked(post.content);
      setContentHtml(html as string);
    };
    convertMarkdown();
  }, [post.content]);

  const getBadgeVariant = (category: string) => {
    const variants: Record<string, any> = {
      'beginner-guides': 'blue',
      'systems': 'purple',
      'nutrients': 'green',
      'plant-care': 'orange',
      'diy': 'cyan',
      'advanced': 'pink',
    };
    return variants[category] || 'vegetation';
  };

  // Extract headings for TOC
  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3');
    
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent || '';
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      heading.id = id; // Add ID to heading
      
      return {
        id,
        text,
        level: parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(extractedHeadings);
  }, [contentHtml]);

  // Scroll progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Show back to top button
      setShowBackToTop(scrolled > 400);

      // Active section detection
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(element.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share functions
  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = post.title;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-vegetation-600 to-lime-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Header */}
      <Section variant="light" padding="lg" className="pt-24">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="font-medium">{formatDate(post.date)}</span>
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
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Buttons - Mobile */}
            <div className="flex gap-3 mb-8 lg:hidden">
              <button
                onClick={shareOnTwitter}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
              >
                Share on Twitter
              </button>
              <button
                onClick={shareOnFacebook}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium"
              >
                Share on Facebook
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content Area with Sidebar */}
      <Section variant="default" padding="lg">
        <Container size="lg">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sticky Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-vegetation-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToSection(heading.id)}
                          className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                            activeSection === heading.id
                              ? 'bg-vegetation-100 text-vegetation-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-100'
                          } ${heading.level === 3 ? 'pl-6' : ''}`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Social Share */}
                <div className="bg-gradient-to-br from-vegetation-50 to-lime-50 rounded-xl shadow-md p-6 border-2 border-vegetation-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Share Article</h3>
                  <div className="space-y-2">
                    <button
                      onClick={shareOnTwitter}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </button>
                    <button
                      onClick={shareOnFacebook}
                      className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </button>
                    <button
                      onClick={copyLink}
                      className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <article className="flex-1 max-w-3xl">
              <div 
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-vegetation-200
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-vegetation-700
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-a:text-vegetation-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-vegetation-700 hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                  prose-li:text-gray-700 prose-li:mb-2 prose-li:leading-relaxed
                  prose-blockquote:border-l-4 prose-blockquote:border-vegetation-500 prose-blockquote:bg-vegetation-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:rounded-r-lg
                  prose-code:text-vegetation-600 prose-code:bg-vegetation-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:font-semibold
                  prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-6
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Author Bio */}
              {post.author && (
                <div className="mt-16 p-8 bg-gradient-to-br from-vegetation-50 to-lime-50 rounded-2xl border-2 border-vegetation-200">
                  <div className="flex items-start gap-6">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vegetation-400 to-lime-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-gray-900 mb-2">
                        Written by {post.author.name}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200 flex justify-between items-center">
                <Link href="/blog">
                  <Button variant="outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    All Articles
                  </Button>
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="light" padding="lg">
        <Container>
          <Newsletter />
        </Container>
      </Section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-vegetation-600 text-white rounded-full shadow-lg hover:bg-vegetation-700 transition-all duration-300 flex items-center justify-center z-40 hover:scale-110"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};