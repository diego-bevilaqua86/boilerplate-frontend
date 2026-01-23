import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from 'recharts';
import { LineChart, LineChartProps } from './LineChart';
import { lineChartDataMock } from './mock';

const Render = (args: LineChartProps) => {
  return (
    <Box h={320}>
      <LineChart {...args} />
    </Box>
  );
};

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  title: 'UI/Molecules/LineChart',
  args: {
    data: lineChartDataMock,
    dataKey: 'itemLabel',
    seriesKeys: ['ItemA', 'ItemB', 'ItemC'],
    seriesLabels: ['Série A', 'Série B', 'Série C'],
    seriesColors: ['paletteA.2', 'paletteA.6', 'paletteA.10'],
  },
  render: Render,
};
export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {};
