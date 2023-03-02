import { NextSeo } from 'next-seo';
import NextImage from 'next/legacy/image';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Stack } from '@mui/material';

import type { NextPageWithLayout } from '~/pages/_app';
import DrawerLayout from '~/components/layouts/drawer-layout';
import { inAppImages } from '~/constants/image-list';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale && (await serverSideTranslations(locale, ['common']))),
    },
  };
};

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title='Dashboard' />
      <Stack justifyContent='center' flexGrow={1}>
        <Box position='relative' width='60%' sx={{ mx: 'auto' }}>
          <NextImage layout='responsive' {...inAppImages.MSLogo} />
        </Box>
      </Stack>
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <DrawerLayout>{page}</DrawerLayout>;
};

export default DashboardPage;
