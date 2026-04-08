import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchFilterBar } from './SearchFilterBar';

const meta: Meta<typeof SearchFilterBar> = {
  component: SearchFilterBar,
  title: 'UI/Molecules/SearchFilterBar',
  args: {
    placeholder: 'Pesquisar...',
    defaultValue: '',
    onChange: () => undefined,
    onFilterClick: () => undefined,
    hasActiveFilters: false,
    isFilterDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilterBar>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    hasActiveFilters: true,
  },
};

export const Disabled: Story = {
  args: {
    isFilterDisabled: true,
  },
};
