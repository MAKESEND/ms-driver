import { atom } from 'recoil';

export const newPickupTaskState = atom<boolean>({
  key: 'new_pickup_task',
  default: false,
});

export const newDropoffTaskState = atom<boolean>({
  key: 'new_dropoff_task',
  default: false,
});
