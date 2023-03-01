import { Stack } from '@mui/material';

export const ScannerLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Stack
      gap={4}
      alignItems='center'
      justifyContent='center'
      sx={{
        px: 3,
        mt: 4,
        mx: 'auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      {children}
    </Stack>
  );
};
