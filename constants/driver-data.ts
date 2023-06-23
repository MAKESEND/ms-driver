export enum DriverBasicInfoKeys {
  DriverId = 'driver_id',
  Name = 'name',
  Nickname = 'nickname',
  Id = 'id',
  Phone = 'phone',
  ServiceArea = 'service_area',
  ServiceAreaId = 'service_area_id',
  Surname = 'surname',
  PictureProfile = 'picture_profile',
}

export type DriverBasicInfo = Pick<
  DriverData,
  keyof Record<DriverBasicInfoKeys, string>
>;

export interface DriverData {
  [DriverBasicInfoKeys.DriverId]: string; // uuid
  [DriverBasicInfoKeys.Name]: string;
  [DriverBasicInfoKeys.Nickname]: string;
  [DriverBasicInfoKeys.Phone]: string;
  [DriverBasicInfoKeys.Id]: string; // uuid
  [DriverBasicInfoKeys.ServiceArea]: string[];
  [DriverBasicInfoKeys.ServiceAreaId]: number[];
  [DriverBasicInfoKeys.Surname]: string;
  [DriverBasicInfoKeys.PictureProfile]: string; // uri
  dob: string; // UTC timestamp
  email: string;
  gender: string;
  address: {
    district: string;
    subdistrict: string;
    postcode: string;
    lat: string;
    lon: string;
    address1: string;
    province: string;
  };
  id_card: string;
  driver_license_no: string; // 8 digits
  driver_license_exp: string; // UTC timestamp
  model: string;
  vehicle_type: string;
  license_plate: string;
  bank_acc_no: string;
  bank_acc_name: string;
  bank_name: string;
  security_deposit: 0;
  driver_license_image?: string; // URI
  vehicle_image?: string; // URI
  id_card_image?: string; // URI
  register_date: string; // UTC timestamp
  status: string;
  distance: number;
  total_parcel: number;
  valocity: number;
  volume: number;
  checkin: string; // UTC timestamp
  address_id: {
    district: number;
    subdistrict: number;
    postcode: number;
    province: number;
  };
  hub_id: number;
  vehicle_type_id: number;
  type: string;
}
