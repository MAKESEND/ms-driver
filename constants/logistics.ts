export const DropRounds = [1, 2];

export enum Hubs {
  BKK = 'BKK',
  DMK = 'DMK',
  SRC = 'SRC',
}

export enum DeliveryStatus {
  Pending = 'Pending',
  ReadyToPick = 'Ready to pick',
  PickedUp = 'Picked up',
  DropAtBranch = 'Drop at branch',
  InHub = 'In hub',
  Rotating = 'Rotating',
  Sorted = 'Sorted',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  FailedDelivery = 'Failed delivery',
}
