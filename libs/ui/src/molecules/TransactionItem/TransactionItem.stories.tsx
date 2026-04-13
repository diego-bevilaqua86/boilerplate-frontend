import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockTransactionsPopulated } from '../../mocks/mocks';
import { TransactionItem } from './TransactionItem';

const meta: Meta<typeof TransactionItem> = {
  component: TransactionItem,
  title: 'UI/Molecules/TransactionItem',
  args: {
    transaction: mockTransactionsPopulated[0],
    onOpenModalTransactionDetails: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof TransactionItem>;

export const Default: Story = {};

export const WithComment: Story = {
  args: {
    transaction: {
      ...mockTransactionsPopulated[0],
      comment: 'Comentário do gestor sobre esta transação.',
    },
  },
};
