import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

export interface PickupTaskHeaderProps {
  taskCount: number;
  filteredTaskCount?: number;
}

export const PickupTaskHeader: React.FC<PickupTaskHeaderProps> = ({
  taskCount = 0,
  filteredTaskCount = 0,
}) => {
  let headerText = '';
  const { t } = useTranslation('tasks');

  if (!filteredTaskCount || taskCount === filteredTaskCount) {
    // TODO: handle with i18n plural and interpolation
    headerText = `${t('label.pickup')} ${taskCount}
    ${taskCount > 1 ? t('label.orders') : t('label.order')}`;
  } else if (filteredTaskCount) {
    headerText = `${filteredTaskCount}/${taskCount} ${
      filteredTaskCount > 1 ? t('label.orders') : t('label.order')
    }`;
  }

  return (
    <Typography variant='h2' sx={{ mt: 2 }}>
      {headerText}
    </Typography>
  );
};
