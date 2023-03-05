import { Stack, Skeleton } from '@mui/material';

export const DrawerContentSkeleton: React.FC = () => {
  return (
    <Stack
      flexGrow={1}
      justifyContent='center'
      alignItems='center'
      sx={{
        p: 2,
        mx: 'auto',
        width: '100%',
        maxWidth: (theme) => theme.layout.size.portMaxWidth,
      }}
    >
      <Skeleton variant='rectangular' height='100%' width='100%' />
    </Stack>
  );
};
