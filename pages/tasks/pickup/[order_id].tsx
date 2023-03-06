import { NextSeo } from 'next-seo';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';
import { PickupOrderPage } from '~/components/tasks/pickup/pickup-order-page';

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const orderId = query.order_id ?? '';

  return {
    props: {
      orderId,
      ...(locale &&
        (await serverSideTranslations(locale, ['common', 'tasks']))),
    },
  };
};

interface PickupTaskPageProps {
  orderId: string;
}

const PickupTaskPage: NextPageWithLayout<PickupTaskPageProps> = ({
  orderId,
}) => {
  return (
    <>
      <NextSeo title='Pickup' />
      <PickupOrderPage orderId={orderId} />
    </>
  );
};

PickupTaskPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default PickupTaskPage;
