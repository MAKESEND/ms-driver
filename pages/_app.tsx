import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { DefaultSeoConfig } from 'next-seo.config';
import { appWithTranslation } from 'next-i18next';

import ErrorBoundary from '~/components/common/ErrorBoundary';

import dynamic from 'next/dynamic';
const CoreProvider = dynamic(() => import('~/providers/CoreProvider'));

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
        {getLayout(
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        )}
      </CoreProvider>
    </>
  );
}

export default appWithTranslation(App);
