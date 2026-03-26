import type { Meta, StoryObj } from '@storybook/react-vite';
import { TablePerformanceAnalysisEarningByClassification } from './TablePerformanceAnalysisEarningByClassification';

const meta = {
  component: TablePerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/TablePerformanceAnalysisEarningByClassification',
} satisfies Meta<typeof TablePerformanceAnalysisEarningByClassification>;
export default meta;

type Story = StoryObj<typeof TablePerformanceAnalysisEarningByClassification>;

export const Primary = {
  args: {},
} satisfies Story;
