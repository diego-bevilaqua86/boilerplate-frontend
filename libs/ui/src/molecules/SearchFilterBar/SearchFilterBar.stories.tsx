import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchFilterBar } from './SearchFilterBar';

type MockItem = { type: string; institution: string };

const mockData: Array<MockItem> = [
  { type: 'Compra', institution: 'Banco A' },
  { type: 'Venda', institution: 'Banco B' },
  { type: 'Compra', institution: 'Banco C' },
];

const metaFiltersProps = {
  onSubmit: () => undefined,
  title: 'Filtros',
  data: mockData,
  selectedValues: [] as Array<string>,
  filterOptions: [
    { title: 'Tipo', key: 'type' as keyof MockItem },
    { title: 'Instituição', key: 'institution' as keyof MockItem },
  ],
};

const meta: Meta<typeof SearchFilterBar<MockItem[]>> = {
  component: SearchFilterBar,
  title: 'UI/Molecules/SearchFilterBar',
  args: {
    placeholder: 'Pesquisar...',
    defaultValue: '',
    onChange: () => undefined,
    filtersProps: metaFiltersProps,
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilterBar<MockItem[]>>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    filtersProps: { ...metaFiltersProps, selectedValues: ['Compra'] },
  },
};

export const FilterDisabled: Story = {
  args: {
    filtersProps: { ...metaFiltersProps, disabled: true },
  },
};

export const WithoutFilters: Story = {
  args: {
    filtersProps: undefined,
  },
};
