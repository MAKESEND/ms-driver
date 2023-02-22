import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const DropoffPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Dropoff' />
      Dropoff
    </>
  );
};

DropoffPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DropoffPage;
