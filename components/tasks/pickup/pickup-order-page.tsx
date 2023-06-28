import { useState, useEffect, useReducer, useRef } from 'react';
import { CircularProgress, Divider, Stack } from '@mui/material';

import { useRecoilValue } from 'recoil';
import { scannedParcelIds as scannedIdState } from '~/store/scanner';

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
import { ToastActionTypes, useToast } from '~/providers/toast-provider';
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
  const scannedParcelIds = useRecoilValue(scannedIdState);
  const [state, dispatch] = useReducer(reducer, {
    ...defaultValue,
    selectedParcels: scannedParcelIds,
  });
  const { dispatch: handleToast } = useToast();
  // TODO: remove mock data
  const { mockData, isLoading: isLoadingList } = useMockData();
  const parcelsByOrderId = mockData?.parcelsByOrderId ?? [];
  const selectionState = `(${state.selectedParcels.length}/${parcelsByOrderId.length})`;

  // TODO: remove mock behavior
  const timerRef = useRef<NodeJS.Timeout>();
  const [isUploadingImg, setIsUploadingImg] = useState<boolean>(false);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

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

  // TODO: update constraint on select all checkbox
  // this should be synced and affect checkbox in each parcel card in the list
  const disableSelector = isLoadingList;

  // TODO: reconfirm business logic and set constraint on confirm button
  const disableConfirmBtn =
    isUploadingImg || isLoadingList || !state.selectedParcels.length;

  const onConfirmPickup = async () => {
    // TODO: business logic to update delivery status
    setIsUploadingImg(true);

    // TODO: remove mock behavior
    timerRef.current = setTimeout(() => {
      setIsUploadingImg(false);
      handleToast({
        type: ToastActionTypes.OpenToast,
        payload: {
          header: 'Dropoff task completed',
        },
      });
    }, 3500);
  };

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
