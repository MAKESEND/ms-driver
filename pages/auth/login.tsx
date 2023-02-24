import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo title='Login' />
      Login
    </>
  );
};

export default LoginPage;
