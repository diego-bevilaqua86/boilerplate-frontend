import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { ChartPerformanceAnalysisEarningByClassification } from './ChartPerformanceAnalysisEarningByClassification';

const meta: Meta<typeof ChartPerformanceAnalysisEarningByClassification> = {
  component: ChartPerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/ChartPerformanceAnalysisEarningByClassification',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
};
export default meta;

type Story = StoryObj<typeof ChartPerformanceAnalysisEarningByClassification>;

export const Primary: Story = {
  args: {},
};
