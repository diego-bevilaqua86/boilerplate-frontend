import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { Table } from '@mantine/core';
import { ColumnDef, flexRender, HeaderGroup, Table as ReactTable } from '@tanstack/react-table';
import { HTMLAttributes } from 'react';

export type BaseTableProps<TData> = HTMLAttributes<HTMLTableElement> & {
  table: ReactTable<TData>;
  onRowClick?: (row: TData) => void;
};

const shouldRenderLine = <T,>(
  groups: Array<HeaderGroup<T>>,
  type: keyof Pick<ColumnDef<T, unknown>, 'header' | 'footer'>,
): boolean =>
  groups.some((group) =>
    group.headers.some((header) => {
      const element = header.column.columnDef[type];
      if (isNullOrUndefined(element)) return false;
      if (typeof element === 'string') return true;
      if (typeof element === 'function') return !isNullOrUndefined(element(header.getContext()));
      return false;
    }),
  );

export function BaseTable<T>({ table, onRowClick, ...rest }: BaseTableProps<T>) {
  const hasHeaders = shouldRenderLine(table.getHeaderGroups(), 'header');
  const hasFooters = shouldRenderLine(table.getFooterGroups(), 'footer');

  return (
    <Table {...rest} data-testid="base-table">
      {hasHeaders && (
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
      )}

      <Table.Tbody>
        {table.getRowModel().rows.map((row) => (
          <Table.Tr
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            style={{ cursor: onRowClick ? 'pointer' : undefined }}
          >
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>

      {hasFooters && (
        <Table.Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Table.Tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <Table.Td key={footer.id} colSpan={footer.colSpan}>
                  {flexRender(footer.column.columnDef.footer, footer.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tfoot>
      )}
    </Table>
  );
}