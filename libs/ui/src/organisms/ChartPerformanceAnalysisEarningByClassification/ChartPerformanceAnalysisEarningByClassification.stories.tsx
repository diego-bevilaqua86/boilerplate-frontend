import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartPerformanceAnalysisEarningByClassification } from './ChartPerformanceAnalysisEarningByClassification';

const meta: Meta<typeof ChartPerformanceAnalysisEarningByClassification> = {
  component: ChartPerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/ChartPerformanceAnalysisEarningByClassification',
};
export default meta;

type Story = StoryObj<typeof ChartPerformanceAnalysisEarningByClassification>;

export const Primary: Story = {
  args: {},
};
