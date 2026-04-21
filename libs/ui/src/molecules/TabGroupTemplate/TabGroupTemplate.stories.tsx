import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart2, TrendingUp, Wallet } from 'lucide-react';
import { TabGroupTemplate } from './TabGroupTemplate';

const meta: Meta<typeof TabGroupTemplate> = {
  component: TabGroupTemplate,
  title: 'UI/Molecules/TabGroupTemplate',
  args: {
    tabs: [
      { label: 'Carteira', value: 'carteira', layouts: {} },
      { label: 'Rentabilidade', value: 'rentabilidade', layouts: {} },
      { label: 'Movimentações', value: 'movimentacoes', layouts: {} },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TabGroupTemplate>;

export const Default: Story = {};

export const ComIcones: Story = {
  args: {
    tabs: [
      { label: 'Carteira', value: 'carteira', icon: Wallet, layouts: {} },
      { label: 'Rentabilidade', value: 'rentabilidade', icon: TrendingUp, layouts: {} },
      { label: 'Movimentações', value: 'movimentacoes', icon: BarChart2, layouts: {} },
    ],
  },
};

export const SegundaAtiva: Story = {
  args: {
    defaultValue: 'rentabilidade',
  },
};
