// CardPerformanceAnalysisEarningByClassification.tsx
//
// Widget mobile para exibição da análise de performance de ganhos por classificação.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardPerformanceAnalysisEarningByClassification)
//      — Estrutura visual estática: título, tratamento de erro e loading.
//
//   2. Camada de dados (CardPerformanceAnalysisEarningByClassificationDataRequest)
//      — Realiza a requisição via useRequestHooks (injetável via contexto).
//      — Delega a renderização ao View.
//
//   3. Camada de conteúdo (CardPerformanceAnalysisEarningByClassificationView)
//      — Estado, handlers, useMemo e JSX inline.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TablePerformanceAnalysisEarningByClassification.

import { isEmptyArr, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { ScrollArea, Stack, Text } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { SearchFilterBar } from '../../molecules/SearchFilterBar/SearchFilterBar';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { CardPerformanceEarningItem } from '../../molecules/CardPerformanceEarningItem/CardPerformanceEarningItem';
import type { CardPerformanceEarningItem as CardPerformanceEarningItemType } from './useCardPerformanceAnalysisEarningByClassificationAdapter';
import { useCardPerformanceAnalysisEarningByClassificationAdapter } from './useCardPerformanceAnalysisEarningByClassificationAdapter';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardPerformanceAnalysisEarningByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Contribuição por classe</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar dados de contribuição por classe..." error={error} />
          )}
        >
          {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardPerformanceAnalysisEarningByClassificationDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Busca os dados via contexto injetável e delega toda a renderização ao View.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const CardPerformanceAnalysisEarningByClassificationDataRequest = () => {
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchGenericTableData } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchGenericTableData({
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
  });

  const { cardPerformanceEarningAdapted } = useCardPerformanceAnalysisEarningByClassificationAdapter(data);

  if (isEmptyArr(cardPerformanceEarningAdapted)) return <EmptyWidget />;

  return (
    <CardPerformanceAnalysisEarningByClassificationView
      data={cardPerformanceEarningAdapted}
      currency={selectedGroupingSummary.currency}
    />
  );
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Estado, handlers, useMemo e JSX inline.
// Não faz requisições — dados chegam via props da Camada 2.

const CardPerformanceAnalysisEarningByClassificationView = ({
  data,
  currency,
}: {
  data: Array<CardPerformanceEarningItemType>;
  currency: string;
}) => {
  const { _ } = useLingui();
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [searchInput, setSearchInput] = useDebouncedState('', 50);

  const filteredData = useMemo(() => {
    const byClass = isEmptyArr(selectedItems)
      ? data
      : data.filter((item) => selectedItems.includes(item.classLabel));
    return searchInput === ''
      ? byClass
      : byClass.filter((item) =>
          item.classLabel.toLowerCase().includes(searchInput.toLowerCase()),
        );
  }, [data, selectedItems, searchInput]);

  return (
    <Stack gap={0}>
      <SearchFilterBar<Array<CardPerformanceEarningItemType>>
        placeholder={_(msg`Pesquisar classificação`)}
        defaultValue={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        filtersProps={{
          title: _(msg`Filtros`),
          data,
          filterOptions: [{ title: _(msg`Classificação`), key: 'classLabel' }],
          onSubmit: setSelectedItems,
          selectedValues: selectedItems,
        }}
      />
      <ScrollArea>
        <Stack gap="sm" px="md" pb="md">
          {isEmptyArr(filteredData) ? (
            <EmptyWidget message={_(msg`Sem informações para esta pesquisa...`)} />
          ) : (
            filteredData.map((item, index) => (
              <CardPerformanceEarningItem key={item.classLabel + index} {...item} currency={currency} />
            ))
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
