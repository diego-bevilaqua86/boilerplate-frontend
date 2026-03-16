// useInvestmentPositionTable.tsx
import { ClientGroupingSecuritiesTableRow, SecurityDetailsRequest, useAuthStore } from '@boilerplate-frontend/types';
import { TableActionButtons } from '@boilerplate-frontend/ui';
import { currencyFormatter, numberFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Group, RingProgress, Text } from '@mantine/core';
import { CaretDownFillIcon, CaretDownIcon, CaretRightFillIcon, CaretRightIcon } from '@phosphor-icons/react';
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

const columnBuilder = createColumnHelper<ClientGroupingSecuritiesTableRow>();

export type UseInvestmentPositionTableProps = {
  rowData: Array<ClientGroupingSecuritiesTableRow>;
  currency: string;
  palette: Array<string>;
  onSelectSecurity?: (req: SecurityDetailsRequest) => void;
};

export const useInvestmentPositionTable = ({
  rowData,
  currency,
  palette,
  onSelectSecurity,
}: UseInvestmentPositionTableProps) => {
  const { _, i18n } = useLingui();
  const [userAuthData] = useAuthStore((state) => [state.userAuth]);

  const columns = useMemo(
    () => [
      columnBuilder.accessor('classificationOrSecurity', {
        header: () => <Trans>Classes</Trans>,
        cell: ({ getValue, row }) => (
          <Group
            gap="xs"
            wrap="nowrap"
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}
          >
            {row.depth === 0 && (
              <RingProgress
                size={32}
                thickness={3}
                sections={[{ value: row.original.percentage, color: palette[6] }]}
                rootColor={palette[1]}
              />
            )}
            <Box style={{ paddingLeft: `${row.depth * 1.5}rem` }}>
              <Group gap={4} wrap="nowrap">
                {row.getCanExpand() && (
                  <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    {row.depth === 0 ? (
                      row.getIsExpanded() ? (
                        <CaretDownFillIcon size={12} />
                      ) : (
                        <CaretRightFillIcon size={12} />
                      )
                    ) : row.getIsExpanded() ? (
                      <CaretDownIcon size={12} />
                    ) : (
                      <CaretRightIcon size={12} />
                    )}
                  </Text>
                )}
                <Text size="sm" fw={row.depth === 0 || row.depth === 1 ? 600 : 400}>
                  {getValue()}
                </Text>
              </Group>
            </Box>
          </Group>
        ),
        footer: () => <Trans>Total</Trans>,
      }),

      columnBuilder.accessor('quantity', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Quantidade`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Text
            size="sm"
            fw={row.depth === 0 ? 600 : 400}
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}
          >
            {row.getCanExpand() ? '' : numberFormatter(getValue(), 2, i18n.locale)}
          </Text>
        ),
      }),

      columnBuilder.accessor('pu', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Preço`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Box onClick={row.getToggleExpandedHandler()} style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}>
            <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
              <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
                {row.getCanExpand() ? '' : currencyFormatter(getValue(), 2, i18n.locale)}
              </Text>
            </SensitiveText>
          </Box>
        ),
      }),

      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Saldo`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Box onClick={row.getToggleExpandedHandler()} style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}>
            <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
              <Text size="sm" fw={row.depth === 0 ? 600 : 400}>
                {currencyFormatter(getValue(), 2, i18n.locale, currency)}
              </Text>
            </SensitiveText>
          </Box>
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

      columnBuilder.accessor('percentage', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Patrimônio`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Text
            size="sm"
            fw={row.depth === 0 ? 600 : 400}
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}
          >
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

      columnBuilder.accessor('walletName', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Carteira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Text
            size="sm"
            onClick={row.getToggleExpandedHandler()}
            style={{ cursor: row.getCanExpand() ? 'pointer' : 'auto' }}
          >
            {getValue()}
          </Text>
        ),
      }),

      columnBuilder.display({
        id: 'actionsColumn',
        cell: ({ row }) => {
          const parentRow = row.getParentRow()?.original;

          // TODO: Preciso verificar se ainda precisamos disso
          //if (companyId !== '23313334000110' && (!row.original.children || row.original.children.length === 0)) {
          return (
            <TableActionButtons
              row={{
                walletId: row.original.walletId,
                securityId: row.original.securityId,
                beehusName: row.original.classificationOrSecurity,
                klass: parentRow?.classificationOrSecurity ?? '',
              }}
              onOpenModalRow={onSelectSecurity}
            />
          );
        },
      }),
    ],
    [_, palette, currency, i18n.locale, onSelectSecurity],
  );

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<ClientGroupingSecuritiesTableRow>({
    data: rowData,
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
