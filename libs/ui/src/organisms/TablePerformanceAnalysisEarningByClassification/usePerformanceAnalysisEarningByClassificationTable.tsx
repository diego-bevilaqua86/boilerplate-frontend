import { ClassificationTableItem } from '@boilerplate-frontend/types';
import { currencyFormatter, isNullOrUndefined, percentFormatter } from '@boilerplate-frontend/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { Badge, Flex, RingProgress } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';
import {
  ColumnSort,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import TableActionButtons from '../../atoms/TableActionButtons/TableActionButtons';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

const columnBuilder = createColumnHelper<ClassificationTableItem>();

export type UsePerformanceAnalysisEarningByClassificationTableProps = {
  data: Array<ClassificationTableItem>;
  pageSize?: number;
  onAction?: (row: ClassificationTableItem) => void;
  currency: string;
  isSensitiveText?: boolean;
};

export const usePerformanceAnalysisEarningByClassificationTable = ({
  data,
  onAction,
  currency,
  isSensitiveText = false,
}: UsePerformanceAnalysisEarningByClassificationTableProps) => {
  const { i18n } = useLingui();

  const [sorting, setSorting] = useState<Array<ColumnSort>>([]);

  const progressData = useCallback(
    (plPercent: number | null) => {
      if (isNullOrUndefined(plPercent)) return { value: 0, color: 'brand.5' };
      const value = plPercent * 100;
      const color = value >= 0 ? 'brand.5' : 'red.5';

      return {
        value,
        color,
        tooltip: percentFormatter(plPercent, 2, i18n.locale),
      };
    },
    [i18n.locale],
  );

  const columns = useMemo(
    () => [
      columnBuilder.accessor('classLabel', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`Classes`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Flex align={'center'} gap={8}>
            <RingProgress
              size={40}
              thickness={4}
              roundCaps
              sections={[progressData(row.original.plPercent)]}
              transitionDuration={600}
            />
            <span className="ms-2">{getValue()}</span>
          </Flex>
        ),
        footer: () => (
          <span>
            <Trans>Total</Trans>
          </span>
        ),
      }),
      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`Saldo`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText isHidden={isSensitiveText}>
            <span>{currencyFormatter(getValue(), 2, i18n.locale, currency)}</span>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.balance, 0);
          return (
            <SensitiveText isHidden={isSensitiveText}>
              <span>{currencyFormatter(total, 2, i18n.locale, currency)}</span>
            </SensitiveText>
          );
        },
      }),
      columnBuilder.accessor('plPercent', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`% Patrimônio`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2, i18n.locale, 1)}</span>,
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => {
            if (row.original.plPercent === null) return sum;
            return sum + row.original.plPercent;
          }, 0);
          return <span>{percentFormatter(total, 2, i18n.locale, 1)}</span>;
        },
      }),
      columnBuilder.accessor('rentability', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`Rentabilidade`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2, i18n.locale, 1)}</span>,
        footer: () => '-',
      }),
      columnBuilder.accessor('financialEarnings', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`Ganhos financeiros`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText isHidden={isSensitiveText}>
            <Badge
              // autoContrast
              color={getValue() >= 0 ? 'green.5' : 'red.5'}
              leftSection={getValue() >= 0 ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
            >
              {currencyFormatter(getValue(), 2, i18n.locale, currency)}
            </Badge>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.financialEarnings, 0);
          return (
            <SensitiveText isHidden={isSensitiveText}>
              <span>{currencyFormatter(total, 2, i18n.locale, currency)}</span>
            </SensitiveText>
          );
        },
      }),
      columnBuilder.accessor('contributionYield', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={`Contribuição`}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <Badge
            color={getValue() >= 0 ? 'green.5' : 'red.5'}
            leftSection={getValue() >= 0 ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
          >
            {percentFormatter(getValue(), 2, i18n.locale, 1)}
          </Badge>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.contributionYield, 0);
          return <span>{percentFormatter(total, 2, i18n.locale, 1)}</span>;
        },
      }),
      columnBuilder.display({
        id: 'actionsColumn',
        cell: ({ row }) =>
          row.original.classLabel === `Provisões` ||
          row.original.classLabel === `Total do portfólio` ||
          row.original.classLabel === `Ganhos/Despesas` ||
          row.original.classLabel === `Saldo em conta` ? null : (
            <TableActionButtons row={row.original} onOpenModalRow={onAction} />
          ),
      }),
    ],
    [i18n.locale, currency, onAction, isSensitiveText, progressData],
  );

  const table = useReactTable<ClassificationTableItem>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return {
    table,
  };
};
