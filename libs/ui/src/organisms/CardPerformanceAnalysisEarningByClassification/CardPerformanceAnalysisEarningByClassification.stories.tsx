import { GenericTableData } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { CardPerformanceAnalysisEarningByClassification } from './CardPerformanceAnalysisEarningByClassification';

const meta: Meta<typeof CardPerformanceAnalysisEarningByClassification> = {
  component: CardPerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/CardPerformanceAnalysisEarningByClassification',
  decorators: [withRequestHooksProvider, withContentRequestProvider],
};

export default meta;
type Story = StoryObj<typeof CardPerformanceAnalysisEarningByClassification>;

// Dados injetados pelo withRequestHooksProvider (mockGenericTableData)
export const Default: Story = {};

// TablePlaceholder exibido via Suspense enquanto a Promise não resolve
export const Loading: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGenericTableData={() => {
        throw new Promise(() => {});
      }}
    >
      <CardPerformanceAnalysisEarningByClassification />
    </RequestHooksProvider>
  ),
};

// ErrorCard exibido via ErrorBoundary quando a requisição lança erro
export const WithError: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGenericTableData={() => {
        throw new Error('Falha ao carregar dados de contribuição por classe.');
      }}
    >
      <CardPerformanceAnalysisEarningByClassification />
    </RequestHooksProvider>
  ),
};

// EmptyWidget exibido quando data retorna array vazio
export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGenericTableData={createMockHook({ hierarchicalData: [], rows: [] } as unknown as GenericTableData)}
    >
      <CardPerformanceAnalysisEarningByClassification />
    </RequestHooksProvider>
  ),
};
