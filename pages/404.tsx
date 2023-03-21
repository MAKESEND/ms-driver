import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const NotFound = dynamic(() => import('~/components/404-page'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Not found' />
      <NotFound />
    </>
  );
};

NotFoundPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default NotFoundPage;
