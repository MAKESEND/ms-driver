import { Stack } from '@mui/material';

export const ModalLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Stack
      id='modal-layout'
      sx={{
        p: 3,
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: { sm: 280 },
        minWidth: 280,
        bgcolor: (t) => t.palette.common.white,
        boxShadow: '0px 4x 12px rgba(0, 0, 0, 0.16)',
        borderRadius: 2,
      }}
    >
      {children}
    </Stack>
  );
};
