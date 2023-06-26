import type { AxiosError } from 'axios';

import type { DriverData } from '~/constants/driver-data';
import { serverHttpClient } from '../api';
import { envs } from '~/constants/envs';
import { resourceUrls } from '~/constants/resource-urls';

import type {
  DriverAuthentication,
  LoginFormFields,
} from '~/components/login/login-page';

const driverMgntHeaders = {
  'content-type': 'application/json',
  apikey: envs.MS_DRIVER_MGMT,
};

export const authServices = {
  login: async (
    credentials: Omit<DriverAuthentication, LoginFormFields.RememberMe>
  ) => {
    return await serverHttpClient<{ id: string }>(resourceUrls.DriverAuth, {
      method: 'POST',
      headers: driverMgntHeaders,
      data: {
        dob: credentials.birthday,
        phone: credentials.phone,
      },
    }).catch((err: AxiosError) => {
      throw err?.response?.data ?? err;
    });
  },
  getDriverData: async (driverId: string) => {
    return await serverHttpClient<DriverData>(
      `${resourceUrls.DriverData}/${driverId}`,
      {
        headers: driverMgntHeaders,
      }
    ).catch((err: AxiosError) => {
      throw err?.response?.data ?? err;
    });
  },
};
