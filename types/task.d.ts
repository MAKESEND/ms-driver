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
}
