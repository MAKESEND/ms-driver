import { NextSeo } from 'next-seo';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';
import { trpc } from '~/utils/trpc';

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
      <div>Dashboard</div>
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DashboardPage;
