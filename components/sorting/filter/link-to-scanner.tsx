import { useTranslation } from 'next-i18next';
import { Button, IconButton } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { scannerConfigState } from '~/store/scanner';
const QrCodeScannerIcon = dynamic(
  () => import('@mui/icons-material/QrCodeScanner')
);

export interface LinkToScannerProps {
  shrink?: boolean;
}

export const LinkToScanner: React.FC<LinkToScannerProps> = ({
  shrink = false,
}) => {
  const { t } = useTranslation('sorting');
  const btnText = t('btn.scan');
  const router = useRouter();
  const setScannerConfig = useSetRecoilState(scannerConfigState);

  const onClick = () => {
    setScannerConfig((prev) => ({ ...prev, task: 'sorting', mode: 'bulk' }));
    router.push(inAppLinks.scanner?.href!);
  };

  return (
    <>
      {shrink ? (
        <IconButton onClick={onClick}>
          <QrCodeScannerIcon />
        </IconButton>
      ) : (
        <Button
          fullWidth
          onClick={onClick}
          variant='outlined'
          endIcon={<QrCodeScannerIcon />}
        >
          {btnText}
        </Button>
      )}
    </>
  );
};
