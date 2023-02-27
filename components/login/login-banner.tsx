import NextImage from 'next/legacy/image';
import { Box } from '@mui/material';

import { inAppImages } from '~/constants/image-list';

export const LoginBanner: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <NextImage priority layout='responsive' {...inAppImages.MSLogo} />
    </Box>
  );
};

export default LoginBanner;
