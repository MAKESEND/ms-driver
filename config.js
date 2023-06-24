const APP_ENV = process.env.APP_ENV;
const NODE_ENV = process.env.NODE_ENV;

const MS_DRIVER_MGMT = process.env.MS_DRIVER_MGMT;
const MS_UPDATE_PARCEL_STATUS = process.env.MS_UPDATE_PARCEL_STATUS;

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const NOTIFICATION_SECRET = process.env.NOTIFICATION_SECRET;

const PORT = process.env.PORT;

const {
  MS_API,
  MS_DEV_API,
  MS_MERCHANT_API,
  MS_MERCHANT_DEV_API,
  MS_LEGACY_API,
  MS_LEGACY_DEV_API,
} = process.env;

const isProduction = APP_ENV === 'production';
const API = {
  MS_API: isProduction ? MS_API : MS_DEV_API,
  MS_MERCHANT_API: isProduction ? MS_MERCHANT_API : MS_MERCHANT_DEV_API,
  MS_LEGACY_API: isProduction ? MS_LEGACY_API : MS_LEGACY_DEV_API,
};

module.exports = {
  APP_ENV,
  NODE_ENV,
  MS_DRIVER_MGMT,
  MS_UPDATE_PARCEL_STATUS,
  NEXTAUTH_URL,
  NEXTAUTH_SECRET,
  NOTIFICATION_SECRET,
  PORT,
  API,
};

