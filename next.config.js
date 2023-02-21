/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const { version } = require('./package.json');

const nextConfig = {
  experimental: {
    appDir: true,
  },

  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com', 'res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/version',
        destination: '/api/version',
      },
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
};

module.exports = nextConfig;
