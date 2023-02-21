import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Dashboard' />
      Dashboard
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DashboardPage;
