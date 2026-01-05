import { z } from 'zod';
import {
  AuthenticationRequestValidators,
  AuthenticationResponseValidators,
} from '../validators/Authentication.validators';

export type AuthenticationFirstFactorDTO = z.infer<
  ReturnType<typeof AuthenticationRequestValidators>['AuthenticationFirstFactorDTOSchema']
>;

export type AuthenticationSecondFactorDTO = z.infer<
  ReturnType<typeof AuthenticationRequestValidators>['AuthenticationSecondFactorDTOSchema']
>;

export type AuthenticationFirstFactorPasswordRecoveryDTO = z.infer<
  ReturnType<typeof AuthenticationRequestValidators>['AuthenticationFirstFactorPasswordRecoveryDTOSchema']
>;

export type AuthenticationSecondFactorPasswordRecoveryDTO = z.infer<
  ReturnType<typeof AuthenticationRequestValidators>['AuthenticationSecondFactorPasswordRecoveryDTOSchema']
>;

export type AuthenticationSecondFactorSuccessDTO = z.infer<
  ReturnType<typeof AuthenticationResponseValidators>['AuthenticationSecondFactorSuccessDTOSchema']
>;
