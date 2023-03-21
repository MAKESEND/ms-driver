import { Box, styled } from '@mui/material';

export const FullScreenWrapper = styled(Box)(() => ({
  display: 'flex',
  height: '100dvh',
  ['@supports not (height: 100dvh)']: { height: '100vh' },
}));

export default FullScreenWrapper;
