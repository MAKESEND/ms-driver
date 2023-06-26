import { useTranslation } from 'next-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useUpdates } from '~/providers/updates-provider';

export const NotificationHeader: React.FC = () => {
  const { t } = useTranslation('common');
  const headerText = t('topNav.notification.updates');
  const readText = t('topNav.notification.read');

  const [updates, setUpdates] = useUpdates();

  const disabled = updates.every((update) => update.isRead);

  const updateCount = updates?.length || '';

  const onClick = () => {
    setUpdates((prevUpdates) =>
      prevUpdates.map((update) => ({ ...update, isRead: true }))
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography component='h2' sx={{ textAlign: 'start', px: '1rem' }}>
        {updateCount} {headerText}
      </Typography>
      <Button disabled={disabled} onClick={onClick} sx={{ px: 2 }}>
        {readText}
      </Button>
    </Box>
  );
};
