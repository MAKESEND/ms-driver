import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { DriverBasicInfo } from '~/constants/driver-data';

// frontend is now protected with controller component
// TODO: apply authentication check to all protected routes
export const config = {
  matcher: ['/api/sorting/:path*', '/api/tasks/:path*'],
};

export async function middleware(req: NextRequest & { user: DriverBasicInfo }) {
  const res = NextResponse;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.redirect(new URL('/auth/login', req.url));
  }

  return res.next();
}
