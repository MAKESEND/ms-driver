/** @type {import('next').NextConfig} */
const { version } = require('./package.json');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const APP_ENV = process.env.APP_ENV;
const IS_DEMO = process.env.IS_DEMO === 'true';
const MS_DRIVER_MGMT = process.env.MS_DRIVER_MGMT;
const MS_UPDATE_PARCEL_STATUS = process.env.MS_UPDATE_PARCEL_STATUS;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const PORT = process.env.PORT;

const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com', 'res.cloudinary.com'],
  },
  publicRuntimeConfig: {
    APP_ENV,
    IS_DEMO,
    NEXTAUTH_URL,
    version,
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    MS_DRIVER_MGMT,
    MS_UPDATE_PARCEL_STATUS,
    NEXTAUTH_SECRET,
    PORT,
  },
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

module.exports = withBundleAnalyzer(nextConfig);
