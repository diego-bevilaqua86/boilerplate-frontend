// useTransactionsTable.tsx
//
// Migração das substituições:
//   BadgeCustom        → Badge variant="light" (com cor derivada de transactionTypesMappingStyles)
//   TableSortingHeader → atoms/TableSortingHeader
//   TooltipCustom      → Tooltip + ActionIcon
//   TableActionButtons → ActionIcon
//   BsChatSquareText   → ChatTextIcon (@phosphor-icons/react)
//   Stack direction    → Group (Mantine)
//   useClientCustomizationStore → useContentRequest (currency via contexto)

import { TransactionPopulated } from '@boilerplate-frontend/types';
import { currencyFormatter, dateFormatter } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Badge, Group, Text, Tooltip } from '@mantine/core';
import { ChatTextIcon } from '@phosphor-icons/react';
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
import { transactionTypesMappingStyles } from './transactionStyleMapping';

const columnBuilder = createColumnHelper<TransactionPopulated>();

type UseTransactionsTableProps = {
  data: Array<TransactionPopulated>;
  onOpenDetailsModal?: (transaction: TransactionPopulated) => void;
  currency?: string;
};

export const useTransactionsTable = ({ data, onOpenDetailsModal, currency }: UseTransactionsTableProps) => {
  const { _, i18n } = useLingui();
  const [sorting, setSorting] = useState<Array<ColumnSort>>([{ id: 'liquidationDate', desc: true }]);

  const columns = useMemo(
    () => [
      columnBuilder.accessor('liquidationDate', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Data de Liquidação`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{dateFormatter(getValue())}</Text>,
      }),
      columnBuilder.accessor('walletId.name', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Carteira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
      }),
      columnBuilder.accessor('beehusTransactionType', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Operação`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => {
          const { screenLabel, styles } = transactionTypesMappingStyles(getValue());
          return (
            <Badge variant="light" styles={{ root: { backgroundColor: styles.bg, color: styles.text } }} size="sm">
              {screenLabel}
            </Badge>
          );
        },
      }),
      columnBuilder.accessor('securityId', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Ativos`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => (
          <Text size="xs" fw={400}>
            {getValue()?.beehusName ?? '-'}
          </Text>
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
        cell: ({ getValue }) => (
          <SensitiveText dotCount={4} dotSize={20} isHidden={false}>
            <Text size="sm">{currencyFormatter(getValue(), 2, i18n.locale, currency)}</Text>
          </SensitiveText>
        ),
      }),
      columnBuilder.accessor('entityId.name', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Instituição Financeira`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
      }),
      columnBuilder.display({
        id: 'actionsColumn',
        cell: ({ row }) => (
          <Group gap={6} justify="flex-end" wrap="nowrap">
            {/* Tooltip de descrição — sempre visível quando há descrição */}
            {row.original.description && (
              <Tooltip label={row.original.description} withArrow>
                <ActionIcon variant="subtle" color="gray" size="sm">
                  <ChatTextIcon size={16} />
                </ActionIcon>
              </Tooltip>
            )}

            {/* Botão de comentário do gestor — abre o modal de detalhes */}
            {row.original.comment && onOpenDetailsModal && (
              <Tooltip label={_(msg`Comentário do gestor`)} withArrow>
                <ActionIcon variant="subtle" color="blue" size="sm" onClick={() => onOpenDetailsModal(row.original)}>
                  <ChatTextIcon size={16} weight="fill" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        ),
      }),
    ],
    [_, i18n.locale, onOpenDetailsModal, currency],
  );

  const table = useReactTable<TransactionPopulated>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return { table };
};
