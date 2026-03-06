import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardUpcomingMaturities } from './CardUpcomingMaturities';

const meta: Meta<typeof CardUpcomingMaturities> = {
  component: CardUpcomingMaturities,
  title: 'UI/Organisms/CardUpcomingMaturities',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof CardUpcomingMaturities>;

export const Default: Story = {};