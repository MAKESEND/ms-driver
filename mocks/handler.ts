import { rest } from 'msw';

export const handlers = [
  rest.get('/api/version', (_req, res, ctx) =>
    res(ctx.json({ version: 'version' }))
  ),
];
