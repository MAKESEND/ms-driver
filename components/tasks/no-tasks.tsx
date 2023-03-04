import NextImage from 'next/legacy/image';
import { useTranslation } from 'next-i18next';
import { Stack, Typography } from '@mui/material';

import { inAppImages } from '~/constants/image-list';

export const NoTask: React.FC = () => {
  const { t } = useTranslation('tasks');
  const noTaskText = t('title.noTask');

  return (
    <Stack
      sx={{
        p: 3,
        height: '100%',
        justifyContent: 'center',
        alignItems: { sm: 'center' },
      }}
    >
      <NextImage {...inAppImages.FAQ} />
      <Typography variant='h2'>{noTaskText}</Typography>
    </Stack>
  );
};

export default NoTask;
