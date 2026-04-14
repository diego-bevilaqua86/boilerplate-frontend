// TableGrossUpBySecurity.stories.tsx
import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockGrossUpBySecurity } from '../../mocks/mocks';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withI18NProvider } from '../../storybook/decorators/withI18NProvider';
import { withMantineProvider } from '../../storybook/decorators/withMantineProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { TableGrossUpBySecurity } from './TableGrossUpBySecurity';

const meta: Meta<typeof TableGrossUpBySecurity> = {
  component: TableGrossUpBySecurity,
  title: 'UI/Organisms/TableGrossUpBySecurity',
  decorators: [withMantineProvider, withI18NProvider, withContentRequestProvider, withRequestHooksProvider],
};

export default meta;
type Story = StoryObj<typeof TableGrossUpBySecurity>;

export const Default: Story = {};

export const Loading: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpBySecurity={() => {
        throw new Promise(() => undefined);
      }}
    >
      <TableGrossUpBySecurity />
    </RequestHooksProvider>
  ),
};

export const Error: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpBySecurity={() => {
        throw new globalThis.Error('Falha ao carregar gross up por ativo.');
      }}
    >
      <TableGrossUpBySecurity />
    </RequestHooksProvider>
  ),
};

export const Empty: Story = {
  render: () => (
    <RequestHooksProvider
      {...providerProps}
      useFetchGrossUpBySecurity={createMockHook([] as Array<GrossUpBySecurity>)}
    >
      <TableGrossUpBySecurity />
    </RequestHooksProvider>
  ),
};

export const WithMockData: Story = {
  render: () => (
    <RequestHooksProvider {...providerProps} useFetchGrossUpBySecurity={createMockHook(mockGrossUpBySecurity)}>
      <TableGrossUpBySecurity />
    </RequestHooksProvider>
  ),
};
