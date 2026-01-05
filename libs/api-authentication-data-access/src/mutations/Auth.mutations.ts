import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthenticationFirstFactorDTO } from '@boilerplate-frontend/types';
import { firstFactorAuthentication } from '../services/Authentication.service';

export const useFirstFactorAuthentication = (params?: Omit<UseMutationOptions<void, Error, AuthenticationFirstFactorDTO>, 'mutationFn'>) => {
  return useMutation({
    mutationFn: firstFactorAuthentication,
    ...params
  });
};
