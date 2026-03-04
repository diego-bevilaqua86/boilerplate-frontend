import type { Meta, StoryObj } from '@storybook/react-vite';
import { TablePlaceholder } from './TablePlaceholder';

const meta: Meta<typeof TablePlaceholder> = {
  component: TablePlaceholder,
  title: 'UI/Molecules/TablePlaceholder',
};
export default meta;

type Story = StoryObj<typeof TablePlaceholder>;

export const Primary: Story = {
  args: {},
};
