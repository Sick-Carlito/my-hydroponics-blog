/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper module resolution
  reactStrictMode: true,
  
  // Tailwind v4 support
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;