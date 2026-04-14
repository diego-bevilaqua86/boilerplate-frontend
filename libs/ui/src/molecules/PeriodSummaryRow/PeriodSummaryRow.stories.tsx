import type { Meta, StoryObj } from '@storybook/react-vite';
import { PeriodSummaryRow } from './PeriodSummaryRow';

const meta: Meta<typeof PeriodSummaryRow> = {
  component: PeriodSummaryRow,
  title: 'UI/Molecules/PeriodSummaryRow',
};

export default meta;
type Story = StoryObj<typeof PeriodSummaryRow>;

export const Default: Story = {
  args: {
    count: 5,
    countLabel: 'Ativos',
    currencyTotal: 'R$ 50.000,00',
    percentTotal: '25,50%',
  },
};
