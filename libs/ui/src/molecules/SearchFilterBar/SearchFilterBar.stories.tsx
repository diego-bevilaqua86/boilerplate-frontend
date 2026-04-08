import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchFilterBar } from './SearchFilterBar';

type MockItem = { type: string; institution: string };

const mockData: Array<MockItem> = [
  { type: 'Compra', institution: 'Banco A' },
  { type: 'Venda', institution: 'Banco B' },
  { type: 'Compra', institution: 'Banco C' },
];

const meta: Meta<typeof SearchFilterBar<MockItem[]>> = {
  component: SearchFilterBar,
  title: 'UI/Molecules/SearchFilterBar',
  args: {
    placeholder: 'Pesquisar...',
    defaultValue: '',
    onChange: () => undefined,
    hasActiveFilters: false,
    isFilterDisabled: false,
    filtersProps: {
      onSubmit: () => undefined,
      title: 'Filtros',
      data: mockData,
      selectedValues: [],
      filterOptions: [
        { title: 'Tipo', key: 'type' },
        { title: 'Instituição', key: 'institution' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilterBar<MockItem[]>>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    hasActiveFilters: true,
  },
};

export const FilterDisabled: Story = {
  args: {
    isFilterDisabled: true,
  },
};

export const WithoutFilters: Story = {
  args: {
    filtersProps: undefined,
  },
};
