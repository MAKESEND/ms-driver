import Link from 'next/link';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Stack, Typography } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const NotFoundPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { status } = useSession();

  const message = '404 Not Found';
  const btnText = 'Go Dashboard';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(inAppLinks.login?.href!);
    }
  }, [router, status]);

  return (
    <>
      <NextSeo title='Not found' />
      <Stack flexGrow={1} justifyContent='center' alignItems='center'>
        <Stack gap={2}>
          <Typography variant='h1'>{message}</Typography>
          <Link passHref legacyBehavior href={inAppLinks.dashboard?.href!}>
            <Button variant='contained' fullWidth>
              {btnText}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

NotFoundPage.getLayout = (page) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default NotFoundPage;
