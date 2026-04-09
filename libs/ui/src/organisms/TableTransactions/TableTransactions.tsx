// TableTransactions.tsx
//
// Widget desktop para exibição da tabela de movimentações.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableTransactions)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (TableTransactionsDataRequest)
//      — Busca transações via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de conteúdo (TableTransactionsView)
//      — Estado de componente (modais, filtros).
//      — useMemo inline para filtragem.
//      — JSX completo.
//
// Chave no registry: 'table-withdrawal-deposits'

import { getTransactionMappings, TransactionPopulated } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, ScrollArea, Stack, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TableFilterHeader } from '../../molecules/TableFilterHeader/TableFilterHeader';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { ModalTransactionDetails } from './ModalTransactionDetails';
import { useTransactionsTable } from './useTransactionsTable';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Movimentações</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar movimentações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <TableTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableTransactionsDataRequest = () => {
  const { selectedGrouping, selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchTransactions } = useRequestHooks();

  const { data } = useFetchTransactions({
    groupingId: selectedGrouping,
    period: selectedPeriod,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableTransactionsView data={data} currency={selectedGroupingSummary?.currency} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const TableTransactionsView = ({ data, currency }: { data: Array<TransactionPopulated>; currency?: string }) => {
  const { _ } = useLingui();
  const { TRANSACTION_TYPES_MAPPING } = getTransactionMappings();

  // ── Filtros ─────────────────────────────────────────────────────────────────
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);

  const handleRemoveFilter = (item: string) => {
    setSelectedTransactionTypes((prev) => prev.filter((t) => t !== item));
  };

  // ── Modal de detalhes ───────────────────────────────────────────────────────
  const [detailsModalOpen, toggleDetailsModal] = useToggle([false, true] as const);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionPopulated | null>(null);

  const handleOpenDetailsModal = (transaction: TransactionPopulated) => {
    setSelectedTransaction(transaction);
    toggleDetailsModal();
  };

  const handleCloseDetailsModal = () => {
    toggleDetailsModal();
    setSelectedTransaction(null);
  };

  const activeBadges = useMemo(
    () =>
      selectedTransactionTypes.map((item) => ({
        label: TRANSACTION_TYPES_MAPPING.find((m) => m.apiLabel === item)?.screenLabel ?? item,
        onRemove: () => handleRemoveFilter(item),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTransactionTypes, TRANSACTION_TYPES_MAPPING],
  );

  // ── Filtragem ───────────────────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (selectedTransactionTypes.length === 0) return data;
    return data.filter(
      (t) =>
        selectedTransactionTypes.includes(t.beehusTransactionType ?? '') ||
        selectedTransactionTypes.includes(t.entityId?.name ?? ''),
    );
  }, [data, selectedTransactionTypes]);

  const { table } = useTransactionsTable({
    data: filteredData,
    onOpenDetailsModal: handleOpenDetailsModal,
    currency,
  });

  return (
    <>
      {/* Modal de detalhes da transação */}
      {!isNullOrUndefined(selectedTransaction) && (
        <ModalTransactionDetails
          opened={detailsModalOpen}
          onClose={handleCloseDetailsModal}
          transaction={selectedTransaction}
        />
      )}

      <Stack gap={0}>
        {/* Header — contagem + badges de filtros ativos + botão de filtro */}
        <TableFilterHeader
          rowCount={filteredData.length}
          rowLabel={_(msg`movimentações`)}
          activeBadges={activeBadges}
          filterProps={{
            data,
            filterOptions: [
              {
                title: _(msg`Tipo de operação`),
                key: 'beehusTransactionType',
                translate: TRANSACTION_TYPES_MAPPING,
              },
              {
                title: _(msg`Instituição financeira`),
                key: 'entityId.name' as keyof TransactionPopulated,
              },
            ],
            title: _(msg`Filtros`),
            selectedValues: selectedTransactionTypes,
            onSubmit: setSelectedTransactionTypes,
            disabled: isEmptyArr(data),
          }}
        />

        {/* Tabela ou estado vazio */}
        {isEmptyArr(filteredData) ? (
          <EmptyWidget message={_(msg`Você não possui informações para o período solicitado.`)} />
        ) : (
          <ScrollArea>
            <Box px="md" pb="md">
              <BaseTable table={table} />
            </Box>
          </ScrollArea>
        )}
      </Stack>
    </>
  );
};
