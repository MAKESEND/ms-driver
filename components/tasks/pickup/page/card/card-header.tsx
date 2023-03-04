import { Box, Button, Typography } from '@mui/material';

import { CallbackFunction } from '~/types';

export interface PickupTaskCardHeaderProps {
  cardHeader: string;
  skipBtnText: string;
  onClick?: CallbackFunction;
}

export const PickupTaskCardHeader: React.FC<PickupTaskCardHeaderProps> = ({
  cardHeader,
  onClick,
  skipBtnText,
}) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography variant='h3'>{cardHeader}</Typography>
      <Button variant='outlined' onClick={onClick}>
        {skipBtnText}
      </Button>
    </Box>
  );
};
