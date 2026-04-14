import { TransactionPopulated } from '@boilerplate-frontend/types';
import { RequestHooksProvider } from '@boilerplate-frontend/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockTransactionsPopulated } from '../../mocks/mocks';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import {
  createMockHook,
  providerProps,
  withRequestHooksProvider,
} from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { TableTransactions } from './TableTransactions';

const meta: Meta<typeof TableTransactions> = {
  component: TableTransactions,
  title: 'UI/Organisms/TableTransactions',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};

export default meta;
type Story = StoryObj<typeof TableTransactions>;

export const Default: Story = {};

export const WithMockData: Story = {
  render: () => (
    <RequestHooksProvider {...providerProps} useFetchTransactions={createMockHook(mockTransactionsPopulated)}>
      <TableTransactions />
    </RequestHooksProvider>
  ),
};

export const Empty: Story = {
  render: () => (
    <RequestHooksProvider {...providerProps} useFetchTransactions={createMockHook([] as Array<TransactionPopulated>)}>
      <TableTransactions />
    </RequestHooksProvider>
  ),
};
