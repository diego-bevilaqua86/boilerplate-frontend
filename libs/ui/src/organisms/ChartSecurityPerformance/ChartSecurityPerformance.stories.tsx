// ChartLiquidityByPeriod.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartSecurityPerformance } from './ChartSecurityPerformance';

const meta: Meta<typeof ChartSecurityPerformance> = {
  component: ChartSecurityPerformance,
  title: 'UI/Organisms/ChartSecurityPerformance',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof ChartSecurityPerformance>;

export const Default: Story = {};
