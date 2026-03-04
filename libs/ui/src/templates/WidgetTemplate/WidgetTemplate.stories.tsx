import type { Meta, StoryObj } from '@storybook/react-vite';
import { WidgetTemplate } from './WidgetTemplate';

const meta = {
  component: WidgetTemplate,
  title: 'UI/Templates/WidgetTemplate',
  args: {},
} satisfies Meta<typeof WidgetTemplate>;
export default meta;

type Story = StoryObj<typeof WidgetTemplate>;

export const Default: Story = {};
