import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import CssBaseline from '@mui/material/CssBaseline';

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
      <CssBaseline />
      <CoreProvider>{getLayout(<Component {...pageProps} />)}</CoreProvider>
    </>
  );
}

export default appWithTranslation(App);
