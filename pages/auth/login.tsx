import type { NextPage } from 'next';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import dynamic from 'next/dynamic';
const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo));
const Login = dynamic(() => import('~/components/login/login-page'));

export async function getServerSideProps({
  locale,
  ...context
}: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
}

export type LoginPageServerProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const LoginPage: NextPage<LoginPageServerProps> = ({ csrfToken }) => {
  return (
    <>
      <NextSeo title='Login' />
      <Login csrfToken={csrfToken} />
    </>
  );
};

export default LoginPage;
