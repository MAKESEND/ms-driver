import { PickupParcelStatus } from './parcel';

export enum TaskTypes {
  Dropoff = 'dropoff',
  Pickup = 'pickup',
  Scan = 'scan',
  Sorting = 'sorting',
}

// TODO: clear up and unify property naming convention
export const taskKeysToFilter = {
  [TaskTypes.Dropoff]: [
    'orderID',
    'trackingID',
    'parcelSize',
    'pickupRound',
    'dropRound',
    'cod',
    'temp',
    'orderDate',
    'pickupType',
    'userID',
    'parcelChanged',
    'parcelCreatedAt',
    'parcelUpdatedAt',
    'parcelType',
    'PODStatus',
    'senderName',
    'senderNo',
    'pickupAddress',
    'pickupProvince',
    'pickupDistrict',
    'pickupPostcode',
    'receiverName',
    'receiverNo',
    'dropAddress',
    'dropProvince',
    'dropDistrict',
    'dropPostcode',
    'status',
    'plannerRound',
    'plannerHub',
    'sequence',
  ],
  [TaskTypes.Pickup]: [
    'order',
    'order_id',
    'sender_name',
    'sender_phone',
    'parcel_count',
    'sender_address',
    'driver_id',
    'round',
    'seq',
  ],
  [TaskTypes.Scan]: [],
  [TaskTypes.Sorting]: [],
};

export const PickupFilterOptions = {
  round: [1, 2],
  status: Object.values(PickupParcelStatus),
};

export const DropoffFilterOptions = {
  status: Object.values(PickupParcelStatus),
};
