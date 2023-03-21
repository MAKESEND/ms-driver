import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Dashboard = dynamic(() => import('~/components/dashboard-page'));

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Dashboard' />
      <Dashboard />
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DashboardPage;
