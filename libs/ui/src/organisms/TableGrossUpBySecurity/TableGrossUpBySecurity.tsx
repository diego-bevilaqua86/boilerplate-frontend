// TableGrossUpBySecurity.tsx
//
// Widget de tabela para exibição de gross up por ativo.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableGrossUpBySecurity)
//      — BaseWidget com título, ícone, ErrorBoundary e Suspense.
//
//   2. Camada de dados (TableGrossUpBySecurityDataRequest)
//      — Busca dados via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de view (TableGrossUpBySecurityView)
//      — Estado de sorting inline.
//      — Colunas definidas via useMemo.
//      — JSX completo.
//
// Chave no registry: 'table-gross-up-by-security'

import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Badge, Group, ScrollArea, Tooltip } from '@mantine/core';
import { ChartLineUp, Info } from '@phosphor-icons/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { WidgetIconHeader } from '../../molecules/WidgetIconHeader/WidgetIconHeader';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableGrossUpBySecurity = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <WidgetIconHeader
        title={<Trans>Gross up por ativo</Trans>}
        icon={<ChartLineUp weight="duotone" />}
      />
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorCard title="Erro na busca de gross up por ativo..." error={error} />
        )}
      >
        <Suspense fallback={<TablePlaceholder />}>
          <TableGrossUpBySecurityDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableGrossUpBySecurityDataRequest = () => {
  const { _ } = useLingui();
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpBySecurity } = useRequestHooks();

  const { data } = useFetchGrossUpBySecurity({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  if (isEmptyArr(data)) {
    return <EmptyWidget message={_(msg`Sem informações para o período solicitado.`)} />;
  }

  return <TableGrossUpBySecurityView data={data} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const TableGrossUpBySecurityView = ({ data }: { data: Array<GrossUpBySecurity> }) => {
  const { _ } = useLingui();
  const columnHelper = useMemo(() => createColumnHelper<GrossUpBySecurity>(), []);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'percentage', desc: true }]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Ativos`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{getValue()}</span>,
      }),
      columnHelper.accessor('classification', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Classe`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{getValue()}</span>,
      }),
      columnHelper.accessor('percentage', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Patrimônio`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
      }),
      columnHelper.accessor('rentability', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Rentabilidade`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
      }),
      columnHelper.accessor('grossUpReturn', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Rentabilidade c/ Gross up`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2)}</span>,
      }),
      columnHelper.accessor('equivalent', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Equivalentes`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => (
          <Badge variant="light">{!isNullOrUndefined(getValue()) ? getValue() : '-'}</Badge>
        ),
      }),
      columnHelper.accessor('incomeTax', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% IR`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => (
          <Group gap={4} align="center">
            <span>{percentFormatter(getValue(), 1)}</span>
            <Tooltip
              label={_(msg`Alíquota utilizada para o prazo de 180 até 3260 dias.`)}
              position="top"
            >
              <ActionIcon variant="transparent" size="xs">
                <Info size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
      }),
      columnHelper.accessor('entity', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Instituição`)}
            onToggleSorting={column.getToggleSortingHandler()}
            sortDirection={column.getIsSorted()}
          />
        ),
        cell: ({ getValue }) => <span>{getValue()}</span>,
      }),
    ],
    [_, columnHelper],
  );

  const table = useReactTable<GrossUpBySecurity>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'percentage', desc: true }],
    },
    state: { sorting },
  });

  return (
    <ScrollArea>
      <BaseTable table={table} />
    </ScrollArea>
  );
};
