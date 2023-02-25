import { NextSeo } from 'next-seo';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Login from '~/components/login/login-page';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const LoginPage: NextPage = () => {
  return (
    <>
      <NextSeo title='Login' />
      <Login />
    </>
  );
};

export default LoginPage;
