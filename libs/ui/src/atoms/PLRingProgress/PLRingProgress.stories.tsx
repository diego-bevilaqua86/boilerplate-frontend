import type { Meta, StoryObj } from '@storybook/react-vite';
import { PLRingProgress } from './PLRingProgress';

const meta: Meta<typeof PLRingProgress> = {
  component: PLRingProgress,
  title: 'UI/Atoms/PLRingProgress',
};

export default meta;
type Story = StoryObj<typeof PLRingProgress>;

export const Positive: Story = {
  args: { plPercent: 0.15 },
};

export const Negative: Story = {
  args: { plPercent: -0.08 },
};

export const Zero: Story = {
  args: { plPercent: 0 },
};

export const Null: Story = {
  args: { plPercent: null },
};
