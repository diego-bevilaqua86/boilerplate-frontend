import { GenericTableData } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { TablePerformanceAnalysisEarningByClassification } from './TablePerformanceAnalysisEarningByClassification';

const meta: Meta<typeof TablePerformanceAnalysisEarningByClassification> = {
  component: TablePerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/TablePerformanceAnalysisEarningByClassification',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof TablePerformanceAnalysisEarningByClassification>;

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
      <TablePerformanceAnalysisEarningByClassification />
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
      <TablePerformanceAnalysisEarningByClassification />
    </RequestHooksProvider>
  ),
};

// EmptyWidget exibido quando data retorna nulo
export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGenericTableData={createMockHook(null as unknown as GenericTableData)}
    >
      <TablePerformanceAnalysisEarningByClassification />
    </RequestHooksProvider>
  ),
};
