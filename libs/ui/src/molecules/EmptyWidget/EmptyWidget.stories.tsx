// EmptyWidget.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyWidget } from './EmptyWidget';

const meta: Meta<typeof EmptyWidget> = {
  component: EmptyWidget,
  title: 'UI/Molecules/EmptyWidget',
  args: {
    message: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof EmptyWidget>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    message: 'Sem vencimentos futuros.',
  },
};