import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeftRight, BarChart2, Calendar } from 'lucide-react';
import { TabGroup } from './TabGroup';

const meta: Meta<typeof TabGroup> = {
  component: TabGroup,
  title: 'UI/Molecules/TabGroup',
  args: {
    tabs: [
      { label: 'Movimentações', value: 'movimentacoes', icon: ArrowLeftRight },
      { label: 'Liquidez',      value: 'liquidez',      icon: BarChart2 },
      { label: 'Vencimentos',   value: 'vencimentos',   icon: Calendar },
    ],
    value: 'movimentacoes',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <TabGroup {...args} value={value} onChange={setValue} />;
  },
};
