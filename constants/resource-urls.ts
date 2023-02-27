import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const domainType =
  publicRuntimeConfig.APP_ENV === 'production' ? 'asia' : 'ninja';

export enum ResourceHosts {
  MSApi = 'MSApi',
  MSMerchantApi = 'MSMerchantApi',
  MSLegacy = 'MSLegacy',
}

export const apiHosts = {
  [ResourceHosts.MSApi]: `https://apis.makesend.${domainType}`,
  [ResourceHosts.MSMerchantApi]: `https://api-merchant.makesend.${domainType}`,
  [ResourceHosts.MSLegacy]: `https://apiold.makesend.${domainType}`,
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
