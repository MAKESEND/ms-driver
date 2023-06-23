/** @type {import('next').NextConfig} */
const { version } = require('./package.json');
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const APP_ENV = process.env.APP_ENV;
const isProduction = APP_ENV === 'production';
const NODE_ENV = process.env.NODE_ENV;

const IS_DEMO = process.env.IS_DEMO === 'true';
const MS_DRIVER_MGMT = process.env.MS_DRIVER_MGMT;
const MS_UPDATE_PARCEL_STATUS = process.env.MS_UPDATE_PARCEL_STATUS;

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const PORT = process.env.PORT;

const {
  MS_API,
  MS_DEV_API,
  MS_MERCHANT_API,
  MS_MERCHANT_DEV_API,
  MS_LEGACY_API,
  MS_LEGACY_DEV_API
} = process.env;

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
    MS_API: isProduction ? MS_API : MS_DEV_API,
    MS_MERCHANT_API: isProduction ? MS_MERCHANT_API : MS_MERCHANT_DEV_API,
    MS_LEGACY_API: isProduction ? MS_LEGACY_API : MS_LEGACY_DEV_API,

  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    MS_DRIVER_MGMT,
    MS_UPDATE_PARCEL_STATUS,
    NEXTAUTH_SECRET,
    NODE_ENV,
    PORT,
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
