// CardTransactions.tsx
//
// Widget mobile para exibição das movimentações.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardTransactions)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (CardTransactionsDataRequest)
//      — Busca transações via useRequestHooks.
//      — Ordena e valida antes de delegar ao manager.
//
//   3. Camada de conteúdo (via useCardTransactionsManager)
//      — Busca debounced, filtros, modal de detalhes, lista de cards.
//
// Chave no registry: 'card-withdrawal-deposits'

import { TransactionPopulated } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useCardTransactionsManager } from './useCardTransactionsManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const CardTransactions = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Movimentações</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar movimentações..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <CardTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const CardTransactionsDataRequest = () => {
  const { selectedGrouping, selectedPeriod } = useContentRequest();
  const { useFetchTransactions } = useRequestHooks();

  const { data } = useFetchTransactions({
    groupingId: selectedGrouping,
    period: selectedPeriod,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <CardTransactionsContent data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

const CardTransactionsContent = ({ data }: { data: Array<TransactionPopulated> }) => {
  const { renderList } = useCardTransactionsManager({ data });
  return renderList();
};
