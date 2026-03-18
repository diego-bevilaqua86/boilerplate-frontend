// withTemplateNavigationProvider.tsx — renderer atualizado para SecuritiesLiquidity
import { TemplateNavigationProvider } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';
import { DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE } from '../../../../utils/src/constants/template';
import { ModalTemplate } from '../../templates/ModalTemplate/ModalTemplate';

const renderers = {
  'security-details': () => (
    <ModalTemplate title="Liquidez (teste de navegação)" layouts={DEFAULT_SECURITIES_LIQUIDITY_TEMPLATE} />
  ),
};

export const withTemplateNavigationProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TemplateNavigationProvider renderers={renderers}>
    <Story />
  </TemplateNavigationProvider>
);
