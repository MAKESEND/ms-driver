import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Sorting = dynamic(() =>
  import('~/components/sorting/sorting-page').then((mod) => mod.Sorting)
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, [
          'common',
          'parcel',
          'sorting',
        ]))),
    },
  };
};

const SortingPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Sorting' />
      <Sorting />
    </>
  );
};

SortingPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SortingPage;
