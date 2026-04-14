import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableGroupingStockEarning } from './TableGroupingStockEarning';

const meta: Meta<typeof TableGroupingStockEarning> = {
  component: TableGroupingStockEarning,
  title: 'UI/Organisms/TableGroupingStockEarning',
};
export default meta;

type Story = StoryObj<typeof TableGroupingStockEarning>;

export const Primary: Story = {
  args: {},
};
