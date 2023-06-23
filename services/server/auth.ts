import axiosClient from 'axios';
import type { AxiosError } from 'axios';

import type { DriverData } from '~/constants/driver-data';
import { httpClient } from '../api';
import { envs } from '~/constants/envs';
import { resourceUrls } from '~/constants/resource-urls';

import type {
  DriverAuthentication,
  LoginFormFields,
} from '~/components/login/login-page';

const clientInitiator = httpClient(axiosClient);
const serverHttpClient = clientInitiator.server.init();

const driverMgntHeaders = {
  'content-type': 'application/json',
  apikey: envs.MS_DRIVER_MGMT,
};

export const authServices = {
  login: async (
    credentials: Omit<DriverAuthentication, LoginFormFields.RememberMe>
  ) => {
    return await serverHttpClient
      .post<{ id: string }>(
        resourceUrls.DriverAuth,
        {
          dob: credentials.birthday,
          phone: credentials.phone,
        },
        {
          headers: driverMgntHeaders,
        }
      )
      .then(({ data }) => data ?? null)
      .catch((err: AxiosError) => {
        throw err?.response?.data ?? err;
      });
  },
  getDriverData: async (driverId: string) => {
    return await serverHttpClient
      .get<DriverData>(`${resourceUrls.DriverData}/${driverId}`, {
        headers: driverMgntHeaders,
      })
      .then(({ data }) => data ?? null)
      .catch((err: AxiosError) => {
        throw err?.response?.data ?? err;
      });
  },
};
