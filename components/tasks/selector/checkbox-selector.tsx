import { useState, useEffect, useCallback } from 'react';
import { Checkbox } from '@mui/material';

import {
  PickupOrderStateActionTypes,
  usePickupOrderState,
} from '~/providers/pickup-order-state-provider';

export interface CheckBoxSelectorProps {
  disabled?: boolean;
}

export const CheckBoxSelector: React.FC<CheckBoxSelectorProps> = ({
  disabled,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const { state, dispatch } = usePickupOrderState();
  const { selectedParcels, allPickupParcels, filteredParcels } = state;

  const indeterminate =
    !!selectedParcels.length &&
    selectedParcels.length !== allPickupParcels.length;

  const changeSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const setSelectedParcels = (fn: Function) =>
        dispatch({
          type: PickupOrderStateActionTypes.SetSelectedParcels,
          payload: fn(selectedParcels),
        });

      const { checked } = event.target;
      const parcelIds = filteredParcels.reduce((list, parcel) => {
        const copy = [...list];
        if (parcel?.shipmentID) {
          copy.push(parcel.shipmentID);
        }
        return copy;
      }, [] as string[]);

      if (checked) {
        setSelectedParcels((val: string[]) => [
          ...Array.from(new Set([...val, ...parcelIds])),
        ]);
      } else {
        setSelectedParcels(() =>
          selectedParcels.filter((parcel) => !parcelIds.includes(parcel))
        );
      }

      setSelectAll(checked);
    },
    [filteredParcels, selectedParcels, dispatch]
  );

  useEffect(() => {
    const updateStateAsync = async () =>
      setSelectAll(selectedParcels.length === allPickupParcels.length);

    updateStateAsync();
  }, [allPickupParcels, selectedParcels]);

  return (
    <Checkbox
      checked={selectAll}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={changeSelectAll}
      sx={{ height: 40 }}
    />
  );
};
