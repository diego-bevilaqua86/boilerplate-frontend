// CardUpcomingMaturities.tsx
//
// Widget para exibição de vencimentos futuros.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardUpcomingMaturities)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (CardUpcomingMaturitiesDataRequest)
//      — Busca dados via useRequestHooks.
//      — Delega ao View diretamente após dados disponíveis.
//
//   3. Camada de view (CardUpcomingMaturitiesView)
//      — Estado de componente (busca, filtros).
//      — useMemo inline para filtragem.
//      — JSX completo.

import { UpcomingMaturities } from '@boilerplate-frontend/types';
import { isEmptyArr, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Stack, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { CardScrollList } from '../../molecules/CardScrollList/CardScrollList';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { SearchFilterBar } from '../../molecules/SearchFilterBar/SearchFilterBar';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { UpcomingMaturitiesCard } from './UpcomingMaturitiesCard';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardUpcomingMaturities = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Vencimentos futuros</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorCard title="Erro ao carregar vencimentos..." error={error} />
        )}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <CardUpcomingMaturitiesDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardUpcomingMaturitiesDataRequest = () => {
  const { selectedGrouping, selectedGroupingSummary } = useContentRequest();
  const { useFetchUpcomingMaturities } = useRequestHooks();
  const { _ } = useLingui();

  const { data } = useFetchUpcomingMaturities({ groupingId: selectedGrouping, select: (data) => data });

  if (isEmptyArr(data)) {
    return <EmptyWidget message={_(msg`Não há vencimentos futuros.`)} />;
  }

  return <CardUpcomingMaturitiesView data={data} currency={selectedGroupingSummary?.currency} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────────

const CardUpcomingMaturitiesView = ({ data, currency }: { data: Array<UpcomingMaturities>; currency: string | undefined }) => {
  const { _ } = useLingui();
  const [searchInput, setSearchInput] = useDebouncedState('', 50);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

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
      <SearchFilterBar
        placeholder={_(msg`Pesquisar vencimentos...`)}
        onChange={(e) => setSearchInput(e.target.value)}
        filtersProps={{
          onSubmit: setSelectedItems,
          title: _(msg`Filtros`),
          data,
          selectedValues: selectedItems,
          filterOptions: [{ title: _(msg`Instituição financeira`), key: 'entity' }],
        }}
      />

      <CardScrollList isEmpty={isEmptyArr(filteredData)} emptyMessage={_(msg`Sem informações para esta pesquisa...`)}>
        {filteredData.map((item, idx) => (
          <UpcomingMaturitiesCard key={`${item.securityName}-${idx}`} data={item} currency={currency} />
        ))}
      </CardScrollList>
    </Stack>
  );
};
