import type { Meta, StoryObj } from '@storybook/react-vite';
import WalletTemplate from './WalletTemplate';

const meta = {
  component: WalletTemplate,
  title: 'UI/Templates/WalletTemplate',
  args: {},
} satisfies Meta<typeof WalletTemplate>;
export default meta;

type Story = StoryObj<typeof WalletTemplate>;

export const Default: Story = {};
