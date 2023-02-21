import { NextSeo } from 'next-seo';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Settings' />
      Settings
    </>
  );
};

SettingsPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SettingsPage;
