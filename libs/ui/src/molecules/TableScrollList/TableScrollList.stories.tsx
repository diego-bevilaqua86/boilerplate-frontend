import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '@mantine/core';
import { TableScrollList } from './TableScrollList';

const meta: Meta<typeof TableScrollList> = {
  component: TableScrollList,
  title: 'UI/Molecules/TableScrollList',
  args: {
    isEmpty: false,
    emptyMessage: undefined,
    children: (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Coluna A</Table.Th>
            <Table.Th>Coluna B</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Valor 1</Table.Td>
            <Table.Td>Valor 2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Valor 3</Table.Td>
            <Table.Td>Valor 4</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof TableScrollList>;

export const Default: Story = {};

export const Empty: Story = {
  args: { isEmpty: true },
};

export const EmptyCustomMessage: Story = {
  args: {
    isEmpty: true,
    emptyMessage: 'Você não possui informações para o período solicitado.',
  },
};
