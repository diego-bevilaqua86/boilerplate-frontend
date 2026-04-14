import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'pt', 'es'],
  sourceLocale: 'pt',
  format: 'po',
  catalogs: [
    {
      path: '<rootDir>/libs/i18n/src/locales/{locale}',
      include: [
        '<rootDir>/libs/ui/src',
        '<rootDir>/libs/types/src',
        '<rootDir>/libs/utils/src',
        '<rootDir>/libs/api-authentication-data-access/src',
        '<rootDir>/libs/api-client-data-access/src',
        '<rootDir>/apps/authentication/src',
      ],
    },
  ],
};

export default config;
