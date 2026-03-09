// CardGrossUpRentability.tsx
//
// Widget mobile para exibição da rentabilidade com Gross Up.
//
// Arquitetura em duas camadas:
//   1. Camada de apresentação (CardGrossUpRentability)
//      — Estrutura visual estática: título, tratamento de erro e loading.
//      — Não conhece dados, não faz requisições.
//
//   2. Camada de dados (CardGrossUpRentabilityDataRequest)
//      — Realiza a requisição via useRequestHooks (injetável via contexto).
//      — Delega a renderização dos cards ao useCardGrossUpRentabilityManager.
//      — Separada da camada de apresentação para permitir o Suspense funcionar
//        corretamente: o fallback só é exibido enquanto esta camada está
//        suspensa, sem afetar o BaseWidget ao redor.
//
// Injeção de dependências:
//   Os hooks de requisição são fornecidos via RequestHooksContext, o que
//   permite substituí-los por mocks no Storybook e nos testes sem alterar
//   o componente.
//
// Responsividade:
//   Este widget é destinado a viewports compactas (mobile). A versão desktop
//   equivalente é o TableGrossUpRentability.

import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useCardGrossUpRentabilityManager } from './useCardGrossUpRentabilityManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Responsável pela estrutura visual do widget: título, boundary de erro e
// skeleton de carregamento. Delega a busca de dados ao componente interno.

export const CardGrossUpRentability = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>Rentabilidade com Gross up</Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      {/* ErrorBoundary captura erros lançados pela camada de dados */}
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorCard title="Erro na busca de rentabilidade..." error={error} />
        )}
      >
        {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
        <Suspense fallback={<TablePlaceholder size="sm" />}>
          <CardGrossUpRentabilityDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Responsável por buscar os dados e delegar a renderização ao manager.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const CardGrossUpRentabilityDataRequest = () => {
  // Contexto de requisição: fornece o agrupamento selecionado pelo usuário
  const { selectedGrouping } = useContentRequest();

  // Hook de requisição injetável via contexto — substituível por mock no Storybook
  const { useFetchGrossUpRentability } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchGrossUpRentability({
    groupingId: selectedGrouping,
    period: 'sinceInception',
    select: (data) => data,
  });

  // Manager: transforma os dados brutos em JSX de cards formatados
  const { renderList } = useCardGrossUpRentabilityManager({ data: data ?? [] });

  // Estado vazio: exibido quando a API retorna dados vazios ou nulos
  if (isNullOrUndefined(data) || isEmptyArr(data)) {
    return (
      <EmptyWidget message={'Sem dados de GrossUp para o período solicitado.'} />
    );
  }

  // Delega a renderização dos cards ao manager
  return renderList();
};