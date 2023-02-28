import { NextSeo } from 'next-seo';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';
import { ScannerPage as Scanner } from '~/components/scanner/scanner-page';

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
