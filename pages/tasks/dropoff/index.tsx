import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Dropoff = dynamic(() =>
  import('~/components/tasks/dropoff/dropoff-page').then((mod) => mod.Dropoff)
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const DropoffPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Dropoff' />
      <Dropoff />
    </>
  );
};

DropoffPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DropoffPage;
