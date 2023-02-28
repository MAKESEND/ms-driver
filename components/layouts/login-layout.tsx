import { Box, Stack } from '@mui/material';

export const LoginLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: (theme) => theme.palette.common.lightGrey,
      }}
    >
      <Stack
        sx={{
          p: 4,
          mx: 'auto',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: (theme) => theme.layout.size.portMaxWidth,
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default LoginLayout;
