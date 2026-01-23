import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, BarChartProps } from './BarChart';
import { barChartDataMock } from './mock';

const Render = (args: BarChartProps) => {
  return (
    <Box h={320}>
      <BarChart {...args} />
    </Box>
  );
};

const meta = {
  component: BarChart,
  title: 'UI/Molecules/BarChart',
  args: {
    data: barChartDataMock,
    dataKey: 'itemLabel',
    seriesKeys: ['ItemA', 'ItemB', 'ItemC'],
    seriesLabels: ['Série A', 'Série B', 'Série C'],
    seriesColors: ['paletteA.2', 'paletteA.6', 'paletteA.10'],
    isStacked: false,
  },
  render: Render,
} satisfies Meta<typeof BarChart>;
export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {};

export const WithStackedSeries: Story = {
  args: {
    isStacked: true,
  },
};
