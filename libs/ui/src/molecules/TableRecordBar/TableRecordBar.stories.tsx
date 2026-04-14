import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableRecordBar } from './TableRecordBar';

type MockItem = { entity: string };

const mockData: Array<MockItem> = [
  { entity: 'Banco A' },
  { entity: 'Banco B' },
  { entity: 'Banco C' },
];

const mockFilterProps = {
  data: mockData,
  filterOptions: [{ title: 'Instituição financeira', key: 'entity' as keyof MockItem }],
  title: 'Filtros',
  selectedValues: [] as Array<string>,
  onSubmit: () => undefined,
};

const meta: Meta<typeof TableRecordBar> = {
  component: TableRecordBar,
  title: 'UI/Molecules/TableRecordBar',
  args: {
    rowCount: 42,
    filterProps: mockFilterProps,
  },
};

export default meta;
type Story = StoryObj<typeof TableRecordBar>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    filterProps: { ...mockFilterProps, selectedValues: ['Banco A'] },
  },
};

export const FilterDisabled: Story = {
  args: {
    filterProps: { ...mockFilterProps, disabled: true },
  },
};

export const WithoutFilter: Story = {
  args: {
    filterProps: undefined,
  },
};
