import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableGroupingRentability } from './TableGroupingRentability';

const meta = {
  component: TableGroupingRentability,
  title: 'UI/Organisms/TableGroupingRentability',
} satisfies Meta<typeof TableGroupingRentability>;
export default meta;

type Story = StoryObj<typeof TableGroupingRentability>;

export const Primary = {
  args: {},
} satisfies Story;
