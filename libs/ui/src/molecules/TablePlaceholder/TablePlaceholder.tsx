import { Skeleton, Table } from '@mantine/core';
import { FC } from 'react';

type TablePlaceholderProps = {
  size?: 'sm' | 'lg';
  rows?: number;
  cols?: number;
};

export const TablePlaceholder: FC<TablePlaceholderProps> = ({ size = 'lg', rows = 6, cols = size === 'lg' ? 4 : 2 }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {Array.from({ length: cols }).map((_, i) => (
            <Table.Th key={i}>
              <Skeleton height={20} />
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Table.Tr key={rowIdx}>
            {Array.from({ length: cols }).map((_, colIdx) => (
              <Table.Td key={colIdx}>
                <Skeleton height={20} />
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};