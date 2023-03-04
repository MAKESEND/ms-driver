import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export enum PublicEnvs {
  APP_ENV = 'APP_ENV',
  IS_DEMO = 'IS_DEMO',
  NEXTAUTH_URL = 'NEXTAUTH_URL',
}

export enum ServerEnvs {
  NEXTAUTH_SECRET = 'NEXTAUTH_SECRET',
  MS_DRIVER_MGMT = 'MS_DRIVER_MGMT',
  MS_UPDATE_PARCEL_STATUS = 'MS_UPDATE_PARCEL_STATUS',
}

const mapRuntimeEnvs = (
  EnvKeys: object,
  runtimeConfig: { [key: string]: string }
) =>
  Object.keys(EnvKeys).reduce((store, key) => {
    const env = runtimeConfig[key];
    return { ...store, ...(env && { [key]: env }) };
  }, {});

export type EnvList = {
  [key in ServerEnvs | PublicEnvs]?: string;
};

export const envs: EnvList = {
  ...mapRuntimeEnvs(PublicEnvs, publicRuntimeConfig),
  ...mapRuntimeEnvs(ServerEnvs, serverRuntimeConfig),
};
