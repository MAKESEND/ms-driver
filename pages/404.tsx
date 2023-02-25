import Link from 'next/link';
import { NextSeo } from 'next-seo';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Stack, Typography } from '@mui/material';

import { inAppLinks, InAppLinks } from '~/constants/side-nav-links';
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
  return (
    <>
      <NextSeo title='Not found' />
      <Stack
        sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Stack gap={2}>
          <Typography variant='h1'>404 Not Found</Typography>
          <Link
            passHref
            legacyBehavior
            href={inAppLinks[InAppLinks.DASHBOARD]?.href!}
          >
            <Button variant='contained' fullWidth>
              Go Dashboard
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
