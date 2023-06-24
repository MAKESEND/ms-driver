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
  // TODO: implement with business logic
  const disabled = true;

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
      <Button variant='outlined' disabled={disabled} onClick={onClick}>
        {skipBtnText}
      </Button>
    </Box>
  );
};
