import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterButton } from './FilterButton';

const meta: Meta<typeof FilterButton> = {
  component: FilterButton,
  title: 'UI/Atoms/FilterButton',
  args: {
    onClick: () => undefined,
    hasActiveFilters: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    hasActiveFilters: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Filtrar por instituição',
  },
};
