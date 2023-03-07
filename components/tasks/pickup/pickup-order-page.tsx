import { useEffect, useReducer } from 'react';
import { CircularProgress, Divider, Stack } from '@mui/material';

import { useMockData } from '~/providers/mock-data-provider';
import {
  reducer,
  defaultValue,
  PickupOrderStateContext,
  PickupOrderStateActionTypes,
} from '~/providers/pickup-order-state-provider';

import { TaskTypes } from '~/constants/tasks';
import { inAppLinks } from '~/constants/side-nav-links';

import { InDrawerLayout } from '~/components/layouts/in-drawer-layout';
import { ParcelList } from '~/components/tasks/pickup/order-id/parcel-list';
import { ConfirmButton } from '~/components/tasks/pickup/order-id/confirm-button';
import { TaskSelector } from '~/components/tasks/task-selector';

import dynamic from 'next/dynamic';
const TaskMedia = dynamic(
  () => import('~/components/tasks/task-media').then((mod) => mod.TaskMedia),
  { loading: () => <CircularProgress /> }
);

export interface PickupOrderPageProps {
  orderId: string;
}

export const PickupOrderPage: React.FC<PickupOrderPageProps> = ({
  orderId: _orderId,
}) => {
  // TODO: remove mock data
  const [state, dispatch] = useReducer(reducer, defaultValue);
  const { mockData, isLoading: isLoadingList } = useMockData();
  const parcelsByOrderId = mockData?.parcelsByOrderId ?? [];

  useEffect(() => {
    // this causes unnecessary re-render
    // TODO: refactor when fetching data from real data endpoint
    if (mockData?.parcelsByOrderId) {
      dispatch({
        type: PickupOrderStateActionTypes.SetAllPickupParcels,
        payload: mockData.parcelsByOrderId,
      });

      dispatch({
        type: PickupOrderStateActionTypes.SetFilteredParcels,
        payload: mockData.parcelsByOrderId,
      });
    }
  }, [mockData?.parcelsByOrderId]);

  const scannerHref = `${inAppLinks.scanner?.href}?task=${TaskTypes.Pickup}`;

  const isUploadingImg = false;
  // TODO: update constraint on select all checkbox
  // this should be synced and affect checkbox in each parcel card in the list
  const disableSelector = isLoadingList;

  // TODO: reconfirm business logic and set constraint on confirm button
  const disableConfirmBtn =
    isUploadingImg || isLoadingList || !state.selectedParcels.length;

  const selectionState = `(${state.selectedParcels.length}/${parcelsByOrderId.length})`;

  // TODO: business logic to update delivery status
  const onConfirmPickup = async () => {};

  return (
    <PickupOrderStateContext.Provider value={{ state, dispatch }}>
      <InDrawerLayout sx={{ pb: 12, height: '100%', overflowY: 'auto' }}>
        <Stack gap={2} sx={{ py: 1 }} alignItems='center'>
          <TaskMedia disabled={isUploadingImg} />
          <TaskSelector href={scannerHref} disabled={disableSelector} />
        </Stack>
        <Divider />
        <ParcelList parcels={state.filteredParcels} />
        <ConfirmButton
          onClick={onConfirmPickup}
          disabled={disableConfirmBtn}
          selectionState={selectionState}
        />
      </InDrawerLayout>
    </PickupOrderStateContext.Provider>
  );
};
