import type { Meta, StoryObj } from '@storybook/react-vite';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { TablePerformanceAnalysisEarningByClassification } from './TablePerformanceAnalysisEarningByClassification';

const meta = {
  component: TablePerformanceAnalysisEarningByClassification,
  title: 'UI/Organisms/TablePerformanceAnalysisEarningByClassification',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
} satisfies Meta<typeof TablePerformanceAnalysisEarningByClassification>;
export default meta;

type Story = StoryObj<typeof TablePerformanceAnalysisEarningByClassification>;

export const Primary = {
  args: {},
} satisfies Story;
