// ============================================
// FILE: components/ui/Section.tsx
// Section wrapper component
// ============================================

import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'ocean' | 'light' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ variant = 'default', padding = 'lg', className, children, ...props }, ref) => {
    const baseStyles = 'w-full';
    
    const variants = {
      default: 'bg-white',
      ocean: 'bg-gradient-to-br from-ocean-600 via-cyan-500 to-ocean-700 text-white',
      light: 'bg-gray-50',
      dark: 'bg-slate-900 text-white',
    };

    const paddings = {
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20 md:py-24',
      xl: 'py-20 sm:py-28 md:py-32',
    };

    return (
      <section
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';