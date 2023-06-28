import { Stack } from '@mui/material';

export const ScannerLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Stack
      gap={2}
      alignItems='center'
      justifyContent='start'
      sx={{
        px: 3,
        mt: 4,
        mx: 'auto',
        position: 'relative',
        width: '100%',
        flexGrow: 1,
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      {children}
    </Stack>
  );
};
