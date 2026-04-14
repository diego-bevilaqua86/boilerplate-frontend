import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableFilterHeader } from './TableFilterHeader';

type MockData = { entity: string; type: string };

const meta: Meta<typeof TableFilterHeader> = {
  component: TableFilterHeader,
  title: 'UI/Molecules/TableFilterHeader',
  args: {
    rowCount: 42,
    rowLabel: 'movimentações',
  },
};

export default meta;
type Story = StoryObj<typeof TableFilterHeader>;

export const Default: Story = {};

export const WithActiveBadges: Story = {
  args: {
    activeBadges: [
      { label: 'Renda Fixa', onRemove: () => undefined },
      { label: 'Banco Itaú', onRemove: () => undefined },
    ],
  },
};

export const WithFilter: Story = {
  args: {
    filterProps: {
      title: 'Filtros',
      selectedValues: [],
      onSubmit: () => undefined,
      data: [
        { entity: 'Banco Itaú', type: 'Renda Fixa' },
        { entity: 'XP Investimentos', type: 'Renda Variável' },
      ] as Array<MockData>,
      filterOptions: [
        { title: 'Instituição financeira', key: 'entity' as keyof MockData },
        { title: 'Tipo', key: 'type' as keyof MockData },
      ],
    },
  },
};
