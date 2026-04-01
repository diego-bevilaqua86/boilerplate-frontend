// withTemplateNavigationProvider.tsx
import { TemplateNavigationProvider } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import {
  DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE,
  DEFAULT_SECURITY_DETAILS_TEMPLATE,
} from '../../../../utils/src/constants/template';
import { ModalTemplate } from '../../templates/ModalTemplate/ModalTemplate';

const renderers = {
  'security-details': () => <ModalTemplate title="Detalhes do ativo" layouts={DEFAULT_SECURITY_DETAILS_TEMPLATE} />,
  'performance-details': () => (
    <ModalTemplate title="Informações do ativo" layouts={DEFAULT_PERFORMANCE_ANALYSIS_DETAILS_TEMPLATE} />
  ),
};

export const withTemplateNavigationProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TemplateNavigationProvider renderers={renderers}>
    <Story />
  </TemplateNavigationProvider>
);
