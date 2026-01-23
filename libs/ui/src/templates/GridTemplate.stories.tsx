import type { Meta, StoryObj } from '@storybook/react-vite';
import { GridTemplate } from './GridTemplate';

const meta = {
  component: GridTemplate,
  title: 'UI/Templates/GridTemplate',
  args: {},
} satisfies Meta<typeof GridTemplate>;
export default meta;

type Story = StoryObj<typeof GridTemplate>;

export const Default: Story = {};
