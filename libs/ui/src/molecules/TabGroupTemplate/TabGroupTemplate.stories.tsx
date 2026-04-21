import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeftRight, BarChart2, Calendar } from 'lucide-react';
import { TabGroupTemplate } from './TabGroupTemplate';

const meta: Meta<typeof TabGroupTemplate> = {
  component: TabGroupTemplate,
  title: 'UI/Molecules/TabGroupTemplate',
  args: {
    tabs: [
      { label: 'Movimentações', value: 'movimentacoes', icon: ArrowLeftRight, layouts: {} },
      { label: 'Liquidez',      value: 'liquidez',      icon: BarChart2,      layouts: {} },
      { label: 'Vencimentos',   value: 'vencimentos',   icon: Calendar,       layouts: {} },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TabGroupTemplate>;

export const Default: Story = {};

export const SegundaAtiva: Story = {
  args: {
    defaultValue: 'liquidez',
  },
};
