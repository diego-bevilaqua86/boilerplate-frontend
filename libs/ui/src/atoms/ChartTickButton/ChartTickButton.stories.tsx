import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartTickButton } from './ChartTickButton';

const meta: Meta<typeof ChartTickButton> = {
  component: ChartTickButton,
  title: 'UI/Atoms/ChartTickButton',
  args: {
    x: 80,
    y: 0,
    payload: { value: 'Renda Fixa' },
    barWidth: 160,
    disabledValues: ['Ganhos/Despesas', 'Saldo em conta', 'Total'],
    onClick: (value) => console.log('clicked:', value),
  },
  decorators: [
    (Story) => (
      <svg width={300} height={60}>
        <Story />
      </svg>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChartTickButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    payload: { value: 'Total' },
  },
};

export const NoClick: Story = {
  args: {
    onClick: undefined,
  },
};
