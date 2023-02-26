/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const { version } = require('./package.json');

const PORT = process.env.PORT;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const APP_ENV = process.env.APP_ENV;
const MS_DRIVER_MGMT = process.env.MS_DRIVER_MGMT;
const MS_UPDATE_PARCEL_STATUS = process.env.MS_UPDATE_PARCEL_STATUS;

const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n,
  images: {
    domains: ['flagcdn.com', 'images.unsplash.com', 'res.cloudinary.com'],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_ENV,
    version,
    NEXTAUTH_URL,
  },
  serverRuntimeConfig: {
    PORT,
    NEXTAUTH_SECRET,
    MS_DRIVER_MGMT,
    MS_UPDATE_PARCEL_STATUS,
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

module.exports = nextConfig;
