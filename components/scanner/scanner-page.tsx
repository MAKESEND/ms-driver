import { Skeleton } from '@mui/material';

import { ScannerProvider } from '~/providers/scanner-provider';

import { ScannerLayout } from '~/components/scanner/scanner-layout';
import { CameraLayout } from '~/components/scanner/camera/camera-layout';

import dynamic from 'next/dynamic';
const ScannerConfig = dynamic(
  () =>
    import('~/components/scanner/config/scanner-config').then(
      (mod) => mod.ScannerConfig
    ),
  { ssr: false }
);
const ScannerCamera = dynamic(
  () =>
    import('~/components/scanner/scanner-camera').then(
      (mod) => mod.ScannerCamera
    ),
  {
    loading: () => (
      <Skeleton variant='rectangular' sx={{ height: '100%', width: '100%' }} />
    ),
  }
);

export const ScannerPage: React.FC = () => {
  return (
    <ScannerLayout>
      <ScannerProvider>
        <ScannerConfig />
        <CameraLayout>
          <ScannerCamera />
        </CameraLayout>
      </ScannerProvider>
    </ScannerLayout>
  );
};
