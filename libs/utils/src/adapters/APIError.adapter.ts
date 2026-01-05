import { APIError, APIResponseError } from '@boilerplate-frontend/types';
import { isAxiosError } from 'axios';

export const APIErrorAdapter = (error: unknown): APIResponseError => {
  let message: string;
  let originalResponse: unknown;

  if (isAxiosError<APIError, unknown>(error) && error.response) {
    originalResponse = error.response.data;
    message = error.response.data?.message ?? `[ ${error.response.status} ] ${error.response.statusText}`;
  } else {
    message = (error as Error).message;
  }

  const apiError: APIResponseError = new Error(message);
  apiError.originalResponse = originalResponse;

  return apiError;
};
