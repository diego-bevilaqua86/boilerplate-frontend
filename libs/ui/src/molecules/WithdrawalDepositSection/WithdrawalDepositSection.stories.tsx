import type { Meta, StoryObj } from '@storybook/react-vite';
import { WithdrawalDepositSection } from './WithdrawalDepositSection';

const meta: Meta<typeof WithdrawalDepositSection> = {
  component: WithdrawalDepositSection,
  title: 'UI/Molecules/WithdrawalDepositSection',
};
export default meta;
type Story = StoryObj<typeof WithdrawalDepositSection>;

export const Deposits: Story = {
  args: {
    title: 'Aportes',
    currentValue: 'R$ 5.000,00',
    periodLabel: 'Em 12 meses',
    periodValue: 'R$ 48.000,00',
  },
};

export const Withdrawals: Story = {
  args: {
    title: 'Resgates',
    currentValue: 'R$ 1.200,00',
    periodLabel: 'Em 12 meses',
    periodValue: 'R$ 14.400,00',
  },
};
