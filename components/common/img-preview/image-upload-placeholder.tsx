import { useTranslation } from 'next-i18next';
import { Button, Stack, Typography } from '@mui/material';

import type { CallbackFunction } from '~/types';

import dynamic from 'next/dynamic';
const ImageIcon = dynamic(() => import('@mui/icons-material/ImageOutlined'));

export interface ImagePlaceholderProps {
  onClick: CallbackFunction;
}

export const ImageUploadPlaceholder: React.FC<ImagePlaceholderProps> = ({
  onClick,
}) => {
  const { t } = useTranslation('common');
  const uploadText = t('imgPreview.upload');
  const browserBtnText = t('imgPreview.btn.browse');

  return (
    <Stack
      alignItems='center'
      onClick={onClick}
      sx={{
        p: 2,
        border: 'dotted #ccc 1px',
        borderRadius: '0.375rem',
        ['&:hover']: { cursor: 'pointer' },
      }}
    >
      <ImageIcon
        sx={{
          width: '5rem',
          height: '5rem',
          color: (theme) => theme.palette.common.darkGrey,
        }}
      />
      <Typography>{uploadText}</Typography>
      <Button>{browserBtnText}</Button>
    </Stack>
  );
};
