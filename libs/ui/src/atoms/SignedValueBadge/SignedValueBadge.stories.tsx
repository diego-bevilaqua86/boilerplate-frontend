import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignedValueBadge } from './SignedValueBadge';

const meta: Meta<typeof SignedValueBadge> = {
  component: SignedValueBadge,
  title: 'UI/Atoms/SignedValueBadge',
  args: {
    children: 'R$ 1.234,56',
  },
};

export default meta;
type Story = StoryObj<typeof SignedValueBadge>;

export const Default: Story = {
  args: { value: 1234.56 },
};

export const Negative: Story = {
  args: { value: -1234.56 },
};
