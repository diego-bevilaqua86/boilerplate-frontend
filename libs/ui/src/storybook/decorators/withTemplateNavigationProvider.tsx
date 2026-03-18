// withTemplateNavigationProvider.tsx
//
// No Storybook, renderers logam no console em vez de renderizar
// templates reais — permite testar a navegação sem precisar de
// SecurityDetailsTemplate implementado.

import { TemplateNavigationProvider } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { DEFAULT_GROSS_UP_TEMPLATE } from '../../../../utils/src/constants/template';
import { ModalTemplate } from '../../templates/ModalTemplate/ModalTemplate';

const renderers = {
  'security-details': () => <ModalTemplate title="Gross Up (teste de navegação)" layouts={DEFAULT_GROSS_UP_TEMPLATE} />,
};

export const withTemplateNavigationProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TemplateNavigationProvider renderers={renderers}>
    <Story />
  </TemplateNavigationProvider>
);
