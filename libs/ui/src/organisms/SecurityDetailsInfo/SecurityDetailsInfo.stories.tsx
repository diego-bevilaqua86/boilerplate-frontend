import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecurityDetailsInfo } from './SecurityDetailsInfo';

const meta = {
  component: SecurityDetailsInfo,
  title: 'UI/Organisms/SecurityDetailsInfo',
} satisfies Meta<typeof SecurityDetailsInfo>;
export default meta;

type Story = StoryObj<typeof SecurityDetailsInfo>;

export const Primary = {
  args: {},
} satisfies Story;
