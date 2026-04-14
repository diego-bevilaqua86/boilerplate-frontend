// ChartGrossUpAllocation.stories.tsx
import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockGrossUpAllocation } from '../../mocks/mocks';
import { DoughnutChart, DoughnutChartProps } from '../../molecules/DoughnutChart/DoughnutChart';
import { ChartGrossUpAllocation } from './ChartGrossUpAllocation';
import { useChartGrossUpAllocationManager } from './useChartGrossUpAllocationManager';

// ─── Story completo com widget ────────────────────────────────────────────────

const meta: Meta<typeof ChartGrossUpAllocation> = {
  component: ChartGrossUpAllocation,
  title: 'UI/Organisms/ChartGrossUpAllocation',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof ChartGrossUpAllocation>;

export const Default: Story = {};

// ─── Story isolado para variações visuais ─────────────────────────────────────

const ChartVariationsRender = (args: Partial<DoughnutChartProps>) => {
  const chartProps = useChartGrossUpAllocationManager({ data: mockGrossUpAllocation });

  return (
    <Box h={320}>
      <DoughnutChart {...chartProps} {...args} />
    </Box>
  );
};

export const Horizontal: StoryObj<DoughnutChartProps> = {
  render: ChartVariationsRender,
  args: { orientation: 'horizontal' },
};

export const Vertical: StoryObj<DoughnutChartProps> = {
  render: ChartVariationsRender,
  args: { orientation: 'vertical' },
};

export const ShowValue: StoryObj<DoughnutChartProps> = {
  render: ChartVariationsRender,
  args: { showValue: true, currency: 'BRL' },
};

export const ShowPercentage: StoryObj<DoughnutChartProps> = {
  render: ChartVariationsRender,
  args: { showPercentage: true },
};