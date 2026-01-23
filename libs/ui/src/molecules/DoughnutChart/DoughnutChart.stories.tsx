import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DoughnutChart, DoughnutChartProps } from './DoughnutChart';
import { doughnutChartDataMock } from './mock';

const Render = (args: DoughnutChartProps) => {
  return (
    <Box h={320}>
      <DoughnutChart {...args} />
    </Box>
  );
};

const meta = {
  component: DoughnutChart,
  title: 'UI/Molecules/DoughnutChart',
  args: {
    data: doughnutChartDataMock,
    orientation: 'horizontal',
    showValue: false,
    showPercentage: false,
  },
  argTypes: {
    currency: {
      control: {
        type: 'select',
        labels: {
          USD: 'Dólar',
          BRL: 'Real',
          GBP: 'Libra Esterlina',
          EUR: 'Euro',
        },
      },
      options: ['USD', 'BRL', 'GBP', 'EUR'],
    },
  },
  render: Render,
} satisfies Meta<typeof DoughnutChart>;
export default meta;

type Story = StoryObj<typeof DoughnutChart>;

export const Default: Story = {};

export const ShowCurrency: Story = {
  args: {
    currency: 'BRL',
  },
};
