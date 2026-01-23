import type { Meta, StoryObj } from '@storybook/react-vite';
import { NetWorthOverPeriod } from './NetWorthOverPeriod';

const meta: Meta<typeof NetWorthOverPeriod> = {
  component: NetWorthOverPeriod,
  title: 'UI/Organisms/NetWorthOverPeriod',
};
export default meta;

type Story = StoryObj<typeof NetWorthOverPeriod>;

export const Primary: Story = {
  args: {},
};
