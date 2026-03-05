import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableSortingHeader } from './TableSortingHeader';

const meta: Meta<typeof TableSortingHeader> = {
  component: TableSortingHeader,
  title: 'UI/Atoms/TableSortingHeader',
};
export default meta;

type Story = StoryObj<typeof TableSortingHeader>;

export const Primary: Story = {
  args: {},
};
