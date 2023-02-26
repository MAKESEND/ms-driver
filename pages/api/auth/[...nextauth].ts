import NextAuth from 'next-auth';
import type { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const sessionStrategy = 'jwt' as SessionStrategy;

import { authServices } from '~/services/server/auth';

import { envs, ServerEnvs } from '~/constants/envs';
import { InAppLinks, inAppLinks } from '~/constants/side-nav-links';
import { authProviders, AuthProviders } from '~/constants/auth-provider';

const msDriverCredentials = CredentialsProvider({
  type: 'credentials',
  id: authProviders[AuthProviders.MS_DRIVER],
  name: 'MS Driver Login',
  credentials: {
    phone: { label: 'Phone', type: 'text' },
    birthday: { label: 'Birthday', type: 'text' },
  },
  authorize: async (credentials, _req) => {
    if (!credentials) return null;

    return await authServices
      .login(credentials)
      .then((res) => ({ id: res.id }));
  },
});

export const authOptions: AuthOptions = {
  providers: [msDriverCredentials],
  secret: envs[ServerEnvs.NEXTAUTH_SECRET],
  session: {
    strategy: sessionStrategy,
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    // TODO: consider using recursion, curry, or linked list
    signIn: `${inAppLinks[InAppLinks.AUTH]}/${inAppLinks[InAppLinks.LOGIN]}`,
  },
  // TODO: assign user data
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session }) => {
      return session;
    },
  },
};

export default NextAuth(authOptions);
