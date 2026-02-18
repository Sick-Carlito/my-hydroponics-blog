'use client';
// ============================================
// FILE: components/blog/BlogPostClient.tsx
// Magazine-quality blog post - FULLY FIXED
// ============================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types';
import { marked } from 'marked';

interface TOCItem { id: string; text: string; level: number; }

export const BlogPostClient = ({ post }: { post: BlogPost }) => {
  const [activeId, setActiveId]     = useState('');
  const [progress, setProgress]     = useState(0);
  const [showTop, setShowTop]       = useState(false);
  const [toc, setToc]               = useState<TOCItem[]>([]);
  const [tocOpen, setTocOpen]       = useState(true);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [copied, setCopied]         = useState(false);
  const [wordCount, setWordCount]   = useState(0);
  const contentRef                  = useRef<HTMLDivElement>(null);

  /* ── Configure marked renderer ── */
  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }: { tokens: any[]; depth: number }) => {
    const text = tokens.map(t => t.text || t.raw).join('');
    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    const classes: Record<number, string> = {
      1: 'text-4xl font-black text-gray-950 mt-16 mb-6 leading-tight scroll-mt-28',
      2: 'text-3xl font-extrabold text-gray-900 mt-14 mb-5 leading-tight scroll-mt-28',
      3: 'text-xl font-bold text-vegetation-700 mt-10 mb-4 scroll-mt-28',
      4: 'text-lg font-bold text-gray-800 mt-8 mb-3 scroll-mt-28',
    };
    const accent = depth === 2
      ? `<span class="block w-10 h-1.5 rounded-full bg-gradient-to-r from-vegetation-500 to-lime-400 mb-3"></span>`
      : '';
    return `<h${depth} id="${id}" class="${classes[depth] || ''}">${accent}${text}</h${depth}>`;
  };

  renderer.paragraph = ({ tokens }: { tokens: any[] }) => {
    const text = tokens.map(t => t.text || t.raw).join('');
    return `<p class="text-gray-600 text-[17px] leading-[1.9] mb-6">${text}</p>`;
  };

  renderer.blockquote = ({ tokens }: { tokens: any[] }) => {
    const text = tokens.map(t => {
      if (t.type === 'paragraph') return t.tokens.map((tt: any) => tt.text || tt.raw).join('');
      return t.text || t.raw;
    }).join('');
    return `<blockquote class="relative my-10 pl-8 py-6 bg-gradient-to-r from-vegetation-50 to-lime-50/60 border-l-4 border-vegetation-500 rounded-r-2xl overflow-hidden">
      <svg class="absolute top-4 right-4 w-10 h-10 text-vegetation-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <div class="text-vegetation-900 text-xl italic font-semibold leading-relaxed pr-12">${text}</div>
    </blockquote>`;
  };

  renderer.code = ({ text, lang }: { text: string; lang?: string }) =>
    `<div class="my-8 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
      <div class="bg-gray-900 px-5 py-3 flex items-center justify-between">
        <div class="flex gap-1.5">
          <span class="w-3 h-3 rounded-full bg-red-400 opacity-90"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-400 opacity-90"></span>
          <span class="w-3 h-3 rounded-full bg-green-400 opacity-90"></span>
        </div>
        <span class="text-gray-500 text-xs font-mono tracking-wider">${lang || 'code'}</span>
      </div>
      <pre class="bg-[#0d1117] p-6 overflow-x-auto text-sm leading-relaxed"><code class="text-green-300 font-mono">${text}</code></pre>
    </div>`;

  renderer.codespan = ({ text }: { text: string }) =>
    `<code class="px-1.5 py-0.5 bg-vegetation-100 text-vegetation-700 rounded font-mono text-[0.875em] font-semibold">${text}</code>`;

  renderer.list = (token: any) => {
    const ordered = token.ordered;
    const body = token.items.map((item: any) => {
      const text = item.tokens?.map((t: any) => t.text || t.raw).join('') || item.text || '';
      return `<li class="flex items-start gap-3 text-gray-600 text-[17px] leading-relaxed">
        <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-vegetation-500 flex-shrink-0"></span>
        <span>${text}</span>
      </li>`;
    }).join('');
    return `<${ordered ? 'ol' : 'ul'} class="my-6 space-y-3">${body}</${ordered ? 'ol' : 'ul'}>`;
  };

  renderer.link = ({ href, tokens }: { href: string; tokens: any[] }) => {
    const text = tokens.map(t => t.text || t.raw).join('');
    return `<a href="${href}" class="text-vegetation-600 font-medium underline decoration-vegetation-200 underline-offset-2 hover:decoration-vegetation-500 hover:text-vegetation-800 transition-all" ${href?.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  };

  // FIXED: title can be null, handle properly
  renderer.image = ({ href, title, text }: { href: string; title: string | null; text?: string }) =>
    `<figure class="my-10">
      <img src="${href}" alt="${text || ''}" class="w-full rounded-2xl shadow-xl" loading="lazy"/>
      ${title ? `<figcaption class="text-center text-sm text-gray-400 mt-3 italic">${title}</figcaption>` : ''}
    </figure>`;

  renderer.hr = () =>
    `<div class="my-14 flex items-center gap-4" aria-hidden="true">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent to-vegetation-200"></div>
      <span class="flex gap-1"><span class="w-1.5 h-1.5 rounded-full bg-vegetation-300"></span><span class="w-1.5 h-1.5 rounded-full bg-vegetation-500"></span><span class="w-1.5 h-1.5 rounded-full bg-vegetation-300"></span></span>
      <div class="flex-1 h-px bg-gradient-to-l from-transparent to-vegetation-200"></div>
    </div>`;

  renderer.strong = ({ tokens }: { tokens: any[] }) => {
    const text = tokens.map(t => t.text || t.raw).join('');
    return `<strong class="font-bold text-gray-900">${text}</strong>`;
  };

  marked.setOptions({ renderer });
  const html = marked(post.content) as string;

  /* ── Extract TOC ── */
  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll('h2, h3');
    setToc(Array.from(els).map(el => ({
      id: el.id,
      text: el.textContent || '',
      level: +el.tagName[1],
    })));
    setWordCount(post.content.split(/\s+/).length);
  }, [html, post.content]);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const handler = () => {
      const { scrollY, innerHeight } = window;
      const total = document.documentElement.scrollHeight - innerHeight;
      setProgress((scrollY / total) * 100);
      setShowTop(scrollY > 600);
      for (const item of [...toc].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveId(item.id);
          return;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [toc]);

  const jumpTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (url: string) => window.open(url, '_blank', 'width=600,height=400');

  const readTime = Math.max(1, Math.ceil((wordCount || 1) / 220));

  const categoryStyle: Record<string, string> = {
    'beginner-guides': 'bg-blue-50 text-blue-700 border-blue-200',
    'systems':         'bg-purple-50 text-purple-700 border-purple-200',
    'nutrients':       'bg-vegetation-50 text-vegetation-700 border-vegetation-200',
    'plant-care':      'bg-orange-50 text-orange-700 border-orange-200',
    'diy':             'bg-teal-50 text-teal-700 border-teal-200',
    'advanced':        'bg-rose-50 text-rose-700 border-rose-200',
  };

  const faqs = [
    { q: 'How long until I see results from hydroponics?',
      a: 'Most leafy greens grow 30–50% faster than soil. Lettuce is harvestable in 4–6 weeks; herbs in 3–4 weeks. You\'ll see root development and fresh leaves within days of starting.' },
    { q: 'What\'s the minimum budget to start?',
      a: 'A basic DWC (Deep Water Culture) system runs $30–$60 using a storage tote, air pump, net pots, and nutrients. A full beginner kit is $80–$150. You can start very affordably.' },
    { q: 'Do I need special lighting?',
      a: 'Not always. A sunny south-facing windowsill works for herbs. For consistent production, a $25–$50 LED grow light covers a small system. Full-spectrum LED panels are efficient and long-lasting.' },
    { q: 'Is hydroponic food safe and nutritious?',
      a: 'Yes — studies show hydroponically grown produce is nutritionally equivalent or superior to soil-grown. It\'s cleaner, free of soil-borne diseases, and typically fresher since it\'s grown closer to where you eat.' },
    { q: 'How often should I check pH and nutrients?',
      a: 'Test pH daily and EC (nutrient strength) every 2–3 days. Top up with pH-balanced water between changes. Do a full reservoir change every 1–2 weeks.' },
  ];

  const takeaways = [
    'Hydroponics grows plants 30–50% faster by delivering nutrients directly to roots',
    'You can build a productive starter system for under $60',
    'pH between 5.5–6.5 is the single most critical factor for plant health',
    'Most systems need only 10–15 minutes of daily attention once established',
  ];

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 inset-x-0 z-50 h-[3px] bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-vegetation-500 via-lime-400 to-vegetation-600 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* ─── Hero ─── */}
      <header className="relative bg-gradient-to-b from-vegetation-50 via-white to-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-vegetation-100/50 blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-16 w-56 h-56 rounded-full bg-lime-100/60 blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-14">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-vegetation-600 transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <Link href="/blog" className="hover:text-vegetation-600 transition-colors">Blog</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-gray-600 truncate max-w-[240px]">{post.title}</span>
          </nav>

          {/* Category */}
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border mb-6 ${categoryStyle[post.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            {post.category.replace(/-/g, ' ')}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 leading-[1.06] tracking-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-3xl font-light">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-10 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vegetation-500 to-lime-400 flex items-center justify-center text-white font-black shadow">
                {(post.author?.name || 'H')[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-none">{post.author?.name || 'HydroGrow Team'}</p>
                <p className="text-gray-400 text-xs mt-0.5">Author</p>
              </div>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <time dateTime={post.date} className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {formatDate(post.date)}
            </time>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {readTime} min read
              </div>
            
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              {wordCount.toLocaleString()} words
            </div>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-medium hover:border-vegetation-300 hover:text-vegetation-600 transition-colors shadow-sm cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex gap-14 items-start">

          {/* ─── Sidebar ─── */}
          <aside className="hidden xl:flex flex-col gap-5 w-[240px] flex-shrink-0 sticky top-24">

            {/* TOC */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setTocOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-vegetation-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 11h10M4 16h7"/></svg>
                    In This Article
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${tocOpen ? '' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {tocOpen && (
                  <nav aria-label="Table of contents" className="pb-2 max-h-[48vh] overflow-y-auto">
                    {toc.map(item => (
                      <button
                        key={item.id}
                        onClick={() => jumpTo(item.id)}
                        className={`w-full text-left px-5 py-2.5 text-xs leading-snug transition-all ${
                          item.level === 3 ? 'pl-8 opacity-80' : ''
                        } ${activeId === item.id
                            ? 'text-vegetation-700 font-bold bg-vegetation-50 border-r-2 border-vegetation-500'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Progress */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <div className="flex justify-between mb-2.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Progress</span>
                <span className="text-sm font-bold text-vegetation-600 tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-vegetation-500 to-lime-400 rounded-full transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-gray-400 text-[11px] mt-2">{readTime} min · {Math.round(progress * readTime / 100)} min in</p>
            </div>

            {/* Share */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Share</p>
              <div className="space-y-2">
                <button onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`)} className="w-full flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-semibold transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter / X
                </button>
                <button onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`)} className="w-full flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
                <button onClick={copyLink} className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${copied ? 'bg-vegetation-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {copied
                    ? <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg> Copied!</>
                    : <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> Copy Link</>
                  }
                </button>
              </div>
            </div>
          </aside>

          {/* ─── Article ─── */}
          <article
            className="flex-1 min-w-0 max-w-[72ch]"
            itemScope
            itemType="https://schema.org/Article"
          >
            <meta itemProp="headline" content={post.title} />
            <meta itemProp="datePublished" content={post.date} />
            <meta itemProp="author" content={post.author?.name || 'HydroGrow Team'} />
            <meta itemProp="description" content={post.excerpt} />

            {/* Content */}
            <div
              ref={contentRef}
              itemProp="articleBody"
              className="article-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Key Takeaways */}
            <div className="mt-14 p-7 bg-gradient-to-br from-vegetation-50 to-lime-50 rounded-3xl border border-vegetation-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-vegetation-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-lg">Key Takeaways</h3>
                  <p className="text-gray-500 text-xs">What to remember from this article</p>
                </div>
              </div>
              <ul className="space-y-3">
                {takeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-vegetation-500 text-white flex items-center justify-center text-[11px] font-black">{i + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <section className="mt-14" aria-label="Frequently asked questions">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
                  <p className="text-gray-400 text-sm">Common questions from our readers</p>
                </div>
              </div>

              <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    className={`rounded-2xl border overflow-hidden transition-all duration-200 ${openFaq === i ? 'border-vegetation-300 shadow-md shadow-vegetation-100' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50/50 transition-colors"
                      aria-expanded={openFaq === i}
                    >
                      <span itemProp="name" className="font-semibold text-gray-800 pr-6 leading-snug">{faq.q}</span>
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${openFaq === i ? 'bg-vegetation-500 text-white rotate-45' : 'bg-gray-100 text-gray-400'}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="px-6 pb-6 bg-white">
                        <div className="h-px bg-gray-100 mb-4" />
                        <p itemProp="text" className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Author */}
            {post.author && (
              <div className="mt-14 p-8 rounded-3xl border border-gray-200 bg-white shadow-sm flex items-start gap-5">
                <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-vegetation-500 to-lime-400 flex items-center justify-center text-white text-2xl font-black shadow-md">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-vegetation-500 mb-1">Written by</p>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{post.author.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            )}

            {/* Mobile share */}
            <div className="xl:hidden mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-700 mb-4">Found this helpful? Share it!</p>
              <div className="flex gap-2">
                <button onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`)} className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold">Twitter</button>
                <button onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`)} className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold">Facebook</button>
                <button onClick={copyLink} className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${copied ? 'bg-vegetation-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{copied ? '✓ Copied' : 'Copy'}</button>
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
              <Link href="/blog" className="inline-flex items-center gap-2 text-vegetation-600 font-semibold text-sm hover:gap-3 transition-all group">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                All Articles
              </Link>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-vegetation-600 transition-colors flex items-center gap-1.5">
                Top <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              </button>
            </div>
          </article>
        </div>
      </div>

      {/* ─── Newsletter ─── */}
      <section className="relative bg-gradient-to-br from-vegetation-700 via-vegetation-600 to-lime-600 py-20 px-5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-[11px] font-black uppercase tracking-widest rounded-full mb-6">Free Newsletter</span>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">Grow Smarter Every Week</h2>
          <p className="text-vegetation-100 text-lg mb-8 leading-relaxed">
            Join 5,000+ growers getting expert tips, system guides, and troubleshooting help — every Tuesday. Free, always.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-5 py-4 rounded-2xl text-gray-900 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-white/25 placeholder-gray-400 shadow-lg"
            />
            <button type="submit" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-colors shadow-lg whitespace-nowrap">
              Subscribe Free →
            </button>
          </form>
          <p className="text-vegetation-200 text-xs mt-4">No spam. Unsubscribe with one click.</p>
        </div>
      </section>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-8 right-8 w-12 h-12 bg-vegetation-600 hover:bg-vegetation-700 text-white rounded-2xl shadow-xl flex items-center justify-center z-40 transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </button>

      {/* Global styles */}
      <style jsx global>{`
        .article-content > p:first-of-type::first-letter {
          font-size: 4.2em;
          font-weight: 900;
          float: left;
          line-height: 0.82;
          margin-right: 0.1em;
          margin-top: 0.06em;
          color: #16a34a;
          font-family: Georgia, serif;
        }
        html { scroll-behavior: smooth; scroll-padding-top: 100px; }
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.9rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .article-content th {
          background: #15803d;
          color: white;
          font-weight: 700;
          padding: 0.875rem 1.25rem;
          text-align: left;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .article-content td {
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          color: #475569;
          vertical-align: top;
        }
        .article-content tr:nth-child(even) td { background: #fafafa; }
        .article-content tr:last-child td { border-bottom: none; }
        .article-content tr:hover td { background: #f0fdf4; transition: background 0.15s; }
      `}</style>
    </>
  );
};