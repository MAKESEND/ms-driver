import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Settings = dynamic(() =>
  import('~/components/settings-page').then((mod) => mod.Settings)
);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'settings']))),
    },
  };
};

const SettingsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Settings' />
      <Settings />
    </>
  );
};

SettingsPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default SettingsPage;
