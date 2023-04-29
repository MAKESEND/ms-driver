import { rest } from 'msw';
import server from '~/mocks/server';

/**
 *
 * @param path path to request and mock response
 * @param body mock response body
 * @param action HTTP action e.g. GET
 */
export const mockResponse = (
  path: string = '/',
  body: Record<string, any> | null = null,
  action: keyof typeof rest = 'get'
) => {
  server.use(
    rest[action](path, (_req, res, ctx) => res(ctx.json({ ...body })))
  );
};
