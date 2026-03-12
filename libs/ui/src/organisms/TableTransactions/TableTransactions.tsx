// TableTransactions.tsx
//
// Widget desktop para exibição da tabela de movimentações.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableTransactions)
//      — BaseWidget com título, ErrorBoundary e Suspense.
//
//   2. Camada de dados (TableTransactionsDataRequest)
//      — Busca transações via useRequestHooks.
//      — Delega ao manager após dados disponíveis.
//
//   3. Camada de conteúdo (via useTableTransactionsManager)
//      — Filtragem por tipo/entidade, estado do modal de detalhes,
//        estado do modal de filtros, renderização da tabela.
//
// Modal de detalhes (ModalTransactionDetails):
//   Gerenciado internamente pelo manager — este widget não compartilha
//   estado de modal com outros widgets, portanto não requer
//   TransactionsTemplateContext. Se isso mudar no futuro, extrair para contexto.
//
// Chave no registry: 'table-withdrawal-deposits'

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
import { useTableTransactionsManager } from './useTableTransactionsManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const TableTransactions = () => (
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
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <TableTransactionsDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────

const TableTransactionsDataRequest = () => {
  const { selectedGrouping, selectedPeriod } = useContentRequest();
  const { useFetchTransactions } = useRequestHooks();

  const { data } = useFetchTransactions({
    groupingId: selectedGrouping,
    period: selectedPeriod,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableTransactionsContent data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

const TableTransactionsContent = ({ data }: { data: Array<TransactionPopulated> }) => {
  const { renderTable } = useTableTransactionsManager({ data });
  return renderTable();
};
