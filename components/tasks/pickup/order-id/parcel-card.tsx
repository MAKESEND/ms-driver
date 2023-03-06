import { useEffect, useState } from 'react';
import { Checkbox, ListItem, ListItemButton } from '@mui/material';

import {
  PickupOrderStateActionTypes,
  usePickupOrderState,
} from '~/providers/pickup-order-state-provider';

import { ParcelCardContent } from './parcel-card-content';

// TODO: remove after restructure and unify parcel props
import type { parcelsByOrderId } from '~/mocks/parcels';
type Parcel = typeof parcelsByOrderId[0];

export interface PickupParcelCardProps {
  parcel: Parcel;
}

export const PickupParcelCard: React.FC<PickupParcelCardProps> = ({
  parcel,
}) => {
  const { state, dispatch } = usePickupOrderState();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const isSelected = state.selectedParcels.includes(parcel.shipmentID);
    setChecked(isSelected);
  }, [parcel.shipmentID, state.selectedParcels]);

  const onClick = () => {
    // TODO: implement check business logic by delivery status
    setChecked((val) => !val);

    const payload = !checked
      ? [...state.selectedParcels, parcel.shipmentID]
      : [...state.selectedParcels.filter((id) => id !== parcel.shipmentID)];

    dispatch({
      type: PickupOrderStateActionTypes.SetSelectedParcels,
      payload,
    });
  };

  return (
    <ListItem disableGutters>
      <ListItemButton
        disableGutters
        onClick={onClick}
        sx={{
          gap: 1,
          display: 'flex',
          border: '#ccc solid 1px',
          borderRadius: '0.375rem',
        }}
      >
        <Checkbox checked={checked} sx={{ height: 40 }} />
        <ParcelCardContent parcel={parcel} />
      </ListItemButton>
    </ListItem>
  );
};
