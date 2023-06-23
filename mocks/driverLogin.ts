import { drivers } from './driver';

export const mockDriverLogin = ({
  birthday,
  phone,
}: {
  birthday: string;
  phone: string;
}) => {
  const [mockDriver] = drivers;

  if (
    new Date(birthday).toISOString() === mockDriver.dob &&
    mockDriver.phone === phone
  )
    return mockDriver;

  return null;
};
