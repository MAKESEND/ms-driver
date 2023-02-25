import { Box, Stack } from '@mui/material';

export interface InputLayoutProps {
  htmlFor?: string;
}

export const InputLayout: React.FC<
  React.PropsWithChildren<InputLayoutProps>
> = ({ children, htmlFor }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: (theme) => theme.layout.size.btnMaxWidth,
      }}
    >
      <Stack
        component='label'
        htmlFor={htmlFor}
        sx={{
          gap: 1,
          width: '100%',
          alignItems: 'start',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};
