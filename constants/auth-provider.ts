export enum AuthProviders {
  MS_DRIVER = 'MS_DRIVER',
}

export type AuthProviderList = {
  [key in AuthProviders]: string;
};

export const authProviders: AuthProviderList = {
  [AuthProviders.MS_DRIVER]: 'credentials_ms_driver',
};
