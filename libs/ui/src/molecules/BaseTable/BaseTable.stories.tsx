// BaseTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { BaseTable } from './BaseTable';

type Person = {
  name: string;
  age: number;
  email: string;
  role: string;
};

const mockData: Array<Person> = [
  { name: 'Ana Silva',    age: 32, email: 'ana@email.com',    role: 'Engenheira' },
  { name: 'Bruno Costa',  age: 28, email: 'bruno@email.com',  role: 'Designer'   },
  { name: 'Carla Mendes', age: 45, email: 'carla@email.com',  role: 'Gerente'    },
  { name: 'Diego Lopes',  age: 23, email: 'diego@email.com',  role: 'Estagiário' },
];

const columnBuilder = createColumnHelper<Person>();

const columns = [
  columnBuilder.accessor('name', {
    header: 'Nome',
    cell: ({ getValue }) => getValue(),
    footer: () => 'Total',
  }),
  columnBuilder.accessor('age', {
    header: 'Idade',
    cell: ({ getValue }) => getValue(),
    footer: () => `${mockData.length} pessoas`,
  }),
  columnBuilder.accessor('email', {
    header: 'E-mail',
    cell: ({ getValue }) => getValue(),
  }),
  columnBuilder.accessor('role', {
    header: 'Cargo',
    cell: ({ getValue }) => getValue(),
  }),
];

function TableWrapper({ onRowClick }: { onRowClick?: (row: Person) => void }) {
  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <BaseTable table={table} onRowClick={onRowClick} />;
}

const meta: Meta<typeof TableWrapper> = {
  component: TableWrapper,
  title: 'UI/Molecules/BaseTable',
};

export default meta;
type Story = StoryObj<typeof TableWrapper>;

export const Default: Story = {};

export const WithRowClick: Story = {

};