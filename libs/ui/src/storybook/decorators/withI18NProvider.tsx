import { I18NProvider } from '@boilerplate-frontend/i18n';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';

export const withI18NProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  return (
    <I18NProvider locale={'pt'}>
      <Story />
    </I18NProvider>
  );
};
