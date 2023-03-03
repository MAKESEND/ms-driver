import NextAuth from 'next-auth';
import { DriverBasicInfo } from '~/constants/driver-data';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DriverBasicInfo & { isDemo?: boolean };
  }
}
