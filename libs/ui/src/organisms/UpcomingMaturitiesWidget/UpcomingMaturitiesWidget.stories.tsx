import type { Meta, StoryObj } from '@storybook/react-vite';
import UpcomingMaturitiesWidget from './UpcomingMaturitiesWidget';

const meta: Meta<typeof UpcomingMaturitiesWidget> = {
  component: UpcomingMaturitiesWidget,
  title: 'UI/Organisms/UpcomingMaturitiesWidget',
};
export default meta;

type Story = StoryObj<typeof UpcomingMaturitiesWidget>;

export const Primary: Story = {
  args: {},
};
