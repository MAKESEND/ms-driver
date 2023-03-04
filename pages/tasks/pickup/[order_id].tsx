import { NextSeo } from 'next-seo';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

const PickupTaskPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Pickup' />
      Pickup task
    </>
  );
};

PickupTaskPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default PickupTaskPage;
