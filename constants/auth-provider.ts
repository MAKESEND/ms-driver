export enum AuthProviders {
  MSDriver = 'MSDriver',
}

export type AuthProviderList = {
  [key in AuthProviders]: string;
};

export const authProviders: AuthProviderList = {
  [AuthProviders.MSDriver]: 'credentials_ms_driver',
};
