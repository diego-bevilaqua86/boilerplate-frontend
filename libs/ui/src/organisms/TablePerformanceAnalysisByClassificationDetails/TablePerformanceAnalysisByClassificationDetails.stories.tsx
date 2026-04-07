import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { TablePerformanceAnalysisByClassificationDetails } from './TablePerformanceAnalysisByClassificationDetails';

const meta = {
  component: TablePerformanceAnalysisByClassificationDetails,
  title: 'UI/Organisms/TablePerformanceAnalysisByClassificationDetails',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
} satisfies Meta<typeof TablePerformanceAnalysisByClassificationDetails>;
export default meta;

type Story = StoryObj<typeof TablePerformanceAnalysisByClassificationDetails>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TablePerformanceAnalysisByClassificationDetails/gi)).toBeTruthy();
  },
} satisfies Story;
