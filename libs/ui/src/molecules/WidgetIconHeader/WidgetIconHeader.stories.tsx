import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartLineUp } from '@phosphor-icons/react';
import { withMantineProvider } from '../../storybook/decorators/withMantineProvider';
import { withI18NProvider } from '../../storybook/decorators/withI18NProvider';
import { WidgetIconHeader } from './WidgetIconHeader';

const meta: Meta<typeof WidgetIconHeader> = {
  component: WidgetIconHeader,
  title: 'UI/Molecules/WidgetIconHeader',
  decorators: [withMantineProvider, withI18NProvider],
};

export default meta;
type Story = StoryObj<typeof WidgetIconHeader>;

export const Default: Story = {
  args: {
    title: 'Gross up por ativo',
    icon: <ChartLineUp weight="duotone" />,
  },
};
