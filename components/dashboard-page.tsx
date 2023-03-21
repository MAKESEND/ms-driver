import NextImage from 'next/legacy/image';
import { Box, Stack } from '@mui/material';

import { inAppImages } from '~/constants/image-list';

export const Dashboard: React.FC = () => {
  return (
    <Stack justifyContent='center' flexGrow={1}>
      <Box position='relative' width='60%' sx={{ mx: 'auto' }}>
        <NextImage layout='responsive' {...inAppImages.MSLogo} />
      </Box>
    </Stack>
  );
};

export default Dashboard;
