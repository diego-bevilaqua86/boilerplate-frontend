import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardPerformanceAnalysisEarningByClassification } from './CardPerformanceAnalysisEarningByClassification';

const meta: Meta<typeof CardPerformanceAnalysisEarningByClassification> = {
  component: CardPerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/CardPerformanceAnalysisEarningByClassification',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof CardPerformanceAnalysisEarningByClassification>;

export const Default: Story = {};
