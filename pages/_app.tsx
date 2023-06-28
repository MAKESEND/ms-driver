import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';

import ErrorBoundary from '~/components/common/error-boundary';
import { MockDataProvider } from '~/providers/mock-data-provider';

import dynamic from 'next/dynamic';
const CoreProvider = dynamic(() => import('~/providers/core-provider'));
const DefaultSeo = dynamic(() =>
  import('next-seo').then((mod) => mod.DefaultSeo)
);
const SessionProvider = dynamic(() =>
  import('next-auth/react').then((mod) => mod.SessionProvider)
);
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
          <MockDataProvider>
            {getLayout(
              <ErrorBoundary>
                <AppControllers />
                <Component {...pageProps} />
              </ErrorBoundary>
            )}
          </MockDataProvider>
        </SessionProvider>
      </CoreProvider>
    </>
  );
}

export default appWithTranslation(App);
