import { NextSeo } from 'next-seo';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

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
      Dropoff
    </>
  );
};

DropoffPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DropoffPage;
