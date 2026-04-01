import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ChartPerformanceAnalysisByClassificationLine } from './ChartPerformanceAnalysisByClassificationLine';

const meta = {
  component: ChartPerformanceAnalysisByClassificationLine,
  title: 'UI/Organisms/ChartPerformanceAnalysisByClassificationLine',
} satisfies Meta<typeof ChartPerformanceAnalysisByClassificationLine>;
export default meta;

type Story = StoryObj<typeof ChartPerformanceAnalysisByClassificationLine>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ChartPerformanceAnalysisByClassificationLine/gi)).toBeTruthy();
  },
} satisfies Story;
