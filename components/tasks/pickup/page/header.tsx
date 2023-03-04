import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

export interface PickupTaskHeaderProps {
  taskCount: number;
}

export const PickupTaskHeader: React.FC<PickupTaskHeaderProps> = ({
  taskCount = 0,
}) => {
  const { t } = useTranslation('tasks');

  // TODO: handle with i18n plural and interpolation
  const headerText = `${t('label.pickup')} ${taskCount}
  ${taskCount > 1 ? t('label.orders') : t('label.order')}`;

  return (
    <Typography variant='h2' sx={{ mt: 2 }}>
      {headerText}
    </Typography>
  );
};
