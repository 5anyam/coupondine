import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cms.coupondine.com', 'remotePatterns'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // 301 redirect; use false for 302
      },
      {
        source: '/hello-world',
        destination: '/',
        permanent: true, // 301 redirect; use false for 302
      },
      {
        source: '/pest-control-elementor',
        destination: '/',
        permanent: true, // 301 redirect; use false for 302
      },
      
      
    ];
  },
};

export default nextConfig;
