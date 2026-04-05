// ============================================
// FILE: tailwind.config.ts
// Vegetation Green Theme Configuration
// ============================================

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Vegetation Green Palette (NEW)
        vegetation: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Lime Palette (Secondary)
        lime: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
          950: '#1a2e05',
        },
        // Ocean as ALIAS to vegetation (so old code works!)
        ocean: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Cyan as ALIAS to lime (so old code works!)
        cyan: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#334155',
            a: {
              color: '#16a34a',
              '&:hover': {
                color: '#15803d',
              },
            },
            h1: {
              color: '#0f172a',
            },
            h2: {
              color: '#1e293b',
            },
            h3: {
              color: '#334155',
            },
            strong: {
              color: '#0f172a',
            },
            code: {
              color: '#16a34a',
              backgroundColor: '#f0fdf4',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#22c55e',
              color: '#475569',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  safelist: [
    // List item indicators
    'flex', 'items-start', 'gap-3', 'flex-shrink-0', 'mt-1', 'mt-0.5',
    'w-5', 'h-5', 'w-6', 'h-6', 'w-8', 'h-8', 'w-10', 'h-10',
    'rounded-full', 'rounded-lg', 'rounded-2xl',
    // Vegetation colors used in renderer
    'text-vegetation-500', 'text-vegetation-600', 'text-vegetation-700', 'text-vegetation-800',
    'bg-vegetation-500', 'bg-vegetation-600',
    'from-vegetation-50', 'from-vegetation-500', 'from-vegetation-600',
    'to-lime-400', 'to-lime-600',
    'bg-vegetation-50', 'border-vegetation-100', 'border-vegetation-300', 'border-vegetation-500',
    // Pros box
    'from-green-50', 'to-emerald-50', 'border-green-300',
    'text-green-600', 'text-green-800', 'bg-green-500', 'pros-box',
    // Cons box
    'from-red-50', 'to-rose-50', 'border-red-300',
    'text-red-600', 'text-red-800', 'bg-red-500', 'cons-box',
    // Box layout
    'bg-gradient-to-br', 'bg-gradient-to-r', 'border-2',
    'space-y-2.5', 'space-y-3',
    // Table
    'from-vegetation-600', 'divide-y', 'divide-gray-200',
    'bg-gray-50', 'hover:bg-vegetation-50',
    // Text sizes
    'text-[15px]', 'text-[17px]',
    'text-xs', 'font-black', 'font-bold', 'font-semibold',
    // Blockquote boxes
    'from-blue-50', 'to-cyan-50', 'border-blue-500', 'text-blue-900',
    'from-amber-50', 'to-yellow-50', 'border-amber-500', 'text-amber-900',
    'from-green-50', 'to-emerald-50', 'border-green-500', 'text-green-900',
    'from-cyan-50', 'to-teal-50', 'border-cyan-500', 'text-cyan-900',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config