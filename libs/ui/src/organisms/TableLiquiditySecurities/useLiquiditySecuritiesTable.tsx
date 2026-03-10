// useLiquiditySecuritiesTable.ts
import { Liquidity } from '@boilerplate-frontend/types';
import { currencyFormatter, numberFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
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

type LiquidityValuesTableRows = Liquidity['liquiditySecurities'][0];

const columnBuilder = createColumnHelper<LiquidityValuesTableRows>();

export const useLiquiditySecuritiesTable = ({ data }: { data: Liquidity }) => {
  const { _, i18n } = useLingui();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'balance', desc: true }]);

  const columns = useMemo(() => [
    columnBuilder.accessor('securityName', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Ativos'}
          sortDirection={column.getIsSorted()}
          onToggleSorting={column.getToggleSortingHandler()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue()}</span>,
      footer: () => <Trans>Total</Trans>,
    }),
    columnBuilder.accessor('balance', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Saldo'}
          sortDirection={column.getIsSorted()}
          onToggleSorting={column.getToggleSortingHandler()}
        />
      ),
      cell: ({ getValue }) => (
        <SensitiveText dotCount={4} dotSize={24} isHidden={false}>
          <span>{currencyFormatter(getValue(), 2, i18n.locale, data.currency)}</span>
        </SensitiveText>
      ),
      footer: ({ table: { getPrePaginationRowModel } }) => {
        const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.balance, 0);
        return (
          <SensitiveText dotCount={4} dotSize={24} isHidden={false}>
            <span>{currencyFormatter(total, 2, i18n.locale, data.currency)}</span>
          </SensitiveText>
        );
      },
    }),
    columnBuilder.accessor('netWorth', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'% Patrimônio'}
          sortDirection={column.getIsSorted()}
          onToggleSorting={column.getToggleSortingHandler()}
        />
      ),
      cell: ({ getValue }) => <span>{percentFormatter(getValue() * 100, 2, i18n.locale)}</span>,
      footer: ({ table: { getPrePaginationRowModel } }) => {
        const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.netWorth, 0);
        return <span>{percentFormatter(total * 100, 2, i18n.locale)}</span>;
      },
    }),
    columnBuilder.accessor('redemptionSettlementDays', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Prazo de liquidação'}
          sortDirection={column.getIsSorted()}
          onToggleSorting={column.getToggleSortingHandler()}
        />
      ),
      cell: ({ getValue }) => <span>{numberFormatter(getValue(), 0, i18n.locale)}</span>,
    }),
    columnBuilder.accessor('entityName', {
      header: ({ column }) => (
        <TableSortingHeader
          headerText={'Instituição financeira'}
          sortDirection={column.getIsSorted()}
          onToggleSorting={column.getToggleSortingHandler()}
        />
      ),
      cell: ({ getValue }) => <span>{getValue()}</span>,
    }),
  ], [_, i18n.locale, data.currency]);

  const table = useReactTable<LiquidityValuesTableRows>({
    data: data.liquiditySecurities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return { table };
};