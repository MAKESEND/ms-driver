import NextAuth from 'next-auth';
import type { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pick from 'lodash/pick';

const sessionStrategy = 'jwt' as SessionStrategy;

import { authServices } from '~/services/server/auth';

import type { DriverBasicInfo } from '~/constants/driver-data';
import { DriverBasicInfoKeys } from '~/constants/driver-data';
import { envs } from '~/constants/envs';
import { inAppLinks } from '~/constants/side-nav-links';
import { authProviders } from '~/constants/auth-provider';

const msDriverCredentials = CredentialsProvider({
  type: 'credentials',
  id: authProviders.MSDriver,
  name: 'MS Driver Login',
  credentials: {
    phone: { label: 'Phone', type: 'text' },
    birthday: { label: 'Birthday', type: 'text' },
  },
  authorize: async (credentials, _req) => {
    if (!credentials) return null;

    const driverId = await authServices.login(credentials).then(({ id }) => id);

    const driverData = await authServices.getDriverData(driverId);

    const driverInfo = pick<typeof driverData>(
      driverData,
      Object.values(DriverBasicInfoKeys)
    );

    return { id: driverId, ...driverInfo };
  },
});

const oneDay = 60 * 60 * 24;

export const authOptions: AuthOptions = {
  providers: [msDriverCredentials],
  secret: envs.NEXTAUTH_SECRET,
  session: {
    strategy: sessionStrategy,
    maxAge: oneDay, // TODO: until midnight of the day
  },
  jwt: {
    secret: envs.NEXTAUTH_SECRET,
  },
  pages: {
    // TODO: consider using recursion, curry, or linked list
    signIn: `${inAppLinks.auth}/${inAppLinks.login}`,
  },
  // TODO: assign user data
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as DriverBasicInfo;
      }

      return session;
    },
  },
  debug: envs.APP_ENV === 'development',
};

export default NextAuth(authOptions);
