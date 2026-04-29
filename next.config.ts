import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    '/opengraph-image': ['./public/diagrams/**', './public/fonts/**'],
  },
  async rewrites() {
    return [
      { source: '/wrenching101-index', destination: '/presentation/index.html' },
      { source: '/wrenching101-slides', destination: '/presentation/slides.html' },
    ];
  },
};

export default nextConfig;
