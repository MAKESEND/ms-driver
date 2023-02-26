import axiosClient from 'axios';
import type { AxiosError } from 'axios';

import type { DriverData } from '~/types';
import { httpClient } from '../api';
import { resourceUrls, ResourceUrls } from '~/constants/resource-urls';
import { envs, ServerEnvs } from '~/constants/envs';

import type {
  DriverAuthentication,
  LoginFormFields,
} from '~/components/login/login-page';

const clientInitiator = httpClient(axiosClient);
clientInitiator.server.init();
const serverHttpClient = clientInitiator.server.getHttpClient();

const driverMgntHeaders = {
  'content-type': 'application/json',
  apikey: envs[ServerEnvs.MS_DRIVER_MGMT],
};

export const authServices = {
  login: async (
    credentials: Omit<DriverAuthentication, LoginFormFields.Remember>
  ) => {
    return await serverHttpClient
      .post<{ id: string }>(
        resourceUrls[ResourceUrls.DriverAuth],
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
      .get<DriverData>(`${resourceUrls[ResourceUrls.DriverData]}/${driverId}`, {
        headers: driverMgntHeaders,
      })
      .then(({ data }) => data ?? null)
      .catch((err: AxiosError) => {
        throw err?.response?.data ?? err;
      });
  },
};
