import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  styled,
  Typography,
} from '@mui/material';

import type { Parcel } from '~/types';

const CardHeader = CardContent;
const CardNote = CardContent;

import dynamic from 'next/dynamic';
const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);

const SecondaryText = styled(Typography)(() => ({
  textAlign: 'start',
  color: 'rgba(0, 0, 0, 0.6)',
}));

export interface ParcelCardProps {
  parcel: Parcel | null;
}

export const ParcelCard: React.FC<ParcelCardProps> = ({ parcel }) => {
  const { t } = useTranslation(['sorting', 'parcel']);
  const btnText = t('btn.sort');
  const phoneText = t('phone');
  const statusText = t('status');
  const receiverText = t('receiver');
  const rackText = t('rack', { ns: 'parcel' });

  // TODO: remvoe mock
  // mock mutation call
  const timerRef = useRef<NodeJS.Timer>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  if (!parcel) return null;

  const { trackingID, senderName, senderNo, status } = parcel;
  const { rack, nickname, hub, sequence } = parcel;

  const EndIcon = isLoading ? (
    <CircularProgress size='1rem' sx={{ color: '#fff' }} />
  ) : null;

  // TODO: remvoe mock
  // mock mutation call
  const onSort = () => {
    // TODO: sort parcel with trpc call
    setIsLoading(true);

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader>
        <Typography variant='h2'>{trackingID}</Typography>
      </CardHeader>
      <CardContent>
        <SecondaryText>
          {receiverText} {senderName}
        </SecondaryText>
        <SecondaryText>
          {receiverText} {phoneText} {senderNo}
        </SecondaryText>
        <SecondaryText>
          {statusText} {status}
        </SecondaryText>
      </CardContent>
      <CardNote>
        <Typography sx={{ fontSize: '1.25rem' }}>
          {rackText}: {rack} {nickname} {hub} - {sequence}
        </Typography>
      </CardNote>
      <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
        <Button
          variant='contained'
          disabled={isLoading}
          onClick={onSort}
          endIcon={EndIcon}
        >
          {btnText}
        </Button>
      </CardActions>
    </Card>
  );
};
