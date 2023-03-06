import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';

import type { CallbackFunction } from '~/types';

export interface ConfirmButtonProps {
  onClick: CallbackFunction;
  disabled?: boolean;
  selectionState?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  disabled = false,
  selectionState,
}) => {
  const { t } = useTranslation('tasks');
  const confirmBtnText = t('btn.confirm');
  const btnText = selectionState
    ? `${confirmBtnText} ${selectionState}`
    : confirmBtnText;

  return (
    <Box
      sx={{
        p: 2,
        mx: 'auto',
        width: '100%',
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translate(-50%)',
        zIndex: (theme) => theme.zIndex.drawer,
        maxWidth: (theme) => theme.layout.size.btnMaxWidth,
      }}
    >
      <Button
        fullWidth
        variant='contained'
        disabled={disabled}
        onClick={onClick}
      >
        {btnText}
      </Button>
    </Box>
  );
};
