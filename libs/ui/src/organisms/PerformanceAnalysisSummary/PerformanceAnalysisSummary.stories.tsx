import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateNavigationProvider } from '../../storybook/decorators/withTemplateNavigationProvider';
import { PerformanceAnalysisSummary } from './PerformanceAnalysisSummary';

const meta = {
  component: PerformanceAnalysisSummary,
  title: 'UI/Organisms/PerformanceAnalysisSummary',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateNavigationProvider],
} satisfies Meta<typeof PerformanceAnalysisSummary>;
export default meta;

type Story = StoryObj<typeof PerformanceAnalysisSummary>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/PerformanceAnalysisSummary/gi)).toBeTruthy();
  },
} satisfies Story;
