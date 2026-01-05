import {
  AuthenticationFirstFactorDTO,
  AuthenticationFirstFactorPasswordRecoveryDTO,
  AuthenticationResponseValidators,
  AuthenticationSecondFactorDTO,
  AuthenticationSecondFactorPasswordRecoveryDTO,
  AuthenticationSecondFactorSuccessDTO,
  ServiceEndpoints,
} from '@boilerplate-frontend/types';
import { APIErrorAdapter } from '@boilerplate-frontend/utils';
import { authenticationAPI } from '../config/config';
import { AxiosResponse } from 'axios';

const AUTHENTICATION_ROUTE = '/login';

type AuthenticationEndpointKey =
  | 'firstFactor'
  | 'secondFactor'
  | 'passwordRecoveryFirstFactor'
  | 'passwordRecoverySecondFactor';

export const AuthenticationEndpoints: ServiceEndpoints<AuthenticationEndpointKey> = {
  firstFactor: () => `${AUTHENTICATION_ROUTE}/first-factor`,
  secondFactor: () => `${AUTHENTICATION_ROUTE}/second-factor`,
  passwordRecoveryFirstFactor: () => `${AUTHENTICATION_ROUTE}/recover-password/first-factor`,
  passwordRecoverySecondFactor: () => `${AUTHENTICATION_ROUTE}/recover-password/second-factor`,
};

export const firstFactorAuthentication = async (data: AuthenticationFirstFactorDTO) => {
  const apiResponse = await authenticationAPI.post<
    void,
    AxiosResponse<void, AuthenticationFirstFactorDTO>,
    AuthenticationFirstFactorDTO
  >(AuthenticationEndpoints.firstFactor(), data);

  return apiResponse.data;
};

export const secondFactorAuthentication = async (data: AuthenticationSecondFactorDTO) => {
  const apiResponse = await authenticationAPI.post<
    AuthenticationSecondFactorSuccessDTO,
    AxiosResponse<AuthenticationSecondFactorSuccessDTO, AuthenticationSecondFactorDTO>,
    AuthenticationSecondFactorDTO
  >(AuthenticationEndpoints.secondFactor(), data);

  const parsedResponse = AuthenticationResponseValidators().AuthenticationSecondFactorSuccessDTOSchema.safeParse(
    apiResponse.data,
  );

  if (parsedResponse.success) {
    return parsedResponse.data;
  } else {
    return Promise.reject(APIErrorAdapter(parsedResponse.error));
  }
};

export const firstFactorPasswordRecovery = async (data: AuthenticationFirstFactorPasswordRecoveryDTO) => {
  const apiResponse = await authenticationAPI.post<
    void,
    AxiosResponse<void, AuthenticationFirstFactorPasswordRecoveryDTO>,
    AuthenticationFirstFactorPasswordRecoveryDTO
  >(AuthenticationEndpoints.passwordRecoveryFirstFactor(), data);

  return apiResponse.data;
};

export const secondFactorPasswordRecovery = async (data: AuthenticationSecondFactorPasswordRecoveryDTO) => {
  const apiResponse = await authenticationAPI.post<
    void,
    AxiosResponse<void, AuthenticationSecondFactorPasswordRecoveryDTO>,
    AuthenticationSecondFactorPasswordRecoveryDTO
  >(AuthenticationEndpoints.passwordRecoverySecondFactor(), data);

  return apiResponse.data;
};
