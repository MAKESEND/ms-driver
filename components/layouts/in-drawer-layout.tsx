import { Stack, type SxProps, type Theme } from '@mui/material';

export const InDrawerLayout: React.FC<
  React.PropsWithChildren<{ sx?: SxProps<Theme> }>
> = ({ children, sx }) => {
  return (
    <Stack
      sx={{
        p: 3,
        mx: 'auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
