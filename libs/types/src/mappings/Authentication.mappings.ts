import { APIMappingArray, APIMappingEnum } from '../types/Default.types';

export const MFA_METHODS = ['email', 'sms'] as const;

export type MFAMethod = (typeof MFA_METHODS)[number];

export const AuthenticationMappings = () => {
  const MFA_METHODS_ENUM: APIMappingEnum<MFAMethod> = {
    email: { apiLabel: 'email', screenLabel: 'E-mail' },
    sms: { apiLabel: 'sms', screenLabel: 'SMS' },
  };

  const MFA_METHOD_MAPPING: APIMappingArray<MFAMethod> = Object.values(MFA_METHODS_ENUM);

  return { MFA_METHOD_MAPPING };
};
