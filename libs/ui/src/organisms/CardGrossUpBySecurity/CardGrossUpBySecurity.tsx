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
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Group, ScrollArea, Stack, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { CardGrossUpBySecurityItem } from '../../molecules/CardGrossUpBySecurityItem/CardGrossUpBySecurityItem';
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
