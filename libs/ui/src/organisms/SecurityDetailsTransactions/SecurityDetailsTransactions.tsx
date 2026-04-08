// SecurityDetailsTransactions.tsx
//
// Widget de movimentações do ativo (desde o início).
// Difere de TableTransactions — usa useFetchSecurityTransactions
// com walletId + securityId em vez de groupingId.
// Chave no registry: 'security-transactions'

import { getTransactionMappings, TransactionPopulated } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useRequestHooks, useTemplateModal } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Group, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { FunnelIcon } from '@phosphor-icons/react';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { ModalTransactionDetails } from '../TableTransactions/ModalTransactionDetails';
import { useTransactionsTable } from '../TableTransactions/useTransactionsTable';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const SecurityDetailsTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Movimentações (desde o início)</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar movimentações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <SecurityDetailsTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const SecurityDetailsTransactionsDataRequest = () => {
  const { currentParams } = useTemplateModal();
  const { useFetchSecurityTransactions } = useRequestHooks();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const { data } = useFetchSecurityTransactions({
    walletId,
    securityId,
    period: 'sinceInception',
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <SecurityDetailsTransactionsView data={data} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const SecurityDetailsTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const { TRANSACTION_TYPES_MAPPING } = getTransactionMappings();

  // ── Modal de filtros ────────────────────────────────────────────────────────
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);

  const handleApplyFilter = (selected: Array<string>) => {
    setSelectedTransactionTypes(selected);
    toggleFiltersModal();
  };

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
  });

  return (
    <>
      {/* Modal de filtros */}
      <ModalFilters
        opened={filtersModalOpen}
        onClose={toggleFiltersModal}
        onSubmit={handleApplyFilter}
        title={'Filtros'}
        data={data}
        selectedValues={selectedTransactionTypes}
        filterOptions={[
          {
            title: 'Tipo de operação',
            key: 'beehusTransactionType',
            translate: TRANSACTION_TYPES_MAPPING,
          },
          {
            title: 'Instituição financeira',
            key: 'entityId.name' as keyof TransactionPopulated,
          },
        ]}
      />

      {/* Modal de detalhes da transação */}
      {!isNullOrUndefined(selectedTransaction) && (
        <ModalTransactionDetails
          opened={detailsModalOpen}
          onClose={handleCloseDetailsModal}
          transaction={selectedTransaction}
        />
      )}

      <Stack gap={0}>
        {/* Header — botão de filtro + badges de filtros ativos */}
        <Group px="md" py="sm" justify="space-between">
          <Text size="sm" c="dimmed">
            {filteredData.length} <Trans>movimentações</Trans>
          </Text>
          <Group gap={6}>
            {/* Badges dos filtros ativos */}
            {selectedTransactionTypes.map((item) => (
              <Badge
                key={item}
                variant="light"
                size="sm"
                style={{ cursor: 'pointer' }}
                rightSection={
                  <Text size="xs" onClick={() => handleRemoveFilter(item)}>
                    ×
                  </Text>
                }
              >
                {TRANSACTION_TYPES_MAPPING.find((m) => m.apiLabel === item)?.screenLabel ?? item}
              </Badge>
            ))}

            {/* Botão de abrir filtros */}
            <Tooltip label={'Filtrar movimentações'} withArrow>
              <ActionIcon
                variant={selectedTransactionTypes.length > 0 ? 'filled' : 'default'}
                size="sm"
                onClick={() => toggleFiltersModal()}
                disabled={isNullOrUndefined(data) || isEmptyArr(data)}
              >
                <FunnelIcon size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Tabela ou estado vazio */}
        {isEmptyArr(filteredData) ? (
          <EmptyWidget message={'Você não possui informações para o período solicitado.'} />
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
