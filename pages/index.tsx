import type { NextPage } from 'next';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <>
      <NextSeo title='Home' />
    </>
  );
};

export default HomePage;
