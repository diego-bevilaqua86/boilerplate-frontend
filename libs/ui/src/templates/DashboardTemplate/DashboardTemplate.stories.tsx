import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardTemplate } from './DashboardTemplate';

const meta = {
  component: DashboardTemplate,
  title: 'UI/Templates/DashboardTemplate',
  args: {},
} satisfies Meta<typeof DashboardTemplate>;
export default meta;

type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {};
