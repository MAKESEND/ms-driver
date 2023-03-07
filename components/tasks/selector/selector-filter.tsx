import Fuse from 'fuse.js';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { IconButton, Skeleton } from '@mui/material';

import {
  PickupOrderStateActionTypes,
  usePickupOrderState,
} from '~/providers/pickup-order-state-provider';

import dynamic from 'next/dynamic';
const ClearIcon = dynamic(() => import('@mui/icons-material/Clear'));
const TextField = dynamic(() => import('@mui/material/TextField'), {
  loading: () => <Skeleton variant='rectangular' />,
});

export interface SelectorFilterProps {
  disabled?: boolean;
}

export const SelectorFilter: React.FC<SelectorFilterProps> = ({
  disabled = false,
}) => {
  const { t } = useTranslation('tasks');

  const { state, dispatch } = usePickupOrderState();

  const timeoutRef = useRef<NodeJS.Timeout>();
  const [searchVal, setSearchVal] = useState<string>('');
  const [fusedParcels, setFusedParcels] = useState<
    typeof state.allPickupParcels
  >([]);
  const fuse = useMemo(
    () =>
      new Fuse(state.allPickupParcels, {
        keys: Object.keys(state.allPickupParcels[0] ?? {}),
      }),
    [state.allPickupParcels]
  );

  useEffect(() => {
    if (state.allPickupParcels.length) {
      setFusedParcels(state.allPickupParcels);
    }
  }, [state.allPickupParcels]);

  useEffect(() => {
    // extra filter hook
    const setFilteredParcels = (parcels: typeof fusedParcels) =>
      dispatch({
        type: PickupOrderStateActionTypes.SetFilteredParcels,
        payload: [...parcels],
      });

    setFilteredParcels(fusedParcels);
  }, [fusedParcels, dispatch]);

  useEffect(() => {
    if (!searchVal && state.allPickupParcels.length) {
      setFusedParcels(state.allPickupParcels);
    } else {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const result = fuse.search(searchVal);
        const parcels = result.map(({ item }) => item);
        setFusedParcels(parcels);
      }, 300);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [fuse, state.allPickupParcels, searchVal]);

  const onClear = () => setSearchVal('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchVal(event.target.value);

  const EndAdornment = searchVal ? (
    <IconButton edge='end' onClick={onClear}>
      <ClearIcon />
    </IconButton>
  ) : null;

  return (
    <TextField
      id='parcel-filter'
      size='small'
      variant='outlined'
      label={t('label.searchParcel')}
      disabled={disabled}
      sx={{ flexGrow: 1 }}
      value={searchVal}
      onChange={onChange}
      InputProps={{
        sx: { height: 40 },
        endAdornment: EndAdornment,
      }}
    />
  );
};
