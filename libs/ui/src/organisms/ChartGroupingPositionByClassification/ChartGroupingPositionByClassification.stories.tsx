import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartGroupingPositionByClassification } from './ChartGroupingPositionByClassification';

const meta: Meta<typeof ChartGroupingPositionByClassification> = {
  component: ChartGroupingPositionByClassification,
  title: 'UI/Organisms/ChartGroupingPositionByClassification',
};
export default meta;

type Story = StoryObj<typeof ChartGroupingPositionByClassification>;

export const Primary: Story = {
  args: {},
};
