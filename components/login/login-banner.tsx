import NextImage from 'next/legacy/image';
import { Box } from '@mui/material';

import { inAppImages, InAppImages } from '~/constants/image-list';

export const LoginBanner: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <NextImage
        priority
        layout='responsive'
        {...inAppImages[InAppImages.MS_LOGO]}
      />
    </Box>
  );
};

export default LoginBanner;
