// CardLiquiditySecurities.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardLiquiditySecurities } from './CardLiquiditySecurities';

const meta: Meta<typeof CardLiquiditySecurities> = {
  component: CardLiquiditySecurities,
  title: 'UI/Organisms/CardLiquiditySecurities',
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof CardLiquiditySecurities>;

export const Default: Story = {};