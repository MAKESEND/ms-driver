import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import getConfig from 'next/config';

import { parcelsToSort } from '~/mocks/parcels';

const {
  serverRuntimeConfig: { NEXTAUTH_SECRET },
} = getConfig();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const token = (await getToken({ req, secret: NEXTAUTH_SECRET })) as any;

    if (!token) return res.status(401).end();

    if (token.user.isDemo) {
      return res.json(parcelsToSort);
    }

    // TODO: fetch from MS service
    res.status(200).json({});
  }

  res.status(400).end();
}
