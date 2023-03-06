import { List } from '@mui/material';

import { PickupParcelCard } from './parcel-card';

// TODO: remove after restructure and unify parcel props
import type { parcelsByOrderId } from '~/mocks/parcels';
type Parcel = typeof parcelsByOrderId[0];

export interface ParcelListProps {
  parcels: Parcel[];
}

export const ParcelList: React.FC<ParcelListProps> = ({ parcels }) => {
  return (
    <List disablePadding>
      {parcels.map((parcel) => (
        <PickupParcelCard key={parcel.shipmentID} parcel={parcel} />
      ))}
    </List>
  );
};
