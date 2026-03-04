import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorCard from './ErrorCard';

const meta: Meta<typeof ErrorCard> = {
  component: ErrorCard,
  title: 'UI/Molecules/ErrorCard',
};
export default meta;

type Story = StoryObj<typeof ErrorCard>;

export const Primary: Story = {
  args: {},
};
