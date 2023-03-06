import { useTranslation } from 'next-i18next';
import {
  Chip,
  Stack,
  styled,
  Typography as MuiTypography,
} from '@mui/material';

import { Row } from '~/components/common/layout/row';

const Typography = styled(MuiTypography)(() => ({}));
Typography.defaultProps = { variant: 'secondary' };

// TODO: remove after restructure and unify parcel props
import type { parcelsByOrderId } from '~/mocks/parcels';
type Parcel = typeof parcelsByOrderId[0];

import dynamic from 'next/dynamic';
const SnowFlakeIcon = dynamic(() => import('@mui/icons-material/AcUnit'));
const InventoryIcon = dynamic(
  () => import('@mui/icons-material/Inventory2Outlined')
);

export interface ParcelCardContentProps {
  parcel: Parcel;
}

export const ParcelCardContent: React.FC<ParcelCardContentProps> = ({
  parcel,
}) => {
  // TODO: restructure parcel data type
  const {
    shipmentID,
    temp,
    status,
    receiver_name,
    receiver_no,
    dropoff_district,
    dropoff_postcode,
  } = parcel;

  const { t } = useTranslation('tasks');
  const nameLabel = t('label.name');
  const phoneLabel = t('label.phone');
  const districtLabel = t('label.district');

  const TempIcon =
    temp === 1 ? (
      <SnowFlakeIcon sx={{ color: (theme) => theme.palette.common.blue50 }} />
    ) : (
      <InventoryIcon sx={{ color: (theme) => theme.palette.common.darkGrey }} />
    );

  return (
    <Stack gap={1} flexGrow={1} sx={{ p: 1 }}>
      <Row>
        <Typography>{shipmentID}</Typography>
        <Chip label={status} />
      </Row>
      <Typography sx={{ textAlign: 'start' }}>
        {nameLabel}: {receiver_name}
      </Typography>
      <Row>
        <Typography>
          {phoneLabel}: {receiver_no}
        </Typography>
        {TempIcon}
      </Row>
      <Row>
        <Typography>
          {districtLabel}: {dropoff_district}
        </Typography>
        <Typography>{dropoff_postcode}</Typography>
      </Row>
    </Stack>
  );
};
