// TableWallet.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableWallet } from './TableWallets';

const meta: Meta<typeof TableWallet> = {
  component: TableWallet,
  title: 'UI/Organisms/TableWallet',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof TableWallet>;

export const Default: Story = {};
