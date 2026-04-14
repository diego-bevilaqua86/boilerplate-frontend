import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecurityCouponDividends } from './SecurityCouponDividends';

const meta = {
  component: SecurityCouponDividends,
  title: 'UI/Organisms/SecurityCouponDividends',
} satisfies Meta<typeof SecurityCouponDividends>;
export default meta;

type Story = StoryObj<typeof SecurityCouponDividends>;

export const Primary = {
  args: {},
} satisfies Story;
