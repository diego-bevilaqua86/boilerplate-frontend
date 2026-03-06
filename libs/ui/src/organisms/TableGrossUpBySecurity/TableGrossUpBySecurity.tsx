// TableGrossUpBySecurity.tsx
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Box, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { ChartLineUp } from '@phosphor-icons/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useGrossUpBySecurityTable } from './useGrossUpBySecurityTable';

// ─── Entrypoint ───────────────────────────────────────────────────────────────

export const TableGrossUpBySecurity = () => {
  const { _ } = useLingui();

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorCard title={_(/* i18n */ 'Erro na busca de gross up por ativo...')} error={error} />
      )}
    >
      <Suspense fallback={<TablePlaceholder />}>
        <TableGrossUpBySecurityDataRequest />
      </Suspense>
    </ErrorBoundary>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableGrossUpBySecurityDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpBySecurity } = useRequestHooks();

  const { data } = useFetchGrossUpBySecurity({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  const { table } = useGrossUpBySecurityTable({ dataSource: data });

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
          <Trans>Gross up por ativo</Trans>
        </Text>
        <ActionIcon variant="default">
          <ChartLineUp weight="duotone" />
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