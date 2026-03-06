// TableGrossUpRentability.tsx
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { ChartLineUpIcon } from '@phosphor-icons/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useGrossUpRentabilityTable } from './useGrossUpRentabilityTable';

// ─── Entrypoint ───────────────────────────────────────────────────────────────

export const TableGrossUpRentability = () => {
  const { _ } = useLingui();

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorCard title={_(/* i18n */ 'Erro na busca de rentabilidade...')} error={error} />
      )}
    >
      <Suspense fallback={<TablePlaceholder size="sm" />}>
        <TableGrossUpRentabilityDataRequest />
      </Suspense>
    </ErrorBoundary>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableGrossUpRentabilityDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpRentability } = useRequestHooks();

  const { data } = useFetchGrossUpRentability({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  const { table } = useGrossUpRentabilityTable({ dataSource: data });

  if (isNullOrUndefined(data) || isEmptyArr(data)) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        <Trans>Sem informações para o período solicitado.</Trans>
      </Text>
    );
  }

  return (
    <Paper withBorder radius="md" h="100%">
      <Group justify="space-between" px="md" py="sm">
        <Text fw={600}>
          <Trans>Rentabilidade com Gross Up</Trans>
        </Text>
        <ActionIcon variant="default">
          <ChartLineUpIcon weight="duotone" />
        </ActionIcon>
      </Group>
      <Box px="md" pb="md">
        <ScrollArea>
          <BaseTable table={table} />
        </ScrollArea>
      </Box>
    </Paper>
  );
};