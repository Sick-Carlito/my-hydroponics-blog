// ============================================
// FILE: components/ui/Button.tsx
// Button component - GREEN THEME
// ============================================

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-vegetation-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      // GREEN primary button
      primary: 'bg-vegetation-600 text-white hover:bg-vegetation-700 hover:shadow-lg',
      // LIME secondary button
      secondary: 'bg-lime-600 text-white hover:bg-lime-700 hover:shadow-lg',
      // WHITE outline button (for green backgrounds)
      outline: 'border-2 border-white text-white bg-transparent hover:bg-white hover:text-vegetation-600',
      // GREEN ghost button
      ghost: 'text-vegetation-600 bg-transparent hover:bg-vegetation-50',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';