import { Box, BoxProps, Chip, Slide } from '@mui/material';
import { useTranslation } from 'next-i18next';

import type { CallbackFunction } from '~/types';

export const UpdateChip: React.FC<{
  show?: boolean;
  sx?: BoxProps['sx'];
  onClick?: CallbackFunction;
}> = ({ show = false, sx, onClick }) => {
  const { t } = useTranslation('common');

  const label = t('btn.update', { defaultValue: 'Tab to update' });

  if (!show) return null;

  return (
    <Box
      sx={{
        py: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
    >
      <Slide direction='down' in={show} mountOnEnter unmountOnExit>
        <Chip label={label} color='info' clickable onClick={onClick} />
      </Slide>
    </Box>
  );
};
