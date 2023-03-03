import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button, IconButton } from '@mui/material';

import { inAppLinks } from '~/constants/side-nav-links';
import { ScannerTask } from '~/providers/scanner-provider';

import dynamic from 'next/dynamic';
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

  return (
    <Link
      href={{
        pathname: inAppLinks.scanner?.href!,
        query: { task: ScannerTask.Sorting },
      }}
      passHref
      legacyBehavior
    >
      {shrink ? (
        <IconButton>
          <QrCodeScannerIcon />
        </IconButton>
      ) : (
        <Button fullWidth variant='outlined' endIcon={<QrCodeScannerIcon />}>
          {btnText}
        </Button>
      )}
    </Link>
  );
};
