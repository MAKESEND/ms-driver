import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const PickupPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Pickup' />
      Pickup
    </>
  );
};

PickupPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default PickupPage;
