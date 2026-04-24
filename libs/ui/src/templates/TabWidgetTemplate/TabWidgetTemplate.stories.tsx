import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeftRight, BarChart2, Calendar } from 'lucide-react';
import { DEFAULT_UPCOMING_MATURITIES_TEMPLATE } from '../../../../utils/src/constants/template';
import { withContentRequestProvider } from '../../storybook/decorators/withContentRequestProvider';
import { withRequestHooksProvider } from '../../storybook/decorators/withRequestHooksProvider';
import { withTemplateModalProvider } from '../../storybook/decorators/withTemplateModalProvider';
import { TabWidgetTemplate } from './TabWidgetTemplate';

const meta: Meta<typeof TabWidgetTemplate> = {
  component: TabWidgetTemplate,
  title: 'UI/Templates/TabWidgetTemplate',
  decorators: [withRequestHooksProvider, withContentRequestProvider, withTemplateModalProvider],
  args: {
    tabs: [
      { label: 'Movimentações', value: 'movimentacoes', icon: ArrowLeftRight, layouts: {} },
      { label: 'Liquidez',      value: 'liquidez',      icon: BarChart2,      layouts: {} },
      { label: 'Vencimentos',   value: 'vencimentos',   icon: Calendar,       layouts: DEFAULT_UPCOMING_MATURITIES_TEMPLATE },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TabWidgetTemplate>;

export const Default: Story = {};

export const SegundaAtiva: Story = {
  args: {
    defaultValue: 'liquidez',
  },
};
