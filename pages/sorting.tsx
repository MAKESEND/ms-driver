import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const SortingPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Sorting' />
      Sorting
    </>
  );
};

SortingPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SortingPage;
