import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { ActionIcon, Group, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { UpcomingMaturitiesCard } from './UpcomingMaturitiesCard';
import { useManageModalFilter } from './useManageModalFilter';

// ─── Placeholder de cards ─────────────────────────────────────────────────────

const CardListPlaceholder = () => (
  <Stack gap="sm" p="md">
    {Array.from({ length: 3 }).map((_, i) => (
      <Paper key={i} withBorder p="md" radius="md" h={100} />
    ))}
  </Stack>
);

// ─── Entrypoint com ErrorBoundary + Suspense ──────────────────────────────────

export const CardUpcomingMaturities = () => (
  <ErrorBoundary
    fallbackRender={({ error }) => (
      <ErrorCard title="Erro ao carregar vencimentos..." error={error} />
    )}
  >
    <Suspense fallback={<CardListPlaceholder />}>
      <CardUpcomingMaturitiesDataRequest />
    </Suspense>
  </ErrorBoundary>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardUpcomingMaturitiesDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchUpcomingMaturities } = useRequestHooks();

  const { data } = useFetchUpcomingMaturities({ groupingId: selectedGrouping, select: (data) => data });

  const { modalIsOpen, selectedItems, toggleModal, setSelectedItems } = useManageModalFilter({ data });

  if (isEmptyArr(data)) {
    return (
      <Paper withBorder p="xl" radius="md">
        <Text c="dimmed" ta="center">Não há vencimentos futuros.</Text>
      </Paper>
    );
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

// ─── Lista de cards com busca e filtro ───────────────────────────────────────

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
  const [searchInput, setSearchInput] = useDebouncedState('', 50);

  const filteredData = useMemo(() => {
    const byEntity = isEmptyArr(selectedItems)
      ? data
      : data.filter((t) => selectedItems.includes(t.entity ?? ''));

    return searchInput === ''
      ? byEntity
      : byEntity.filter((t) =>
          t?.securityName?.toLowerCase().includes(searchInput.toLowerCase()),
        );
  }, [data, selectedItems, searchInput]);

  return (
    <Stack gap={0}>

      {/* FilterBar */}
      <Group px="md" py="sm" gap="sm">
        <ActionIcon variant="default" onClick={onToggleModal}>
          <FunnelIcon weight="duotone" />
        </ActionIcon>
        <TextInput
          flex={1}
          placeholder="Pesquisar vencimentos..."
          leftSection={<MagnifyingGlassIcon size={14} />}
          value={searchInput}
          onChange={(e) => setSearchInput((e.currentTarget as HTMLInputElement).value)}
        />
      </Group>

      {/* Cards */}
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isNullOrUndefined(filteredData) || isEmptyArr(filteredData) ? (
            <Text c="dimmed" ta="center" py="xl">
              Sem informações para esta pesquisa...
            </Text>
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