import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterModal, FilterModalProps } from './FilterModal';

type MockData = { entity: string; type: string };

const meta: Meta<FilterModalProps<Array<MockData>>> = {
  component: FilterModal,
  title: 'UI/Molecules/FilterModal',
  args: {
    title: 'Filtros',
    selectedValues: [],
    onSubmit: () => undefined,
    disabled: false,
    data: [
      { entity: 'Banco Itaú', type: 'Renda Fixa' },
      { entity: 'XP Investimentos', type: 'Renda Variável' },
      { entity: 'Banco Bradesco', type: 'Renda Fixa' },
      { entity: 'BTG Pactual', type: 'Fundos' },
    ],
    filterOptions: [
      { title: 'Instituição financeira', key: 'entity' },
      { title: 'Tipo', key: 'type' },
    ],
  },
};

export default meta;
type Story = StoryObj<FilterModalProps<Array<MockData>>>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    selectedValues: ['Banco Itaú', 'Renda Fixa'],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
