import type { Meta, StoryObj } from '@storybook/react-vite';
import TableUpcomingMaturities from './TableUpcomingMaturities';

const meta: Meta<typeof TableUpcomingMaturities> = {
  component: TableUpcomingMaturities,
  title: 'UI/Organisms/TableUpcomingMaturities',
};
export default meta;

type Story = StoryObj<typeof TableUpcomingMaturities>;

export const Primary: Story = {
  args: {},
};
