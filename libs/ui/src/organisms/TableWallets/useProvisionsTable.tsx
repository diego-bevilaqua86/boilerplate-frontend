// useProvisionsTable.tsx
import { Provision } from '@boilerplate-frontend/types';
import { currencyFormatter, dateFormatter, useContentRequest } from '@boilerplate-frontend/utils';
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

const columnBuilder = createColumnHelper<Provision>();

export const useProvisionsTable = ({ tableData }: { tableData: Array<Provision> }) => {
  const { _, i18n } = useLingui();
  const { selectedGroupingSummary } = useContentRequest();
  const currency = selectedGroupingSummary?.currency ?? 'BRL';
  const [sorting, setSorting] = useState<Array<ColumnSort>>([]);

  const columns = useMemo(
    () => [
      columnBuilder.accessor('description', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Descrição`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
      }),
      columnBuilder.accessor('initialDate', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Data Inicial`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{dateFormatter(getValue(), i18n.locale)}</Text>,
      }),
      columnBuilder.accessor('liquidationDate', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Data de Liquidação`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{dateFormatter(getValue(), i18n.locale)}</Text>,
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
      columnBuilder.accessor('entity', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Instituição Financeira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
      }),
    ],
    [_, currency, i18n.locale],
  );

  const table = useReactTable<Provision>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return { table };
};
