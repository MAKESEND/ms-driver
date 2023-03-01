import { CircularProgress } from '@mui/material';

import { useScanner } from '~/providers/scanner-provider';

import { ScannerPlaceholder } from '~/components/scanner/camera/scanner-placeholder';

import dynamic from 'next/dynamic';
const QRReader = dynamic(
  () =>
    import('~/components/scanner/camera/qr-reader').then(
      (mode) => mode.QRReader
    ),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

export const ScannerCamera: React.FC = () => {
  const { state } = useScanner();

  if (state.isScanning) return <QRReader />;

  return <ScannerPlaceholder />;
};
