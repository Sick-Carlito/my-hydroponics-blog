import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hydroponics Central',
    short_name: 'HydroCentral',
    description: 'Your complete guide to hydroponic gardening.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  };
}
