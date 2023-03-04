import { Stack } from '@mui/material';

export const TaskFilterLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Stack gap={1} flexDirection='row' sx={{ width: '100%' }}>
      {children}
    </Stack>
  );
};
