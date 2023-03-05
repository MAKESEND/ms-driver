import { Stack } from '@mui/material';

export const InDrawerLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Stack
      sx={{
        p: 3,
        mx: 'auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      {children}
    </Stack>
  );
};
