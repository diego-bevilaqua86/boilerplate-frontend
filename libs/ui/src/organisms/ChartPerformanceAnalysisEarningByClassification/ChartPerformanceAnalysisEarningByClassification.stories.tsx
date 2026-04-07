import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { ChartPerformanceAnalysisEarningByClassification } from './ChartPerformanceAnalysisEarningByClassification';

const meta: Meta<typeof ChartPerformanceAnalysisEarningByClassification> = {
  component: ChartPerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/ChartPerformanceAnalysisEarningByClassification',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
};
export default meta;

type Story = StoryObj<typeof ChartPerformanceAnalysisEarningByClassification>;

export const Primary: Story = {
  args: {},
};
