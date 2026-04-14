import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableWithdrawalDeposits } from './TableWithdrawalDeposits';

const meta: Meta<typeof TableWithdrawalDeposits> = {
  component: TableWithdrawalDeposits,
  title: 'UI/Organisms/TableWithdrawalDeposits',
};
export default meta;

type Story = StoryObj<typeof TableWithdrawalDeposits>;

export const Primary: Story = {
  args: {},
};
