// useCardTransactionsManager.tsx
//
// Manager do widget CardTransactions.
// Encapsula:
//   - Busca debounced por nome do ativo
//   - Filtragem por tipo de operação via ModalFilters
//   - Estado do ModalTransactionDetails
//   - Ordenação decrescente por liquidationDate
//   - Renderização da lista de cards ou EmptyWidget

import { getTransactionMappings, TransactionPopulated } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ActionIcon, Group, ScrollArea, Stack, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedState, useToggle } from '@mantine/hooks';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { ModalTransactionDetails } from '../TableTransactions/ModalTransactionDetails';
import { TransactionItem } from './TransactionItem';

type UseCardTransactionsManagerProps = {
  data: Array<TransactionPopulated>;
};

export const useCardTransactionsManager = ({ data }: UseCardTransactionsManagerProps) => {
  const { _ } = useLingui();
  const { TRANSACTION_TYPES_MAPPING } = getTransactionMappings();

  // ── Busca debounced ─────────────────────────────────────────────────────────
  const [searchInput, setSearchInput] = useDebouncedState('', 50);

  // ── Modal de filtros ────────────────────────────────────────────────────────
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);

  const handleApplyFilter = (selected: Array<string>) => {
    setSelectedTransactionTypes(selected);
    toggleFiltersModal();
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

  // ── Filtragem + ordenação ───────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    if (isNullOrUndefined(data)) return [];

    // Ordena decrescente por liquidationDate
    const sorted = [...data].sort((a, b) => new Intl.Collator().compare(b.liquidationDate, a.liquidationDate));

    return sorted
      .filter((t) =>
        selectedTransactionTypes.length === 0 ? true : selectedTransactionTypes.includes(t.beehusTransactionType ?? ''),
      )
      .filter((t) =>
        searchInput === '' ? true : t.securityId?.beehusName.toLowerCase().includes(searchInput.toLowerCase()),
      );
  }, [data, selectedTransactionTypes, searchInput]);

  // ── Render ──────────────────────────────────────────────────────────────────
  const renderList = () => (
    <>
      {/* Modal de filtros */}
      <ModalFilters
        opened={filtersModalOpen}
        onClose={toggleFiltersModal}
        onSubmit={handleApplyFilter}
        title={_(msg`Filtros`)}
        data={data}
        selectedValues={selectedTransactionTypes}
        filterOptions={[
          {
            title: _(msg`Tipo de operação`),
            key: 'beehusTransactionType',
            translate: TRANSACTION_TYPES_MAPPING,
          },
          {
            title: _(msg`Instituição financeira`),
            key: 'entityId.name' as keyof TransactionPopulated,
          },
        ]}
      />

      {/* Modal de detalhes */}
      {!isNullOrUndefined(selectedTransaction) && (
        <ModalTransactionDetails
          opened={detailsModalOpen}
          onClose={handleCloseDetailsModal}
          transaction={selectedTransaction}
        />
      )}

      <Stack gap={0}>
        {/* Barra de busca + botão de filtros */}
        <Group px="md" py="sm" gap="xs">
          <TextInput
            placeholder={_(msg`Pesquisar movimentações...`)}
            leftSection={<MagnifyingGlassIcon size={14} />}
            defaultValue={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ flex: 1 }}
            size="xs"
          />
          <Tooltip label={_(msg`Filtrar`)} withArrow>
            <ActionIcon
              variant={selectedTransactionTypes.length > 0 ? 'filled' : 'default'}
              size="md"
              onClick={() => toggleFiltersModal()}
              disabled={isEmptyArr(data)}
            >
              <FunnelIcon size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>

        {/* Lista de cards ou estado vazio */}
        <ScrollArea>
          <Stack gap="sm" px="md" pb="md">
            {isEmptyArr(filteredData) ? (
              <EmptyWidget message={_(msg`Sem informações para esta pesquisa...`)} />
            ) : (
              filteredData.map((transaction, idx) => (
                <TransactionItem
                  key={`${transaction._id}-${idx}`}
                  transaction={transaction}
                  onOpenModalTransactionDetails={() => handleOpenDetailsModal(transaction)}
                />
              ))
            )}
          </Stack>
        </ScrollArea>
      </Stack>
    </>
  );

  return { renderList };
};
