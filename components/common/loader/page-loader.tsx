import { Box as MuiBox, Fade, styled, CircularProgress } from '@mui/material';

import dynamic from 'next/dynamic';
const MSDeliveryLoader = dynamic(
  () => import('~/components/common/lottie/ms-logo-lottie'),
  { loading: () => <CircularProgress /> }
);

const Box = styled(MuiBox)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: theme.zIndex.drawer + 10, // should be put to portal
}));

export const PageLoader: React.FC<
  React.PropsWithChildren<{ isLoading?: boolean }>
> = ({ isLoading = false, children }) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Box>{children ?? <MSDeliveryLoader />}</Box>
    </Fade>
  );
};

export default PageLoader;
