import { NextSeo } from 'next-seo';
import { getSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';

import { inAppLinks } from '~/constants/side-nav-links';

const unAuthedPath =
  (inAppLinks.auth?.href ?? '') + (inAppLinks.login?.href ?? '');

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {},
    redirect: {
      destination: !session?.user ? unAuthedPath : inAppLinks.dashboard?.href,
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
