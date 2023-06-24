import { drivers } from './driver';

export const mockDriverLogin = ({
  birthday,
  phone,
}: {
  birthday: string;
  phone: string;
}) => {
  return (
    drivers.find(
      (driver) =>
        new Date(birthday).toISOString() === driver.dob &&
        driver.phone === phone
    ) ?? null
  );
};
