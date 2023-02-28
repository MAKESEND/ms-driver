import { useTranslation } from 'next-i18next';
import { IconButton, Typography } from '@mui/material';

import { useScanner, ScannerActionTypes } from '~/providers/scanner-provider';

import dynamic from 'next/dynamic';
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export const ScannerPlaceholder: React.FC = () => {
  const { t } = useTranslation('scanner');
  const { state, dispatch } = useScanner();

  const startScanning = () => {
    dispatch({ type: ScannerActionTypes.OpenScanner });
  };

  return (
    <>
      <IconButton
        size='large'
        disabled={state.isScanning}
        aria-label='qr-reader-button'
        onClick={startScanning}
        sx={{ width: '100%', height: '100%' }}
      >
        <QrCodeScannerIcon sx={{ width: '100%', height: '100%' }} />
      </IconButton>
      <Typography>{t('title.tapToScan')}</Typography>
    </>
  );
};
