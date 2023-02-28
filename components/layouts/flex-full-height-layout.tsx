import { Stack } from '@mui/material';

export const FlexFullHeightLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Stack justifyContent='center' alignItems='center' flexGrow={1}>
      {children}
    </Stack>
  );
};
