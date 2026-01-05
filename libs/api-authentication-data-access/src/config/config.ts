import axios, { CreateAxiosDefaults } from 'axios';
import { APIErrorAdapter } from '@boilerplate-frontend/utils';

const httpStatusValidation = (status: number) => status >= 200 && status < 300;

const axiosBaseConfig: CreateAxiosDefaults = {
  timeout: 120000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: httpStatusValidation,
};
// console.log(import.meta.env.VITE_AUTHENTICATION_API_URL);
const authenticationAPI = axios.create({
  ...axiosBaseConfig,
  baseURL: "", //import.meta.env.VITE_AUTHENTICATION_API_URL,
});

authenticationAPI.interceptors.response.use(
  (fulfilledResponse) => fulfilledResponse,
  (rejectedResponse) => Promise.reject(APIErrorAdapter(rejectedResponse)),
);

export { authenticationAPI };
