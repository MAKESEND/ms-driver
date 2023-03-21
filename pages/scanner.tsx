import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Scanner = dynamic(() =>
  import('~/components/scanner/scanner-page').then((mod) => mod.ScannerPage)
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'scanner']))),
    },
  };
};

const ScannerPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Scanner' />
      <Scanner />
    </>
  );
};

ScannerPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default ScannerPage;
