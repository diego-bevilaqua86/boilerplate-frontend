// useInvestmentPositionTable.tsx
import { ClientGroupingSecuritiesTableRow } from '@boilerplate-frontend/types';
import {
  currencyFormatter,
  numberFormatter,
  percentFormatter,
  useTemplateNavigation,
} from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, RingProgress, Text } from '@mantine/core';
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';
import {
  createColumnHelper,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  OnChangeFn,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import { TableActionButtons } from '../../atoms/TableActionButtons/TableActionButtons';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';

const columnBuilder = createColumnHelper<ClientGroupingSecuritiesTableRow>();

export type UseInvestmentPositionTableProps = {
  rowData: Array<ClientGroupingSecuritiesTableRow>;
  currency: string;
  palette: Array<string>;
  expanded?: ExpandedState;
  onExpandedChange?: OnChangeFn<ExpandedState>;
};

export const useInvestmentPositionTable = ({
  rowData,
  currency,
  palette,
  expanded: externalExpanded,
  onExpandedChange,
}: UseInvestmentPositionTableProps) => {
  const { _, i18n } = useLingui();
  const { navigateTo } = useTemplateNavigation();

  const [internalExpanded, setInternalExpanded] = useState<ExpandedState>({});
  const expanded = externalExpanded ?? internalExpanded;

  const handleExpandedChange: OnChangeFn<ExpandedState> = useCallback(
    (updaterOrValue) => {
      if (onExpandedChange) {
        onExpandedChange(updaterOrValue);
      } else {
        setInternalExpanded((prev) => (typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue));
      }
    },
    [onExpandedChange],
  );

  const columns = useMemo(
    () => [
      // ── Coluna de expand ──────────────────────────────────────────────────
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

      // ── Classes ───────────────────────────────────────────────────────────
      columnBuilder.accessor('classificationOrSecurity', {
        header: () => <Trans>Classes</Trans>,
        cell: ({ getValue, row }) => (
          <Group gap="xs" wrap="nowrap">
            {row.depth === 0 && (
              <RingProgress
                size={32}
                thickness={3}
                sections={[{ value: row.original.percentage, color: palette[6] }]}
                rootColor={palette[1]}
              />
            )}
            <Box style={{ paddingLeft: `${row.depth * 1.5}rem` }}>
              <Text size="sm" fw={row.depth === 0 || row.depth === 1 ? 600 : 400}>
                {getValue()}
              </Text>
            </Box>
          </Group>
        ),
        footer: () => <Trans>Total</Trans>,
      }),

      // ── Quantidade ────────────────────────────────────────────────────────
      columnBuilder.accessor('quantity', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Quantidade`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
            {row.getCanExpand() ? '' : numberFormatter(getValue(), 2, i18n.locale)}
          </Text>
        ),
      }),

      // ── Preço ─────────────────────────────────────────────────────────────
      columnBuilder.accessor('pu', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Preço`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
              {row.getCanExpand() ? '' : currencyFormatter(getValue(), 2, i18n.locale)}
            </Text>
          </SensitiveText>
        ),
      }),

      // ── Saldo ─────────────────────────────────────────────────────────────
      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Saldo`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
              {currencyFormatter(getValue(), 2, i18n.locale, currency)}
            </Text>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce(
            (acc, row) => (row.depth === 0 ? acc + row.original.balance : acc),
            0,
          );
          return (
            <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
              <Text size="sm">{currencyFormatter(total, 2, i18n.locale, currency)}</Text>
            </SensitiveText>
          );
        },
      }),

      // ── % Patrimônio ──────────────────────────────────────────────────────
      columnBuilder.accessor('percentage', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Patrimônio`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
            {percentFormatter(getValue(), 2, i18n.locale)}
          </Text>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce(
            (acc, row) => (row.depth === 0 ? acc + row.original.percentage : acc),
            0,
          );
          return <Text size="sm">{percentFormatter(total, 2, i18n.locale)}</Text>;
        },
      }),

      // ── Carteira ──────────────────────────────────────────────────────────
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

      // ── Ações — apenas nas folhas ─────────────────────────────────────────
      // Botão de detalhes só aparece em linhas sem filhos (ativos individuais).
      // Chama navigateTo via TemplateNavigationContext — sem acoplamento com router.
      columnBuilder.display({
        id: 'actionsColumn',
        cell: ({ row }) => {
          const parentRow = row.getParentRow()?.original;
          const isLeaf = !row.original.children || row.original.children.length === 0;
          if (!isLeaf) return null;

          return (
            <TableActionButtons
              row={{
                walletId: row.original.walletId,
                securityId: row.original.securityId,
                beehusName: row.original.classificationOrSecurity,
                klass: parentRow?.classificationOrSecurity ?? '',
              }}
              onOpenModalRow={(req) => navigateTo('security-details', req)}
            />
          );
        },
      }),
    ],
    [_, palette, currency, i18n.locale, navigateTo],
  );

  const table = useReactTable<ClientGroupingSecuritiesTableRow>({
    data: rowData,
    columns,
    state: { expanded },
    onExpandedChange: handleExpandedChange,
    getSubRows: (row) => row.children ?? [],
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
  });

  return { table };
};
