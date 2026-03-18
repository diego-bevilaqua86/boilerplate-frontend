// withTemplateNavigationProvider.tsx
import { TemplateNavigationProvider } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';

const handleNavigateTo = (templateId: string, params?: Record<string, unknown>) => {
  console.log('[TemplateNavigation] navigateTo:', templateId, params);
};

const handleNavigateBack = () => {
  console.log('[TemplateNavigation] navigateBack');
};

export const withTemplateNavigationProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TemplateNavigationProvider
    onNavigateTo={handleNavigateTo}
    onNavigateBack={handleNavigateBack}
    currentTemplateId={null}
    currentParams={null}
  >
    <Story />
  </TemplateNavigationProvider>
);
