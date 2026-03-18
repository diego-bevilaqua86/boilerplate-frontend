// withTemplateNavigationProvider.tsx
//
// No Storybook, renderers logam no console em vez de renderizar
// templates reais — permite testar a navegação sem precisar de
// SecurityDetailsTemplate implementado.

import { TemplateNavigationProvider } from '@boilerplate-frontend/utils';
import { Center, Text } from '@mantine/core';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';

const renderers = {
  'security-details': (params?: Record<string, unknown>) => {
    console.log('[TemplateNavigation] renderizando security-details com params:', params);
    return (
      <Center h="100vh">
        <Text c="dimmed" size="sm">
          [Storybook] SecurityDetailsTemplate — params: {JSON.stringify(params)}
        </Text>
      </Center>
    );
  },
};

export const withTemplateNavigationProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TemplateNavigationProvider renderers={renderers}>
    <Story />
  </TemplateNavigationProvider>
);
