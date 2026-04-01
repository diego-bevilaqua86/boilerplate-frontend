import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TablePerformanceAnalysisByClassificationDetails } from './TablePerformanceAnalysisByClassificationDetails';

const meta = {
  component: TablePerformanceAnalysisByClassificationDetails,
  title: 'UI/Organisms/TablePerformanceAnalysisByClassificationDetails',
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
