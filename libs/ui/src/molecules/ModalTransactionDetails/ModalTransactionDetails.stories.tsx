import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockTransactionsPopulated } from '../../mocks/mocks';
import { ModalTransactionDetails } from './ModalTransactionDetails';

const meta: Meta<typeof ModalTransactionDetails> = {
  component: ModalTransactionDetails,
  title: 'UI/Molecules/ModalTransactionDetails',
  args: {
    opened: true,
    onClose: () => undefined,
    transaction: mockTransactionsPopulated[0],
  },
};

export default meta;
type Story = StoryObj<typeof ModalTransactionDetails>;

export const Opened: Story = {};

export const WithComment: Story = {
  args: {
    transaction: {
      ...mockTransactionsPopulated[0],
      comment: 'Operação realizada conforme planejamento estratégico do cliente para diversificação da carteira.',
    },
  },
};
