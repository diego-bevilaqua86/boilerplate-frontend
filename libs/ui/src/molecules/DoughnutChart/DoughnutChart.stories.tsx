import { DonutChartCell } from '@mantine/charts';
import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DoughnutChart, DoughnutChartProps } from './DoughnutChart';

export const doughnutChartDataMock: Array<DonutChartCell> = [
  {
    name: 'Série A',
    value: 9.09,
    color: 'paletteA.0',
  },
  {
    name: 'Série B',
    value: 9.09,
    color: 'paletteA.1',
  },
  {
    name: 'Série C',
    value: 9.09,
    color: 'paletteA.2',
  },
  {
    name: 'Série D',
    value: 9.09,
    color: 'paletteA.3',
  },
  {
    name: 'Série E',
    value: 9.09,
    color: 'paletteA.4',
  },
  {
    name: 'Série F',
    value: 9.09,
    color: 'paletteA.5',
  },
  {
    name: 'Série G',
    value: 9.09,
    color: 'paletteA.6',
  },
  {
    name: 'Série H',
    value: 9.09,
    color: 'paletteA.7',
  },
  {
    name: 'Série I',
    value: 9.09,
    color: 'paletteA.8',
  },
  {
    name: 'Série J',
    value: 9.09,
    color: 'paletteA.9',
  },
  {
    name: 'Série K',
    value: 9.09,
    color: 'paletteA.10',
  },
];

const Render = (args: DoughnutChartProps) => {
  return (
    <Box h={480}>
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
