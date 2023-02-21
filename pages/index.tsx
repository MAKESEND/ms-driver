import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      router.replace('/dashboard');
      initRef.current = true;
    }
  }, [router]);

  return (
    <>
      <NextSeo title='Home' />
    </>
  );
};

export default HomePage;
