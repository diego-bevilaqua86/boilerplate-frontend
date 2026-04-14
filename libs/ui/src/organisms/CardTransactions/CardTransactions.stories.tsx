// CardTransactions.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardTransactions } from './CardTransactions';

const meta: Meta<typeof CardTransactions> = {
  component: CardTransactions,
  title: 'UI/Organisms/CardTransactions',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof CardTransactions>;

export const Default: Story = {};
