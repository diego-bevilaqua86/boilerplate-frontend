// TableWallets.tsx
//
// Widget de carteira com variantes: posição, provisões e saldo.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableWallets)
//      — BaseWidget com título, SegmentedControl, ErrorBoundary e Suspense.
//
//   2. Camada de dados (TableWalletDataRequest)
//      — Busca posição processada via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de conteúdo (TableWalletView)
//      — Estado de componente (filtros, expand, entidades).
//      — Hooks de tabela instanciados inline.
//      — variantMap useMemo inline.
//      — JSX completo.

import { GroupingProcessedPosition } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, ScrollArea, SegmentedControl, Text } from '@mantine/core';
import { ExpandedState, OnChangeFn, Table } from '@tanstack/react-table';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { TableRecordBar } from '../../molecules/TableRecordBar/TableRecordBar';
import { useBalanceTable } from './useBalanceTable';
import { useInvestmentPositionTable } from './useInvestmentPositionTable';
import { useManageWalletTableData } from './useManageWalletTableData';
import { useProvisionsTable } from './useProvisionsTable';

export type WalletVariant = 'position' | 'provisions' | 'balance';

type WalletVariantState = {
  table: Table<unknown>;
  emptyMessage: string;
  isEmptyData: boolean;
};

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableWallets = () => {
  const { _ } = useLingui();
  const [selectedVariant, setSelectedVariant] = useState<WalletVariant>('position');

  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Carteira</Trans>
        </Text>
        <SegmentedControl
          size="xs"
          value={selectedVariant}
          onChange={(v) => setSelectedVariant(v as WalletVariant)}
          data={[
            { label: _(msg`Posição`), value: 'position' },
            { label: _(msg`Provisões`), value: 'provisions' },
            { label: _(msg`Saldo`), value: 'balance' },
          ]}
        />
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar carteira..." error={error} />}>
          <Suspense fallback={<TablePlaceholder size="lg" />}>
            <TableWalletDataRequest selectedVariant={selectedVariant} />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableWalletDataRequest = ({ selectedVariant }: { selectedVariant: WalletVariant }) => {
  const { selectedGrouping, palette } = useContentRequest();
  const { useFetchGroupingProcessedPosition } = useRequestHooks();

  const { data } = useFetchGroupingProcessedPosition({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableWalletView data={data} selectedVariant={selectedVariant} palette={palette ?? []} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const TableWalletView = ({
  data,
  selectedVariant,
  palette,
}: {
  data: GroupingProcessedPosition;
  selectedVariant: WalletVariant;
  palette: Array<string>;
}) => {
  const { _ } = useLingui();

  // ── Filtro de entidades ───────────────────────────────────────────────────
  const [selectedEntities, setSelectedEntities] = useState<Array<string>>([]);

  // ── Estado de expand ──────────────────────────────────────────────────────
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleExpandedChange: OnChangeFn<ExpandedState> = useCallback((updaterOrValue) => {
    setExpanded((prev) => (typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue));
  }, []);

  // ── Adaptação e filtragem ─────────────────────────────────────────────────
  const {
    investments: { mainClassificationsRows },
    filteredProvisions,
    filteredBalance,
    allEntities,
  } = useManageWalletTableData({
    groupingSecuritiesData: data,
    filter: selectedEntities.length > 0 ? selectedEntities : null,
  });

  // ── Hooks de tabela — todos instanciados incondicionalmente ───────────────
  const { table: positionTable } = useInvestmentPositionTable({
    rowData: mainClassificationsRows,
    currency: data.groupingCurrency,
    palette,
    expanded,
    onExpandedChange: handleExpandedChange,
  });

  const { table: provisionsTable } = useProvisionsTable({
    tableData: filteredProvisions,
  });

  const { table: balanceTable } = useBalanceTable({
    tableData: filteredBalance,
    currency: data.groupingCurrency,
  });

  // ── Mapa de variante ──────────────────────────────────────────────────────
  const variantMap = useMemo(
    () =>
      ({
        position: {
          table: positionTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui investimentos para o período solicitado.`),
          isEmptyData: isEmptyArr(mainClassificationsRows),
        },
        provisions: {
          table: provisionsTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui provisões para o período solicitado.`),
          isEmptyData: isEmptyArr(filteredProvisions),
        },
        balance: {
          table: balanceTable as Table<unknown>,
          emptyMessage: _(msg`Você não possui saldo em conta corrente.`),
          isEmptyData: isEmptyArr(filteredBalance),
        },
      }) satisfies Record<WalletVariant, WalletVariantState>,
    [_, positionTable, mainClassificationsRows, provisionsTable, filteredProvisions, balanceTable, filteredBalance],
  );

  const active = variantMap[selectedVariant];

  return (
    <>
      <TableRecordBar
        rowCount={active.table.getRowModel().rows.length}
        filterProps={{
          data: allEntities.map((e) => ({ entity: e })),
          filterOptions: [{ title: _(msg`Instituição financeira`), key: 'entity' }],
          title: _(msg`Filtros`),
          selectedValues: selectedEntities,
          onSubmit: setSelectedEntities,
          disabled: isEmptyArr(allEntities),
        }}
      />

      {active.isEmptyData ? (
        <EmptyWidget message={active.emptyMessage} />
      ) : (
        <ScrollArea>
          <Box px="md" pb="md">
            <BaseTable table={active.table} />
          </Box>
        </ScrollArea>
      )}
    </>
  );
};
