// CardTransactions.tsx
//
// Widget mobile para exibição das movimentações.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardTransactions)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (CardTransactionsDataRequest)
//      — Busca transações via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de conteúdo (CardTransactionsView)
//      — Estado de componente (modais, debounce, toggles).
//      — useMemo inline para sort + filter.
//      — JSX completo.
//
// Chave no registry: 'card-withdrawal-deposits'

import { getTransactionMappings, TransactionPopulated } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Group, ScrollArea, Stack, Text, TextInput, Tooltip } from '@mantine/core';
import { useDebouncedState, useToggle } from '@mantine/hooks';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { ModalTransactionDetails } from '../TableTransactions/ModalTransactionDetails';
import { TransactionItem } from './TransactionItem';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Movimentações</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }: {error: any}) => <ErrorCard title="Erro ao carregar movimentações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <CardTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardTransactionsDataRequest = () => {
  const { selectedGrouping, selectedPeriod } = useContentRequest();
  const { useFetchTransactions } = useRequestHooks();

  const { data } = useFetchTransactions({
    groupingId: selectedGrouping,
    period: selectedPeriod,
    select: (data: any) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <CardTransactionsView data={data} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────

const CardTransactionsView = ({ data }: { data: Array<TransactionPopulated> }) => {
  const { _ } = useLingui();
  const { TRANSACTION_TYPES_MAPPING } = getTransactionMappings();

  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [filtersModalOpen, toggleFiltersModal] = useToggle([false, true] as const);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<Array<string>>([]);
  const [detailsModalOpen, toggleDetailsModal] = useToggle([false, true] as const);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionPopulated | null>(null);

  const filteredData = useMemo(() => {
    if (isNullOrUndefined(data)) return [];

    const sorted = [...data].sort((a, b) => new Intl.Collator().compare(b.liquidationDate, a.liquidationDate));

    return sorted
      .filter((t) =>
        selectedTransactionTypes.length === 0 ? true : selectedTransactionTypes.includes(t.beehusTransactionType ?? ''),
      )
      .filter((t) =>
        searchInput === '' ? true : t.securityId?.beehusName.toLowerCase().includes(searchInput.toLowerCase()),
      );
  }, [data, selectedTransactionTypes, searchInput]);

  const handleApplyFilter = (selected: Array<string>) => {
    setSelectedTransactionTypes(selected);
    toggleFiltersModal();
  };

  const handleOpenDetailsModal = (transaction: TransactionPopulated) => {
    setSelectedTransaction(transaction);
    toggleDetailsModal();
  };

  const handleCloseDetailsModal = () => {
    toggleDetailsModal();
    setSelectedTransaction(null);
  };

  return (
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
      {selectedTransaction !== null && (
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
};
