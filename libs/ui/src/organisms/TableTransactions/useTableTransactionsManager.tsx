// useTableTransactionsManager.tsx
//
// Manager do widget TableTransactions.
// Encapsula:
//   - Estado e toggle do ModalFilters (tipos de operação + instituição)
//   - Estado e toggle do ModalTransactionDetails (comentário do gestor)
//   - Filtragem dos dados por tipo/entidade selecionados
//   - Renderização do header com FilterButton + badges de filtros ativos
//   - Renderização da tabela ou EmptyWidget

import {
  getTransactionMappings,
  isEmptyArr,
  isNullOrUndefined,
  TransactionPopulated,
} from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Group, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { FunnelIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { ModalTransactionDetails } from './ModalTransactionDetails';
import { useTransactionsTable } from './useTransactionsTable';

type UseTableTransactionsManagerProps = {
  data: Array<TransactionPopulated>;
};

export const useTableTransactionsManager = ({ data }: UseTableTransactionsManagerProps) => {
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

  // ── Render ──────────────────────────────────────────────────────────────────
  const renderTable = () => (
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
                {TRANSACTION_TYPES_MAPPING?.[item] ?? item}
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

  return { renderTable };
};
