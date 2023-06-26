import axios, { type AxiosRequestConfig } from 'axios';

/**
 * This pattern is used to separate clients to be used by frontend and backend
 * allow further configuration on request intercept,
 * configure custom headers, and authorization with token.
 *
 * This setup allows changing to other http client such as fetch
 *
 * Current setup is to use Next.js middleware and apis to hide and protect external API endpoints
 */
export const httpClient = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axios<T>(url, config).then((res) => res.data);
};

export const serverHttpClient = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axios<T>(url, config).then((res) => res.data);
};
