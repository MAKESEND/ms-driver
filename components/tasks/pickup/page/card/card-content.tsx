import { Stack, styled, Typography as MuiTypography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { externalLinks } from '~/constants/external-links';

import { Row } from '~/components/common/layout/row';

const Typography = styled(MuiTypography)(() => ({
  textAlign: 'start',
}));
Typography.defaultProps = {
  variant: 'secondary',
};

export interface PickupTaskCardContentProps {
  senderPhone: string;
  senderAddress: string;
  orderId: string;
  parcelCount: number;
}

export const PickupTaskCardContent: React.FC<PickupTaskCardContentProps> = ({
  orderId,
  parcelCount,
  senderPhone,
  senderAddress,
}) => {
  const { t } = useTranslation('tasks');
  const addressText = t('label.address');
  const orderIdText = `${t('label.orderId')}: ${orderId}`;
  const phoneText = t('label.phone');
  // TODO: handle plural with i18n
  const parcelCountText = `${parcelCount} ${
    parcelCount > 1 ? t('label.pcs') : t('label.pc')
  }`;

  // TODO: refactor usage on external links
  const encodedAddress = encodeURI(senderAddress);
  const googleMapsLink = `${externalLinks.GOOGLE_MAPS.href}/?api=1&destination=${encodedAddress}`;

  return (
    <Stack gap={1}>
      <Row>
        <Typography>
          {phoneText} &nbsp;
          <a href={`tel:${senderPhone}`}>{senderPhone}</a>
        </Typography>
        <Typography>{parcelCountText}</Typography>
      </Row>
      <Typography>{orderIdText}</Typography>
      <Typography>
        {addressText} &nbsp;
        <a {...externalLinks.GOOGLE_MAPS} href={googleMapsLink}>
          {senderAddress}
        </a>
      </Typography>
    </Stack>
  );
};
