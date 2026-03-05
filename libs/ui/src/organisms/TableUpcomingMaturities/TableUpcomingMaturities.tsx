// TableUpcomingMaturities.tsx
import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { ActionIcon, Badge, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { ChartLineUpIcon, FunnelIcon } from '@phosphor-icons/react';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { ModalFilters } from '../../molecules/ModalFilters/ModalFilters';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useManageModalFilter } from './useManageModalFilter';
import { useUpcomingMaturitiesWidget } from './useUpcomingMaturitiesWidget';

// ─── Entrypoint com ErrorBoundary + Suspense ────────────────────────────────

export const TableUpcomingMaturities = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorCard title={'Erro ao carregar vencimentos...'} error={error} />
      )}
    >
      <Suspense fallback={<TablePlaceholder />}>
        <TableUpcomingMaturitiesDataRequest />
      </Suspense>
    </ErrorBoundary>
  );
};

// ─── Camada de dados ─────────────────────────────────────────────────────────

const TableUpcomingMaturitiesDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchUpcomingMaturities } = useRequestHooks();

  const { data } = useFetchUpcomingMaturities({
    groupingId: selectedGrouping,
    select: (data) => data
  });

  const { modalIsOpen, selectedItems, toggleModal, toggleItem, setSelectedItems } =
    useManageModalFilter({ data });

  return (
    <Stack gap={0} h="100%">
      <ModalFilters
        opened={modalIsOpen}
        onClose={toggleModal}
        onSubmit={setSelectedItems}
        title={'Filtros'}
        selectedValues={selectedItems}
        data={data}
        filterOptions={[{ title: 'Instituição financeira', key: 'entity' }]}
      />

      <Paper withBorder radius="md" h="100%">

        {/* Header */}
        <Group justify="space-between" px="md" py="sm">
          <Text fw={600}>{'Vencimentos dos ativos'}</Text>
          <Group gap="xs">
            <ActionIcon
              variant="default"
              disabled={isNullOrUndefined(data) || isEmptyArr(data)}
              onClick={toggleModal}
            >
              <FunnelIcon weight="duotone" />
            </ActionIcon>
            <ActionIcon variant="default">
              <ChartLineUpIcon weight="duotone" />
            </ActionIcon>
          </Group>
        </Group>

        {/* Badges dos filtros ativos */}
        {selectedItems.length > 0 && (
          <Group px="md" pb="xs" gap="xs">
            {selectedItems.map((item: string) => (
              <Badge
                key={item}
                variant="light"
                rightSection={
                  <Box
                    component="span"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleItem(item)}
                  >
                    X
                  </Box>
                }
              >
                {item}
              </Badge>
            ))}
          </Group>
        )}
        <Box px="md" pb="md">
          <TableContent data={data} selectedEntity={selectedItems} />
        </Box>

      </Paper>
    </Stack>
  );
};

// ─── Tabela isolada (reutilizável) ────────────────────────────────────────────

type TableContentProps = {
  data: Array<UpcomingMaturities>;
  selectedEntity: Array<string>;
};

const TableContent = ({ data, selectedEntity }: TableContentProps) => {
  const tableData = useMemo(() => {
    if (selectedEntity.length === 0) return data;
    return data.filter((t) => selectedEntity.includes(t.entity ?? ''));
  }, [data, selectedEntity]);

  const { table } = useUpcomingMaturitiesWidget({ data: tableData });

  if (isNullOrUndefined(tableData) || isEmptyArr(tableData)) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        {'Sem vencimentos futuros.'}
      </Text>
    );
  }

  return <BaseTable table={table} />;
};
