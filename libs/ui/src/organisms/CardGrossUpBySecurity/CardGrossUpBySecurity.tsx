// CardGrossUpBySecurity.tsx
//
// Widget mobile para exibição do Gross Up por ativo.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardGrossUpBySecurity)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (CardGrossUpBySecurityDataRequest)
//      — Busca dados via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de view (CardGrossUpBySecurityView)
//      — Estado de componente (filtros, busca).
//      — useMemo inline para filtro + busca.
//      — JSX completo.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TableGrossUpBySecurity.

import { GrossUpBySecurity } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ActionIcon, Badge, Box, Divider, Group, Paper, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { InfoIcon } from '@phosphor-icons/react';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { SearchFilterBar } from '../../molecules/SearchFilterBar/SearchFilterBar';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardGrossUpBySecurity = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Gross up por ativo</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro na busca de gross up por ativo..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <CardGrossUpBySecurityDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardGrossUpBySecurityDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpBySecurity } = useRequestHooks();

  const { data } = useFetchGrossUpBySecurity({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  if (isNullOrUndefined(data) || isEmptyArr(data)) {
    return <EmptyWidget />;
  }

  return <CardGrossUpBySecurityView data={data} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const CardGrossUpBySecurityView = ({ data }: { data: Array<GrossUpBySecurity> }) => {
  const { _ } = useLingui();

  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  const filteredData = useMemo(() => {
    const byEntity = isEmptyArr(selectedItems)
      ? data
      : data.filter((s) => selectedItems.includes(s.entity) || selectedItems.includes(s.classification));

    return searchInput === ''
      ? byEntity
      : byEntity.filter((s) => s?.name?.toLowerCase().includes(searchInput.toLowerCase()));
  }, [data, selectedItems, searchInput]);

  return (
    <Stack gap={0}>
      <SearchFilterBar
        placeholder={_(msg`Pesquisar ativo`)}
        defaultValue={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        filtersProps={{
          onSubmit: setSelectedItems,
          title: _(msg`Filtros`),
          data,
          selectedValues: selectedItems,
          disabled: isEmptyArr(data),
          filterOptions: [
            {
              title: _(msg`Instituição financeira`),
              key: 'entity',
            },
          ],
        }}
      />
      <Group px="md" pb="xs" gap={4}>
        <Text size="xs" c="dimmed">{filteredData.length}</Text>
        <Text size="xs" c="dimmed">
          <Trans>Ativos</Trans>
        </Text>
      </Group>
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData) ? (
            <EmptyWidget message={_(msg`Sem informações para esta pesquisa...`)} />
          ) : (
            filteredData.map((item, index) => (
              <CardGrossUpBySecurityItem key={item.name + index} item={item} />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

// ─── Card individual ──────────────────────────────────────────────────────────

const CardGrossUpBySecurityItem = ({ item }: { item: GrossUpBySecurity }) => {
  const { _ } = useLingui();

  return (
    <Paper withBorder radius="md">
      <Stack gap={2} px="md" pt="sm" pb="xs">
        <Text size="xs" c="dimmed">{item.classification}</Text>
        <Group justify="space-between">
          <Text size="sm" fw={600} style={{ flex: 1 }}>{item.name}</Text>
          <Text size="sm">{percentFormatter(item.percentage, 2)}</Text>
        </Group>
      </Stack>
      <Divider />
      <Stack gap="xs" px="md" py="sm">
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Rentabilidade</Trans></Text>
          <Text size="sm">{percentFormatter(item.rentability, 2)}</Text>
        </Group>
        <Box bg="gray.0" py="xs" style={{ borderRadius: 6 }}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed"><Trans>Rentabilidade c/ Gross up</Trans></Text>
            <Text size="sm" fw={600}>{percentFormatter(item.grossUpReturn, 2)}</Text>
          </Group>
        </Box>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Equivalente</Trans></Text>
          <Badge variant="light">{item.equivalent}</Badge>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>% IR</Trans></Text>
          <Group gap={4}>
            <Text size="sm">{percentFormatter(item.incomeTax, 1)}</Text>
            <Tooltip label={_(msg`Alíquota utilizada para o prazo de 180 até 3260 dias.`)} position="top">
              <ActionIcon variant="transparent" size="xs">
                <InfoIcon size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed"><Trans>Instituição financeira</Trans></Text>
          <Text size="sm">{item.entity}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};
