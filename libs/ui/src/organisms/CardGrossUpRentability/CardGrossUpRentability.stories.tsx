import { GrossUpRentability } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { CardGrossUpRentability } from './CardGrossUpRentability';

const meta: Meta<typeof CardGrossUpRentability> = {
  component: CardGrossUpRentability,
  title: 'UI/Organisms/CardGrossUpRentability',
  decorators: [withRequestHooksProvider, withContentRequestProvider],
};

export default meta;
type Story = StoryObj<typeof CardGrossUpRentability>;

// Dados injetados pelo withRequestHooksProvider (mockGrossUpRentability)
export const Default: Story = {};

// TablePlaceholder exibido via Suspense enquanto a Promise não resolve
export const Loading: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpRentability={() => {
        throw new Promise(() => {});
      }}
    >
      <CardGrossUpRentability />
    </RequestHooksProvider>
  ),
};

// ErrorCard exibido via ErrorBoundary quando a requisição lança erro
export const WithError: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpRentability={() => {
        throw new Error('Falha ao carregar dados de rentabilidade com Gross Up.');
      }}
    >
      <CardGrossUpRentability />
    </RequestHooksProvider>
  ),
};

// EmptyWidget exibido quando data retorna array vazio
export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpRentability={createMockHook([] as Array<GrossUpRentability>)}
    >
      <CardGrossUpRentability />
    </RequestHooksProvider>
  ),
};
