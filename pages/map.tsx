import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

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
