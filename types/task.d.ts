import type { ParcelSizes, ParcelStatus } from '~/constants/parcel';
import type { Hubs } from '~/constants/logistics';

export enum PickupRound {
  '0' = 0,
  '1' = 1,
  '2' = 2,
  '3' = 3,
  '4' = 4,
  '5' = 5,
  '6' = 6,
  '7' = 7,
  '8' = 8,
}

export enum PlannerRound {
  '1' = 1,
  '2' = 2,
}

export enum DropRound {
  '1' = 1,
  '2' = 2,
}

export enum TempControl {
  '0' = 0,
  '1' = 1,
}

export interface PickupTask {
  driver_id: string;
  round: string;
  sender_address: string;
  sender_name: string;
  sender_phone: string;
  order_id: string;
  parcel_count: string;
  order?: string; // order and seq are duplicates
  seq?: string;
  status?: Extract<
    ParcelStatus,
    ParcelStatus.Pending | ParcelStatus.ReadyToPick | ParcelStatus.PickedUp
  >; // TODO: this is mockup. Need definition of each state
}

export interface DropoffTask {
  orderID: string;
  trackingID: string;
  parcelSize: `${ParcelSizes}`;
  pickupRound: PickupRound;
  dropRound: DropRound;
  cod: number;
  temp: TempControl;
  orderDate: string;
  pickupType: string;
  userID: string | number;
  parcelChanged: boolean;
  parcelCreatedAt: string;
  parcelUpdatedAt: string;
  parcelType: string;
  PODStatus: string;
  senderName: string;
  senderNo: string;
  pickupAddress: string;
  pickupProvince: string;
  pickupDistrict: string;
  pickupPostcode: string;
  receiverName: string;
  receiverNo: string;
  dropAddress: string;
  dropProvince: string;
  dropDistrict: string;
  dropPostcode: string;
  status: `${ParcelStatus}`;
  plannerRound: PlannerRound;
  plannerHub: `${Hubs}`;
  sequence: number;
}
