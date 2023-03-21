import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Pickup = dynamic(() =>
  import('~/components/tasks/pickup/pickup-page').then((mod) => mod.Pickup)
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

const PickupPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Pickup' />
      <Pickup />
    </>
  );
};

PickupPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default PickupPage;
