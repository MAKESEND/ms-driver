import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const ScannerPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Scanner' />
      Scanner
    </>
  );
};

ScannerPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default ScannerPage;
