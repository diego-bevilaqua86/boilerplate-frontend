import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalFilters, ModalFiltersProps } from './ModalFilters';

type MockData = { entity: string; type: string };

const meta: Meta<ModalFiltersProps<Array<MockData>>> = {
  component: ModalFilters,
  title: 'UI/Molecules/ModalFilters',
  args: {
    opened: true,
    onClose: () => {},
    onSubmit: () => {},
    title: 'Filtros',
    selectedValues: [],
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
type Story = StoryObj<ModalFiltersProps<Array<MockData>>>;

export const Primary: Story = {};

export const WithSelection: Story = {
  args: {
    selectedValues: ['Banco Itaú', 'Renda Fixa'],
  },
};

export const Closed: Story = {
  args: {
    opened: false,
  },
};