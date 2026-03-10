// ChartLiquidityByPeriod.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartLiquidityByPeriod } from './ChartLiquidityByPeriod';

const meta: Meta<typeof ChartLiquidityByPeriod> = {
  component: ChartLiquidityByPeriod,
  title: 'UI/Organisms/ChartLiquidityByPeriod',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof ChartLiquidityByPeriod>;

export const Default: Story = {};