'use client';
// ============================================
// FILE: components/blog/BlogPostClient.tsx
// ENHANCED with: Custom FAQs, Pros/Cons boxes, 
// Better markdown, Info boxes, Green bullets
// ============================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/types';
import { marked } from 'marked';

interface TOCItem { id: string; text: string; level: number; }
interface FAQ { q: string; a: string; }

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

  /* ── renderInline: recursively renders inline token arrays to HTML ── */
  const renderInline = (tokens: any[]): string => {
    if (!tokens || tokens.length === 0) return '';
    return tokens.map(t => {
      switch (t.type) {
        case 'text':
          return t.tokens ? renderInline(t.tokens) : (t.text ?? t.raw ?? '');
        case 'escape':
          return t.text ?? '';
        case 'strong':
          return `<strong class="font-bold text-gray-900">${renderInline(t.tokens)}</strong>`;
        case 'em':
          return `<em class="italic text-gray-700">${renderInline(t.tokens)}</em>`;
        case 'del':
          return `<del>${renderInline(t.tokens)}</del>`;
        case 'link': {
          const isExternal = t.href?.startsWith('http');
          const linkText = renderInline(t.tokens);
          return `<a href="${t.href}" class="text-vegetation-600 font-medium underline decoration-vegetation-200 underline-offset-2 hover:decoration-vegetation-500 hover:text-vegetation-800 transition-all"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${linkText}</a>`;
        }
        case 'image':
          return `<figure class="my-10"><img src="${t.href}" alt="${t.text || ''}" class="w-full rounded-2xl shadow-xl" loading="lazy"/>${t.title ? `<figcaption class="text-center text-sm text-gray-400 mt-3 italic">${t.title}</figcaption>` : ''}</figure>`;
        case 'codespan':
          return `<code class="px-1.5 py-0.5 bg-vegetation-100 text-vegetation-700 rounded font-mono text-[0.875em] font-semibold">${t.text}</code>`;
        case 'br':
          return '<br>';
        default:
          return t.raw ?? t.text ?? '';
      }
    }).join('');
  };

  /* ── getItemText: extracts plain text from a list item for pros/cons detection ── */
  const getItemText = (item: any): string => {
    if (!item.tokens || item.tokens.length === 0) return item.text || '';
    return item.tokens.map((t: any) => {
      if (t.type === 'text') return t.text || '';
      if (t.type === 'paragraph') return t.tokens?.map((tt: any) => tt.text || tt.raw || '').join('') || t.text || '';
      return t.text || t.raw || '';
    }).join('');
  };

  /* ── getItemHtml: renders a list item's content as HTML ── */
  const getItemHtml = (item: any): string => {
    if (!item.tokens || item.tokens.length === 0) return item.text || '';
    return item.tokens.map((t: any) => {
      if (t.type === 'text') return renderInline(t.tokens || [{ type: 'text', text: t.text }]);
      if (t.type === 'paragraph') return renderInline(t.tokens || []);
      return renderInline([t]);
    }).join('');
  };

  /* ── Configure marked renderer ── */
  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }: { tokens: any[]; depth: number }) => {
    const text = renderInline(tokens);
    const plainText = tokens.map(t => t.text || t.raw || '').join('');
    const id = plainText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
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
    // Image-only paragraph — render as figure, not wrapped in <p>
    if (tokens.length === 1 && tokens[0].type === 'image') {
      const img = tokens[0];
      return `<figure class="my-10">
        <img src="${img.href}" alt="${img.text || ''}" class="w-full rounded-2xl shadow-xl" loading="lazy"/>
        ${img.title ? `<figcaption class="text-center text-sm text-gray-400 mt-3 italic">${img.title}</figcaption>` : ''}
        ${img.text ? `<p class="text-center text-xs text-gray-400 mt-2 italic">${img.text}</p>` : ''}
      </figure>`;
    }
    return `<p class="text-gray-600 text-[17px] leading-[1.9] mb-6">${renderInline(tokens)}</p>`;
  };

  renderer.blockquote = ({ tokens }: { tokens: any[] }) => {
    const text = tokens.map(t => {
      if (t.type === 'paragraph') return renderInline(t.tokens || []);
      return renderInline(t.tokens || [{ type: 'text', text: t.text || t.raw || '' }]);
    }).join('');

    let boxClass = 'from-vegetation-50 to-lime-50/60 border-vegetation-500 text-vegetation-900';
    let icon = '<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>';

    if (text.includes('💡') || text.includes('Pro Tip')) {
      boxClass = 'from-blue-50 to-cyan-50/60 border-blue-500 text-blue-900';
      icon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>';
    } else if (text.includes('⚠️') || text.includes('Warning')) {
      boxClass = 'from-amber-50 to-yellow-50/60 border-amber-500 text-amber-900';
      icon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>';
    } else if (text.includes('✅') || text.includes('Success')) {
      boxClass = 'from-green-50 to-emerald-50/60 border-green-500 text-green-900';
      icon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>';
    } else if (text.includes('⚡') || text.includes('Quick Tip')) {
      boxClass = 'from-cyan-50 to-teal-50/60 border-cyan-500 text-cyan-900';
      icon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>';
    }

    return `<blockquote class="relative my-10 pl-8 py-6 bg-gradient-to-r ${boxClass} border-l-4 rounded-r-2xl overflow-hidden">
      <svg class="absolute top-4 right-4 w-10 h-10 opacity-20" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">${icon}</svg>
      <div class="text-lg font-semibold leading-relaxed pr-12">${text}</div>
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

    // Get plain text for pros/cons detection, HTML for rendering
    const plainItems = token.items.map(getItemText);
    const htmlItems  = token.items.map(getItemHtml);

    const firstItemText = plainItems[0]?.toLowerCase() || '';

    const isPros = /^pros:?$/i.test(firstItemText.trim()) ||
                   firstItemText.includes('advantages') ||
                   firstItemText.includes('benefits');

    if (isPros || /^cons:?$/i.test(firstItemText.trim())) {
      const buildBox = (boxIsPros: boolean, boxHtmlItems: string[]) => {
        const boxColor   = boxIsPros ? 'from-green-50 to-emerald-50 border-green-300' : 'from-red-50 to-rose-50 border-red-300';
        const headerColor = boxIsPros ? 'bg-green-500' : 'bg-red-500';
        const iconPath   = boxIsPros
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>';
        const title = boxIsPros ? 'Pros' : 'Cons';

        const iconStroke = boxIsPros ? '#16a34a' : '#dc2626';
        const body = boxHtmlItems.map(html => `<li style="display:flex;align-items:flex-start;gap:10px;font-size:15px;line-height:1.7;color:#374151;margin-bottom:8px">
          <svg style="width:20px;height:20px;flex-shrink:0;margin-top:2px" fill="none" stroke="${iconStroke}" viewBox="0 0 24 24">${iconPath}</svg>
          <span>${html}</span>
        </li>`).join('');

        return `<div class="${boxIsPros ? 'pros-box' : 'cons-box'} p-6 rounded-2xl bg-gradient-to-br ${boxColor} border-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg ${headerColor} flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconPath}</svg>
            </div>
            <h3 class="text-lg font-bold ${boxIsPros ? 'text-green-800' : 'text-red-800'}">${title}</h3>
          </div>
          <ul class="space-y-2.5">${body}</ul>
        </div>`;
      };

      const skipFirst = /^(pros|cons):?$/i.test(firstItemText.trim());
      const startIndex = skipFirst ? 1 : 0;

      if (isPros) {
        const consIdx = plainItems.findIndex((text: string, i: number) =>
          i >= startIndex && /^(cons|disadvantages|drawbacks):?$/i.test(text.trim())
        );
        if (consIdx !== -1) {
          return `<div class="flex flex-col md:flex-row gap-6 my-8">` +
            buildBox(true, htmlItems.slice(startIndex, consIdx)) +
            buildBox(false, htmlItems.slice(consIdx + 1)) +
            `</div>`;
        }
        return buildBox(true, htmlItems.slice(startIndex));
      }
      return buildBox(false, htmlItems.slice(startIndex));
    }

    // Regular list
    const body = htmlItems.map((html: string, i: number) => {
      if (ordered) {
        return `<li style="display:flex;align-items:flex-start;gap:12px;color:#4b5563;font-size:17px;line-height:1.9;margin-bottom:10px">
          <span style="flex-shrink:0;margin-top:4px;width:24px;height:24px;border-radius:50%;background:#22c55e;color:#ffffff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center">${i + 1}</span>
          <span>${html}</span>
        </li>`;
      }
      return `<li style="display:flex;align-items:flex-start;gap:12px;color:#4b5563;font-size:17px;line-height:1.9;margin-bottom:10px">
        <svg style="width:20px;height:20px;color:#22c55e;flex-shrink:0;margin-top:4px" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${html}</span>
      </li>`;
    }).join('');

    return `<${ordered ? 'ol' : 'ul'} style="margin:1.5rem 0;padding:0;list-style:none">${body}</${ordered ? 'ol' : 'ul'}>`;
  };

  renderer.link = ({ href, tokens }: { href: string; tokens: any[] }) => {
    const text = renderInline(tokens);
    const isExternal = href?.startsWith('http');
    return `<a href="${href}" class="text-vegetation-600 font-medium underline decoration-vegetation-200 underline-offset-2 hover:decoration-vegetation-500 hover:text-vegetation-800 transition-all"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  };

  renderer.image = ({ href, text }: { href: string; title: string | null; text?: string }) =>
    `<figure class="my-10">
      <img src="${href}" alt="${text || ''}" class="w-full rounded-2xl shadow-xl" loading="lazy"/>
      ${text ? `<figcaption class="text-center text-sm text-gray-400 mt-3 italic">${text}</figcaption>` : ''}
    </figure>`;

  renderer.table = (token: any) => {
    const header = `<thead>
      <tr style="background:linear-gradient(to right,#16a34a,#65a30d)">${token.header.map((cell: any) => {
        const text = renderInline(cell.tokens || [{ type: 'text', text: cell.text || '' }]);
        return `<th style="color:#ffffff;padding:14px 20px;text-align:left;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap">${text}</th>`;
      }).join('')}</tr>
    </thead>`;

    const body = `<tbody>
      ${token.rows.map((row: any, i: number) => `
        <tr style="background:${i % 2 === 0 ? '#f0fdf4' : '#ffffff'};border-bottom:1px solid #e5e7eb">
          ${row.map((cell: any) => {
            const text = renderInline(cell.tokens || [{ type: 'text', text: cell.text || '' }]);
            return `<td style="padding:12px 20px;font-size:14px;color:#374151;vertical-align:top">${text}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>`;

    return `<div style="margin:2.5rem 0;overflow:hidden;border-radius:16px;border:1px solid #e5e7eb;box-shadow:0 4px 16px rgba(0,0,0,0.08);overflow-x:auto">
      <table style="min-width:100%;border-collapse:collapse">${header}${body}</table>
    </div>`;
  };

  /* ── Generate HTML ── */
  const html = React.useMemo(() => {
    marked.use({ renderer, breaks: true, gfm: true });
    return marked.parse(post.content, { async: false }) as string;
  }, [post.content]);

  /* ── Pair pros/cons boxes side by side ── */
  useEffect(() => {
    if (!contentRef.current) return;
    
    const prosBoxes = contentRef.current.querySelectorAll('.pros-box');
    
    prosBoxes.forEach((prosBox) => {
      const nextSibling = prosBox.nextElementSibling;
      
      // Check if next element is a cons-box
      if (nextSibling && nextSibling.classList.contains('cons-box')) {
        // Create wrapper div for side-by-side layout
        const wrapper = document.createElement('div');
        wrapper.className = 'grid md:grid-cols-2 gap-6 my-8';
        
        // Insert wrapper before pros box
        prosBox.parentNode?.insertBefore(wrapper, prosBox);
        
        // Move both boxes into wrapper
        wrapper.appendChild(prosBox);
        wrapper.appendChild(nextSibling);
      }
    });
  }, [html]);

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

  // ✅ FIX: Use custom FAQs from post data, or default fallback
  const faqs = post.faqs || [
    { q: 'How long until I see results from hydroponics?',
      a: 'Most leafy greens grow 30–50% faster than soil. Lettuce is harvestable in 4–6 weeks; herbs in 3–4 weeks. You\'ll see root development and fresh leaves within days of starting.' },
    { q: 'What\'s the minimum budget to start?',
      a: 'A basic DWC (Deep Water Culture) system runs $30–$60 using a storage tote, air pump, net pots, and nutrients. A full beginner kit is $80–$150. You can start very affordably.' },
    { q: 'Do I need special lighting?',
      a: 'Not always. A sunny south-facing windowsill works for herbs. For consistent production, a $25–$50 LED grow light covers a small system. Full-spectrum LED panels are efficient and long-lasting.' },
  ];

  const takeaways = post.takeaways && post.takeaways.length > 0
    ? post.takeaways
    : [
        'Hydroponics grows plants 30–50% faster than soil',
        'Start with lettuce or herbs for quickest success',
        'Basic systems cost $30–$150 to get started',
        'Monitor pH (5.5–6.5) and nutrients weekly',
        'Results visible within days, harvest in weeks',
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-gradient-to-r from-vegetation-500 to-lime-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Hero */}
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
            <Link href="/author/carl" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vegetation-500 to-lime-400 flex items-center justify-center text-white font-black shadow group-hover:shadow-md transition-shadow">
                C
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-none group-hover:text-vegetation-600 transition-colors">Carl</p>
                <p className="text-gray-400 text-xs mt-0.5">Hydroponics Curator</p>
              </div>
            </Link>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <time dateTime={post.date} className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {formatDate(post.date)}
            </time>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {readTime} min read
              </div>
            <time></time>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              {wordCount.toLocaleString()} words
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-medium hover:border-vegetation-300 hover:text-vegetation-600 transition-colors shadow-sm cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hero image */}
        {post.image && (
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-14">
            <figure className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full object-cover max-h-[520px]"
                loading="eager"
              />
            </figure>
          </div>
        )}
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex gap-14 items-start">

          {/* Sidebar */}
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

          {/* Main content */}
          <article className="flex-1 max-w-3xl">
            <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} className="prose-custom" />

            {/* Key takeaways */}
            <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-vegetation-50 to-lime-50/60 border-2 border-vegetation-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-vegetation-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Key Takeaways</h2>
                  <p className="text-gray-500 text-sm">Quick reference summary</p>
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

            {/* FAQ - Uses custom FAQs if available */}
            {faqs.length > 0 && (
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
                  {faqs.map((faq: FAQ, i: number) => (
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
            )}

            {/* Author */}
            <div className="mt-14 p-8 rounded-3xl border border-gray-200 bg-white shadow-sm flex items-start gap-5">
              <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-vegetation-500 to-lime-400 flex items-center justify-center text-white text-2xl font-black shadow-md">
                C
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-vegetation-500 mb-1">Written by</p>
                <Link href="/author/carl" className="text-xl font-black text-gray-900 hover:text-vegetation-600 transition-colors mb-2 block">
                  Carl — Hydroponics Curator
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  {post.author?.bio || 'I research hydroponics so you don\'t have to — going through university studies, extension programs, and grower communities to find what actually works for home growers.'}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed border-t border-gray-100 pt-3">
                  I\'m a content curator and researcher, not a licensed agronomist or commercial grower. Everything published here is sourced from credible third-party research, which is always linked inline. When in doubt, consult your local agricultural extension office.{' '}
                  <Link href="/author/carl" className="text-vegetation-600 hover:text-vegetation-700 font-medium underline">
                    Learn more about how I research →
                  </Link>
                </p>
              </div>
            </div>

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

      {/* Newsletter */}
      <section className="relative bg-gradient-to-br from-vegetation-700 via-vegetation-600 to-lime-600 py-20 px-5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-[11px] font-black uppercase tracking-widest rounded-full mb-6">Free Newsletter</span>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">Grow Smarter Every Week</h2>
          <p className="text-vegetation-100 text-lg mb-8 leading-relaxed">
            Join 1,000+ growers getting expert tips, system guides, and troubleshooting help.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="flex-1 px-6 py-4 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg" required />
            <button type="submit" className="px-8 py-4 bg-white text-vegetation-700 font-black rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Subscribe Free
            </button>
          </form>
          <p className="text-vegetation-200 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-green-600 hover:bg-vegetation-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group z-40"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
        </button>
      )}
    </div>
  );
};