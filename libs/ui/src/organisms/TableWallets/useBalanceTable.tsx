// useBalanceTable.tsx
import { CashAccount } from '@boilerplate-frontend/types';
import { currencyFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Text } from '@mantine/core';
import {
  ColumnSort,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

const columnBuilder = createColumnHelper<CashAccount>();

export const useBalanceTable = ({ tableData, currency }: { tableData: Array<CashAccount>; currency: string }) => {
  const { _, i18n } = useLingui();
  const [sorting, setSorting] = useState<Array<ColumnSort>>([]);

  const columns = useMemo(
    () => [
      columnBuilder.accessor('walletName', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Carteira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
      }),
      columnBuilder.accessor('entityName', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Instituição financeira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue() ?? '-'}</Text>,
      }),
      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Saldo`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm">{currencyFormatter(getValue(), 2, i18n.locale, currency)}</Text>
          </SensitiveText>
        ),
      }),
    ],
    [_, i18n.locale, currency],
  );

  const table = useReactTable<CashAccount>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return { table };
};
