import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActiveFilterBadge } from './ActiveFilterBadge';

const meta: Meta<typeof ActiveFilterBadge> = {
  component: ActiveFilterBadge,
  title: 'UI/Atoms/ActiveFilterBadge',
  args: {
    label: 'Renda Fixa',
    onRemove: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof ActiveFilterBadge>;

export const Default: Story = {};
