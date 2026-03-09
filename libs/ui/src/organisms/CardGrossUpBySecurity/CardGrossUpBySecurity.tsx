// CardGrossUpBySecurity.tsx
//
// Widget mobile para exibição do Gross Up por ativo.
//
// Arquitetura em duas camadas:
//   1. Camada de apresentação (CardGrossUpBySecurity)
//      — Estrutura visual estática: título, tratamento de erro e loading.
//
//   2. Camada de dados (CardGrossUpBySecurityDataRequest)
//      — Realiza a requisição via useRequestHooks (injetável via contexto).
//      — Delega a renderização ao useCardGrossUpBySecurityManager.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TableGrossUpBySecurity.

import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useCardGrossUpBySecurityManager } from './useCardGrossUpBySecurityManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardGrossUpBySecurity = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Gross up por ativo</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro na busca de gross up por ativo..." error={error} />
          )}
        >
          {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardGrossUpBySecurityDataRequest />
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

const CardGrossUpBySecurityDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpBySecurity } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchGrossUpBySecurity({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  // Estado vazio: delega ao EmptyWidget o padrão visual de ausência de dados
  if (isNullOrUndefined(data) || isEmptyArr(data)) {
    return <EmptyWidget />;
  }

  // Manager: encapsula toda a lógica de filtro, busca e renderização dos cards
  const { renderList } = useCardGrossUpBySecurityManager({ data });

  return renderList();
};

// ─── Camada de apresentação da lista ─────────────────────────────────────────
// Toda a complexidade está encapsulada em useCardGrossUpBySecurityManager.