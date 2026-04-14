// useUpcomingMaturitiesWidget.ts
import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { currencyFormatter, dateFormatter, percentFormatter, useContentRequest } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge } from '@mantine/core';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

const columnBuilder = createColumnHelper<UpcomingMaturities>();

export const useUpcomingMaturitiesWidget = ({ data }: { data: Array<UpcomingMaturities> }) => {
  const { _ , i18n } = useLingui();
  const { selectedGroupingSummary } = useContentRequest();

  const [sorting, setSorting] = useState<SortingState>([{ id: 'maturityDate', desc: false }]);

  const columns = useMemo(() => [
    columnBuilder.accessor('securityName', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={`Ativos`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue() || '-'}</span>,
      footer: () => <span><Trans>Total</Trans></span>,
    }),
    columnBuilder.accessor('hierarchicalVariable', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={ `Classe`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue() || '-'}</span>,
    }),
    columnBuilder.accessor('maturityDate', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={ `Data de vencimento`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.maturityDate || '').getTime();
        const dateB = new Date(rowB.original.maturityDate || '').getTime();
        const hasA = !isNaN(dateA), hasB = !isNaN(dateB);
        if (hasA && hasB) return dateA - dateB;
        if (hasA) return -1;
        if (hasB) return 1;
        return 0;
      },
      cell: ({ getValue }) => (
        <Badge variant="light">
          {getValue() ? dateFormatter(getValue(), i18n.locale) : '-'}
        </Badge>
      ),
    }),
    columnBuilder.accessor('balance', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={ `Saldo`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => (
        <SensitiveText dotCount={4} isHidden={false}>
          <span>{currencyFormatter(getValue(), 2, i18n.locale, selectedGroupingSummary?.currency)}</span>
        </SensitiveText>
      ),
      footer: ({ table }) => {
        const total = table.getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.balance, 0);
        return (
          <SensitiveText dotCount={4} isHidden={false}>
            <span>{currencyFormatter(total, 2, i18n.locale, selectedGroupingSummary?.currency)}</span>
          </SensitiveText>
        );
      },
    }),
    columnBuilder.accessor('percentual', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={ `% Patrimônio`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2, i18n.locale)}</span>,
      footer: ({ table }) => {
        const total = table.getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.percentual, 0);
        return <span>{percentFormatter(total, 2, i18n.locale)}</span>;
      },
    }),
    columnBuilder.accessor('entity', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={ `Instituição`}
          onToggleSorting={column.getToggleSortingHandler()}
          sortDirection={column.getIsSorted()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue() || '-'}</span>,
    }),
  ], [_, i18n.locale, selectedGroupingSummary?.currency]);

  const table = useReactTable<UpcomingMaturities>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return { table };
};