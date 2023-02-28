import { useScanner } from '~/providers/scanner-provider';

import { ScannerPlaceholder } from '~/components/scanner/camera/scanner-placeholder';

export const ScannerCamera: React.FC = () => {
  const { state } = useScanner();

  if (state.isScanning) return null;

  return <ScannerPlaceholder />;
};
