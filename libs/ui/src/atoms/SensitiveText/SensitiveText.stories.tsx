import type { Meta, StoryObj } from '@storybook/react-vite';
import { SensitiveText } from './SensitiveText';

const meta: Meta<typeof SensitiveText> = {
  component: SensitiveText,
  title: 'UI/Atoms/SensitiveText',
  argTypes: {
    dotColor: { control: 'color' },
    dotSize: { control: { type: 'number', min: 8, max: 64, step: 2 } },
  },
  args: {
    dotCount: 6,
    dotColor: '#868e96',
    dotSize: 32,
    isHidden: false,
    children: 'R$ 12.345,67',
  },
};

export default meta;
type Story = StoryObj<typeof SensitiveText>;

export const Visible: Story = {
  args: { isHidden: false },
};

export const Hidden: Story = {
  args: { isHidden: true },
};

export const CustomDots: Story = {
  args: {
    isHidden: true,
    dotCount: 10,
    dotSize: 16,
    dotColor: '#228be6',
  },
};