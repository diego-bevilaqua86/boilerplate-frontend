import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart2 } from 'lucide-react';
import { TabWidgetTemplate } from './TabWidgetTemplate';

const meta: Meta<typeof TabWidgetTemplate> = {
  component: TabWidgetTemplate,
  title: 'UI/Molecules/TabWidgetTemplate',
  args: {
    layouts: {},
    label: 'Carteira',
    value: 'carteira',
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<typeof TabWidgetTemplate>;

export const Default: Story = {};

export const Ativa: Story = {
  args: {
    label: 'Carteira',
    value: 'carteira',
    icon: BarChart2,
    isActive: true,
  },
};

export const SemIcone: Story = {
  args: {
    label: 'Carteira',
    value: 'carteira',
    isActive: true,
  },
};
