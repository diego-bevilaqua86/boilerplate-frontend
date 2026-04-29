import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActiveFilterBadge } from './ActiveFilterBadge';

const meta = {
  component: ActiveFilterBadge,
  title: 'UI/Atoms/ActiveFilterBadge',
  args: {
    label: 'Renda Fixa',
    onRemove: () => undefined,
    withRemoveButton: true,
  },
} satisfies Meta<typeof ActiveFilterBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Teste',
  },
};
