import { ClientContributionByClassificationTableRow } from '@boilerplate-frontend/types';
import { currencyFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Text } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon, CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';
import {
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

const columnBuilder = createColumnHelper<ClientContributionByClassificationTableRow>();

export type UsePerformanceAnalysisByClassificationDetailsTableProps = {
  data: Array<ClientContributionByClassificationTableRow>;
  currency: string;
  isSensitiveText?: boolean;
};

export const usePerformanceAnalysisByClassificationDetailsTable = ({
  data,
  currency,
  isSensitiveText = false,
}: UsePerformanceAnalysisByClassificationDetailsTableProps) => {
  const { _, i18n } = useLingui();
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo(
    () => [
      // ── Expand ───────────────────────────────────────────────────────────────
      columnBuilder.display({
        id: 'expandColumn',
        cell: ({ row }) => {
          if (!row.getCanExpand()) return null;
          return (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
            >
              {row.getIsExpanded() ? <CaretDownIcon size={12} /> : <CaretRightIcon size={12} />}
            </ActionIcon>
          );
        },
      }),

      // ── Classes ───────────────────────────────────────────────────────────────
      columnBuilder.accessor('classificationOrSecurity', {
        header: () => <Trans>Classes</Trans>,
        cell: ({ row, getValue }) => (
          <Box style={{ paddingLeft: `${row.depth * 1.5}rem` }}>
            <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
              {getValue()}
            </Text>
          </Box>
        ),
        footer: () => <Trans>Total</Trans>,
      }),

      // ── Saldo ─────────────────────────────────────────────────────────────────
      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Saldo`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ row, getValue }) => (
          <SensitiveText isHidden={isSensitiveText} dotCount={4} dotSize={20}>
            <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
              {currencyFormatter(getValue(), 2, i18n.locale, currency)}
            </Text>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce(
            (sum, row) => (row.depth === 0 ? sum + row.original.balance : sum),
            0,
          );
          return (
            <SensitiveText isHidden={isSensitiveText} dotCount={4} dotSize={20}>
              <Text size="sm">{currencyFormatter(total, 2, i18n.locale, currency)}</Text>
            </SensitiveText>
          );
        },
      }),

      // ── % Patrimônio ──────────────────────────────────────────────────────────
      columnBuilder.accessor('plPercent', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Patrimônio`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ row, getValue }) => (
          <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
            {percentFormatter(getValue(), 2, i18n.locale, 1)}
          </Text>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce(
            (sum, row) => (row.depth === 0 && row.original.plPercent !== null ? sum + row.original.plPercent : sum),
            0,
          );
          return <Text size="sm">{percentFormatter(total, 2, i18n.locale, 1)}</Text>;
        },
      }),

      // ── Rentabilidade ─────────────────────────────────────────────────────────
      columnBuilder.accessor('rentability', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Rentabilidade`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ row, getValue }) => (
          <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
            {percentFormatter(getValue(), 2, i18n.locale, 1)}
          </Text>
        ),
        footer: () => <Text size="sm">-</Text>,
      }),

      // ── Ganhos financeiros ────────────────────────────────────────────────────
      columnBuilder.accessor('financialEarnings', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Ganhos financeiros`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText isHidden={isSensitiveText} dotCount={4} dotSize={20}>
            <Badge
              color={getValue() >= 0 ? 'green.5' : 'red.5'}
              leftSection={getValue() >= 0 ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
            >
              {currencyFormatter(getValue(), 2, i18n.locale, currency)}
            </Badge>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce(
            (sum, row) => (row.depth === 0 ? sum + row.original.financialEarnings : sum),
            0,
          );
          return (
            <SensitiveText isHidden={isSensitiveText} dotCount={4} dotSize={20}>
              <Text size="sm">{currencyFormatter(total, 2, i18n.locale, currency)}</Text>
            </SensitiveText>
          );
        },
      }),

      // ── Contribuição ──────────────────────────────────────────────────────────
      columnBuilder.accessor('contributionYield', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Contribuição`)}
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
          const total = getPrePaginationRowModel().rows.reduce(
            (sum, row) => (row.depth === 0 ? sum + row.original.contributionYield : sum),
            0,
          );
          return <Text size="sm">{percentFormatter(total, 2, i18n.locale, 1)}</Text>;
        },
      }),
    ],
    [_, i18n.locale, currency, isSensitiveText],
  );

  const table = useReactTable<ClientContributionByClassificationTableRow>({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
  });

  return { table };
};
