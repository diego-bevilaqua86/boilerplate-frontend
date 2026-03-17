import { GroupingSummary } from '@boilerplate-frontend/types';
import { ContentRequestProvider, ContentRequestProviderProps } from '@boilerplate-frontend/utils';
import { ReactRenderer } from '@storybook/react';
import { DecoratorFunction } from 'storybook/internal/csf';

const initialSelectedGroupingSummary: GroupingSummary = {
  _id: '6973a8942d6ab09393738777',
  name: 'Agrupamento Principal',
  amount: 100000,
  balance: 98500,
  currency: 'BRL',
  rentability: 0.085,
  positionDate: new Date(),
  isOwn: true,
  fxRate: 1,
  fxDate: null,
  benchmarks: [{ securityId: 'CDI', isPrimary: true }],
};

export const withContentRequestProvider: DecoratorFunction<ReactRenderer> = (Story) => {
  const providerProps: ContentRequestProviderProps = {
    initialSelectedClient: '6973a86f971a01c79860f95e',
    initialSelectedGrouping: '6973a8942d6ab09393738777',
    initialSelectedTemplate: '28579b25-7639-5aee-be74-88225d9939d8', // Template chamado "dashboard"
    initialSelectedGroupingSummary: initialSelectedGroupingSummary,
    initialSelectedPeriod: 'year',
    initialPalette: [],
    availableTemplates: [],
  };

  return (
    <ContentRequestProvider {...providerProps}>
      <Story />
    </ContentRequestProvider>
  );
};
