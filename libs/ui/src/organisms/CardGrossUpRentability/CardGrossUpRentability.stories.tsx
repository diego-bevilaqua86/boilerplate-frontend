import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardGrossUpRentability } from './CardGrossUpRentability';

const meta: Meta<typeof CardGrossUpRentability> = {
  component: CardGrossUpRentability,
  title: 'UI/Organisms/CardGrossUpRentability',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof CardGrossUpRentability>;

export const Default: Story = {};