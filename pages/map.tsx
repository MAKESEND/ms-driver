import { NextSeo } from 'next-seo';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const MapPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Map' />
      Map
    </>
  );
};

MapPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default MapPage;
