import { useTranslation } from 'next-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export interface NotificationHeaderProps {
  allRead?: boolean;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  allRead = false,
}) => {
  const { t } = useTranslation('common');
  const headerText = t('topNav.notification.notifications');
  const readText = t('topNav.notification.read');

  const [isAllRead, setIsAllRead] = useState<boolean>(allRead);
  const disabled = isAllRead;

  const onClick = () => {
    setIsAllRead(true);
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
        {headerText}
      </Typography>
      <Button disabled={disabled} onClick={onClick} sx={{ px: 2 }}>
        {readText}
      </Button>
    </Box>
  );
};
