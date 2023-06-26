export enum ParcelSizes {
  Envelop = 'envelop',
  S60 = 's60',
  S80 = 's80',
  S100 = 's100',
  S120 = 's120',
  S140 = 's140',
  S160 = 's160',
  S180 = 's180',
  S200 = 's200',
}

export enum ParcelStatus {
  Pending = 'Pending',
  ReadyToPick = 'Ready to pick',
  PickedUp = 'Picked up',
  DropAtBranch = 'Drop at branch',
  InHub = 'In hub',
  Rotating = 'Rotating',
  Sorted = 'Sorted',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
}

export enum PickupParcelStatus {
  Pending = 'Pending',
  ReadyToPick = 'Ready to pick',
  PickedUp = 'Picked up',
}
