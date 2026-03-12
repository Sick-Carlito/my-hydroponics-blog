// ============================================
// FILE: components/ui/HydroDroplet.tsx
// Custom animated hydroponics water droplet icon
// Blue (water) → Green (plants) diagonal gradient
// ============================================

'use client';

import React from 'react';

interface HydroDropletProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export const HydroDroplet: React.FC<HydroDropletProps> = ({ 
  size = 40, 
  animated = false,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-droplet' : ''}
      >
        {/* Define diagonal gradient: Blue (top) → Green (bottom) */}
        <defs>
          <linearGradient id="hydroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} /> {/* Cyan/Blue */}
            <stop offset="50%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} /> {/* Mid blue */}
            <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} /> {/* Green */}
          </linearGradient>
          
          {/* Shine effect for realism */}
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* Main droplet shape */}
        <path
          d="M50 10 C30 30, 20 45, 20 60 C20 77, 33 90, 50 90 C67 90, 80 77, 80 60 C80 45, 70 30, 50 10 Z"
          fill="url(#hydroGradient)"
          className={animated ? 'drop-shadow-lg' : ''}
        />
        
        {/* Shine/highlight for depth */}
        <ellipse
          cx="42"
          cy="35"
          rx="12"
          ry="18"
          fill="url(#shineGradient)"
          opacity="0.6"
        />
        
        {/* Small highlight dot */}
        <circle
          cx="38"
          cy="28"
          r="4"
          fill="white"
          opacity="0.8"
        />
      </svg>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes droplet {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.05);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .animate-droplet {
          animation: droplet 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};