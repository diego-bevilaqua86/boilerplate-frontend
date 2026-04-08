// CardUpcomingMaturities.tsx
import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ScrollArea, Stack, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { SearchFilterBar } from '../../molecules/SearchFilterBar/SearchFilterBar';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { UpcomingMaturitiesCard } from './UpcomingMaturitiesCard';
import { useManageModalFilter } from './useManageModalFilter';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardUpcomingMaturities = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Vencimentos futuros</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar vencimentos..." error={error} />
          )}
        >
          {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardUpcomingMaturitiesDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Busca os dados via contexto injetável e delega a renderização à lista.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const CardUpcomingMaturitiesDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchUpcomingMaturities } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchUpcomingMaturities({ groupingId: selectedGrouping, select: (data) => data });

  const { modalIsOpen, selectedItems, toggleModal, setSelectedItems } = useManageModalFilter({ data });

  // Estado vazio: delega ao EmptyWidget o padrão visual de ausência de dados
  if (isEmptyArr(data)) {
    return <EmptyWidget message="Não há vencimentos futuros." />;
  }

  return (
    <>
      <ModalFilters
        opened={modalIsOpen}
        onClose={() => toggleModal()}
        onSubmit={setSelectedItems}
        title="Filtros"
        selectedValues={selectedItems}
        data={data}
        filterOptions={[{ title: 'Instituição financeira', key: 'entity' }]}
      />
      <CardUpcomingMaturitiesList
        data={data}
        selectedItems={selectedItems}
        onToggleModal={() => toggleModal()}
      />
    </>
  );
};

// ─── Camada de apresentação da lista ─────────────────────────────────────────
// Gerencia estado de busca e filtros, e renderiza os cards individuais.

type CardUpcomingMaturitiesListProps = {
  data: Array<UpcomingMaturities>;
  selectedItems: Array<string>;
  onToggleModal: () => void;
};

const CardUpcomingMaturitiesList = ({
  data,
  selectedItems,
  onToggleModal,
}: CardUpcomingMaturitiesListProps) => {
  const { _ } = useLingui();
  const [searchInput, setSearchInput] = useDebouncedState('', 50);

  const filteredData = useMemo(() => {
    const byEntity = isEmptyArr(selectedItems)
      ? data
      : data.filter((t) => selectedItems.includes(t.entity ?? ''));

    return searchInput === ''
      ? byEntity
      : byEntity.filter((t) =>
          (t.securityName ?? '').toLowerCase().includes(searchInput.toLowerCase()),
        );
  }, [data, selectedItems, searchInput]);

  return (
    <Stack gap={0}>
      {/* Barra de busca e filtro */}
      <SearchFilterBar
        placeholder={_(msg`Pesquisar vencimentos...`)}
        onChange={(e) => setSearchInput(e.target.value)}
        onFilterClick={onToggleModal}
        hasActiveFilters={selectedItems.length > 0}
      />

      {/* Lista de cards */}
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isNullOrUndefined(filteredData) || isEmptyArr(filteredData) ? (
            <EmptyWidget message="Sem informações para esta pesquisa..." />
          ) : (
            filteredData.map((item, idx) => (
              <UpcomingMaturitiesCard key={`${item.securityName}-${idx}`} data={item} />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};