// TableLiquiditySecurities.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableLiquiditySecurities } from './TableLiquiditySecurities';

const meta: Meta<typeof TableLiquiditySecurities> = {
  component: TableLiquiditySecurities,
  title: 'UI/Organisms/TableLiquiditySecurities',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof TableLiquiditySecurities>;

export const Default: Story = {};