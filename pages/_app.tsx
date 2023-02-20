import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import CssBaseline from '@mui/material/CssBaseline';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline>
        <Component {...pageProps} />
      </CssBaseline>
    </>
  );
}

export default appWithTranslation(App);
