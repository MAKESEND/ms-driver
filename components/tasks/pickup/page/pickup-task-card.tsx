import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Box, Button, Card, CardContent, CardActions } from '@mui/material';

import type { PickupTask } from '~/types';
import { ParcelStatus } from '~/constants/parcel';

import { PickupTaskCardHeader } from './card/card-header';
import { PickupTaskCardContent } from './card/card-content';
import { PickupStatusIcon } from '../pickup-status-icon';

export interface PickupTaskCardProps {
  pickupTask: PickupTask;
}

export const PickupTaskCard: React.FC<PickupTaskCardProps> = ({
  pickupTask,
}) => {
  const { t } = useTranslation('tasks');
  const skipBtnText = t('btn.skip');
  const detailsBtnText = t('btn.details');
  const disabled = pickupTask.status !== ParcelStatus.ReadyToPick;

  const {
    seq,
    order,
    sender_name,
    sender_phone,
    sender_address,
    parcel_count,
    order_id,
    status,
  } = pickupTask;

  const cardHeader = `${seq || order ? `${seq || order}.` : ''} ${sender_name}`;

  const cardContentProps = {
    senderPhone: sender_phone,
    senderAddress: sender_address,
    orderId: order_id,
    parcelCount: +parcel_count,
  };

  // TODO: acquire in app href with better data structure
  const pickupTaskHref = `/tasks/pickup/${order_id}`;

  const onSkipPickupTask = () => {
    // TODO: handle skip pickup task
  };

  return (
    <Card
      sx={{
        position: 'relative',
        width: '100%',
        ...(disabled && {
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1,
            backgroundColor: (theme) => theme.palette.common.grey80,
            // pointerEvents: 'none',
          },
        }),
      }}
    >
      <CardContent>
        <PickupTaskCardHeader
          cardHeader={cardHeader}
          skipBtnText={skipBtnText}
          onClick={onSkipPickupTask}
        />
      </CardContent>
      <CardContent>
        <PickupTaskCardContent {...cardContentProps} />
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <PickupStatusIcon status={status} />
        <Box flexGrow={1} />
        <Link href={{ pathname: pickupTaskHref }} passHref legacyBehavior>
          <Button variant='outlined'>{detailsBtnText}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
