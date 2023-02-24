import { NextSeo } from 'next-seo';
import type { GetServerSideProps, NextPage } from 'next';

import { InAppLinks } from '~/constants/enums';
import { inAppLinks } from '~/constants/side-nav-links';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
    redirect: {
      destination: inAppLinks[InAppLinks.DASHBOARD]?.href ?? '/dashboard',
      temporary: true,
    },
  };
};

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title='Home' />
    </>
  );
};

export default HomePage;
