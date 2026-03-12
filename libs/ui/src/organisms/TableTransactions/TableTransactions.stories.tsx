import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableTransactions } from './TableTransactions';

const meta: Meta<typeof TableTransactions> = {
  component: TableTransactions,
  title: 'UI/Organisms/TableTransactions',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof TableTransactions>;

export const Default: Story = {};
