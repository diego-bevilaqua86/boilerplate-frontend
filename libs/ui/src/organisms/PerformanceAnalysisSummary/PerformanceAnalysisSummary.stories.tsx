import type { Meta, StoryObj } from '@storybook/react-vite';
import { PerformanceAnalysisSummary } from './PerformanceAnalysisSummary';

const meta = {
  component: PerformanceAnalysisSummary,
  title: 'UI/Organisms/PerformanceAnalysisSummary',
} satisfies Meta<typeof PerformanceAnalysisSummary>;
export default meta;

type Story = StoryObj<typeof PerformanceAnalysisSummary>;

export const Primary = {
  args: {},
} satisfies Story;
