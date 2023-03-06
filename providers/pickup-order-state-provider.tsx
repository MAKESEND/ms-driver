import { createContext, useContext } from 'react';

// TODO: restructure and unify parcel props
import type { parcelsByOrderId } from '~/mocks/parcels';
type Parcel = typeof parcelsByOrderId[0];

export enum PickupOrderStateActionTypes {
  SetAllPickupParcels = 'SetAllPickupParcels',
  SetSelectedParcels = 'SetSelectedParcels',
  SetFilteredParcels = 'SetFilteredParcels',
  SetImages = 'SetImages',
  Reset = 'Reset',
}

type SetAllPickupParcels = {
  type: PickupOrderStateActionTypes.SetAllPickupParcels;
  payload: Parcel[];
};

// TODO: consider transfer payload to object rather than array of strings
type SetSelectedParcels = {
  type: PickupOrderStateActionTypes.SetSelectedParcels;
  payload: string[];
};

type SetFilteredParcels = {
  type: PickupOrderStateActionTypes.SetFilteredParcels;
  payload: Parcel[];
};

type SetImages = {
  type: PickupOrderStateActionTypes.SetImages;
  payload: File[];
};

type ResetPickupOrderState = {
  type: PickupOrderStateActionTypes.Reset;
  payload?: never;
};

type PickupOrderStateActions =
  | SetAllPickupParcels
  | SetSelectedParcels
  | SetFilteredParcels
  | SetImages
  | ResetPickupOrderState;

export const reducer = (
  state: typeof defaultValue,
  { type, payload }: PickupOrderStateActions
): typeof defaultValue => {
  switch (type) {
    case PickupOrderStateActionTypes.SetAllPickupParcels:
      return { ...state, allPickupParcels: [...payload] };
    case PickupOrderStateActionTypes.SetSelectedParcels:
      return { ...state, selectedParcels: [...payload] };
    case PickupOrderStateActionTypes.SetFilteredParcels:
      return { ...state, filteredParcels: [...payload] };
    case PickupOrderStateActionTypes.SetImages:
      return { ...state, images: [...payload] };
    case PickupOrderStateActionTypes.Reset:
      return { ...defaultValue };
    default:
      return state;
  }
};

export const defaultValue = {
  allPickupParcels: [] as Parcel[],
  filteredParcels: [] as Parcel[],
  selectedParcels: [] as string[],
  images: [] as File[],
};

export const PickupOrderStateContext = createContext<{
  state: typeof defaultValue;
  dispatch: React.Dispatch<PickupOrderStateActions>;
} | null>(null);

export const usePickupOrderState = () => {
  const ctx = useContext(PickupOrderStateContext);

  if (!ctx)
    throw new Error(
      'usePickupOrderState can only be used in PickupOrderStateProvider'
    );

  return ctx;
};
