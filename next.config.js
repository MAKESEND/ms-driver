/** @type {import('next').NextConfig} */
const { version } = require('./package.json');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const {
  APP_ENV,
  NODE_ENV,
  MS_DRIVER_MGMT,
  MS_UPDATE_PARCEL_STATUS,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  PORT,
  API
} = require('./config');;

const IS_DEMO = process.env.IS_DEMO === 'true';


const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
    reactRemoveProperties: {
      properties: ['^data-testid$'],
    }
  },
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
    NODE_ENV,
    PORT,
    ...API
  },
  async rewrites () {
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
