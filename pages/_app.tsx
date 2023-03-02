import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';

import { trpc } from '~/utils/trpc';
import ErrorBoundary from '~/components/common/error-boundary';

import dynamic from 'next/dynamic';
const CoreProvider = dynamic(() => import('~/providers/core-provider'));
const AppControllers = dynamic(() =>
  import('~/components/app-controllers/controllers').then(
    (mod) => mod.AppControllers
  )
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo {...DefaultSeoConfig} />
      <CoreProvider>
        <SessionProvider session={pageProps.session}>
          {getLayout(
            <ErrorBoundary>
              <AppControllers />
              <Component {...pageProps} />
            </ErrorBoundary>
          )}
        </SessionProvider>
      </CoreProvider>
    </>
  );
}

export default trpc.withTRPC(appWithTranslation(App));
