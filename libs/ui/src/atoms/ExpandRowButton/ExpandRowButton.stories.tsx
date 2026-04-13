import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpandRowButton } from './ExpandRowButton';

const meta: Meta<typeof ExpandRowButton> = {
  component: ExpandRowButton,
  title: 'UI/Atoms/ExpandRowButton',
  args: {
    onToggle: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ExpandRowButton>;

export const Collapsed: Story = {
  args: { isExpanded: false },
};

export const Expanded: Story = {
  args: { isExpanded: true },
};
