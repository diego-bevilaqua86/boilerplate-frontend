// CardPerformanceAnalysisEarningByClassification.tsx
//
// Widget mobile para exibição da análise de performance de ganhos por classificação.
//
// Arquitetura em duas camadas:
//   1. Camada de apresentação (CardPerformanceAnalysisEarningByClassification)
//      — Estrutura visual estática: título, tratamento de erro e loading.
//
//   2. Camada de dados (CardPerformanceAnalysisEarningByClassificationDataRequest)
//      — Realiza a requisição via useRequestHooks (injetável via contexto).
//      — Delega a renderização ao useCardPerformanceAnalysisEarningByClassificationManager.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TablePerformanceAnalysisEarningByClassification.

import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useCardPerformanceAnalysisEarningByClassificationAdapter } from './useCardPerformanceAnalysisEarningByClassificationAdapter';
import { useCardPerformanceAnalysisEarningByClassificationManager } from './useCardPerformanceAnalysisEarningByClassificationManager';

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
// Busca os dados via contexto injetável e delega toda a renderização ao manager.
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
  const { renderList } = useCardPerformanceAnalysisEarningByClassificationManager({
    data: cardPerformanceEarningAdapted,
    currency: selectedGroupingSummary.currency,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return renderList();
};
