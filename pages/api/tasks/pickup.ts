import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import getConfig from 'next/config';

import { pickupTasks } from '~/mocks/tasks';

const {
  serverRuntimeConfig: { NEXTAUTH_SECRET },
} = getConfig();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = (await getToken({ req, secret: NEXTAUTH_SECRET })) as any;

  if (!token) {
    return res.status(401).end();
  }

  if (token.user.isDemo) {
    return res.json(pickupTasks);
  }

  return res.status(200).end();
}
