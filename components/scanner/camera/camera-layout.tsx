import { Box } from '@mui/material';

export const CameraLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: '350px',
        maxHeight: '350px',
      }}
    >
      {children}
    </Box>
  );
};
