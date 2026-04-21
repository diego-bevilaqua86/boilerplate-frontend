import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart2 } from 'lucide-react';
import { TabButton } from './TabButton';

const meta: Meta<typeof TabButton> = {
  component: TabButton,
  title: 'UI/Atoms/TabButton',
  args: {
    label: 'Carteira',
    value: 'carteira',
    icon: BarChart2,
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<typeof TabButton>;

export const Default: Story = {};

export const Ativa: Story = {
  args: {
    isActive: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
