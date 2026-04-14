import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardPerformanceEarningItem } from './CardPerformanceEarningItem';

const meta: Meta<typeof CardPerformanceEarningItem> = {
  component: CardPerformanceEarningItem,
  title: 'UI/Molecules/CardPerformanceEarningItem',
  args: {
    classLabel: 'Renda Fixa',
    plPercent: 0.42,
    balance: 150000,
    financialEarnings: 6300,
    contributionYield: 0.038,
    rentability: 0.085,
    currency: 'BRL',
  },
};

export default meta;
type Story = StoryObj<typeof CardPerformanceEarningItem>;

export const Default: Story = {};

export const Negative: Story = {
  args: {
    plPercent: -0.15,
  },
};

export const NullPlPercent: Story = {
  args: {
    plPercent: null,
  },
};
