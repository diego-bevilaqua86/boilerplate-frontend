import type { Meta, StoryObj } from '@storybook/react-vite';
import { PerformanceOverPeriod } from './PerformanceOverPeriod';

const meta = {
  component: PerformanceOverPeriod,
  title: 'UI/Organisms/PerformanceOverPeriod',
} satisfies Meta<typeof PerformanceOverPeriod>;
export default meta;

type Story = StoryObj<typeof PerformanceOverPeriod>;

export const Primary = {
  args: {},
} satisfies Story;
