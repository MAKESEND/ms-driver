import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query(() => 'hello tRPC v10!'),
});

export type AppRouter = typeof appRouter;
