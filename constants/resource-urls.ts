import getConfig from 'next/config';

const {
  serverRuntimeConfig: { MS_API, MS_MERCHANT_API, MS_LEGACY_API },
} = getConfig();

export enum ResourceHosts {
  MSApi = 'MSApi',
  MSMerchantApi = 'MSMerchantApi',
  MSLegacy = 'MSLegacy',
}

export const apiHosts = {
  [ResourceHosts.MSApi]: MS_API,
  [ResourceHosts.MSMerchantApi]: MS_MERCHANT_API,
  [ResourceHosts.MSLegacy]: MS_LEGACY_API,
};

export enum ResourceUrls {
  DriverAuth = 'DriverAuth',
  DriverData = 'DriverData',
}

// TODO: consider revise data structure and usage
export const resourceUrls = {
  [ResourceUrls.DriverAuth]: `${apiHosts.MSApi}/drivers/authorized`,
  [ResourceUrls.DriverData]: `${apiHosts.MSApi}/drivers`,
};
