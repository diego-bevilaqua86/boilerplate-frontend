import axios, { CreateAxiosDefaults } from 'axios';

const httpStatusValidation = (status: number) => status >= 200 && status < 300;

const axiosBaseConfig: CreateAxiosDefaults = {
  timeout: 120000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: httpStatusValidation,
};

const clientAPI = axios.create({
  ...axiosBaseConfig,
  baseURL: import.meta.env.VITE_CLIENT_API_URL,
});

export { clientAPI };
