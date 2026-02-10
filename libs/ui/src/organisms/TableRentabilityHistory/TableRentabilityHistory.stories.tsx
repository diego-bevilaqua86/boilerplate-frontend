import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableRentabilityHistory } from './TableRentabilityHistory';

const meta: Meta<typeof TableRentabilityHistory> = {
  component: TableRentabilityHistory,
  title: 'UI/Organisms/TableRentabilityHistory',
};
export default meta;

type Story = StoryObj<typeof TableRentabilityHistory>;

export const Primary: Story = {
  args: {},
};
