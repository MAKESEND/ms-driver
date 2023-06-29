import { NextSeo } from 'next-seo';
import { getSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {},
    redirect: {
      destination: !session?.user ? '/auth/login' : '/dashboard',
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
