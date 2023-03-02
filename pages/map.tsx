import { NextSeo } from 'next-seo';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';
import { inAppLinks } from '~/constants/side-nav-links';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
    redirect: {
      destination: inAppLinks.dashboard?.href!,
      permenant: false,
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
