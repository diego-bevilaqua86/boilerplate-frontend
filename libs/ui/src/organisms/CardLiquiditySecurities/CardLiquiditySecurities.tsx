// CardLiquiditySecurities.tsx
//
// Widget mobile para exibição dos ativos com liquidez.
//
// Arquitetura em duas camadas:
//   1. Camada de apresentação (CardLiquiditySecurities)
//      — Estrutura visual estática: título, boundary de erro e loading.
//
//   2. Camada de dados (CardLiquiditySecuritiesDataRequest)
//      — Busca os dados via useRequestHooks (injetável via contexto).
//      — Instancia useLiquidityProvider após dados disponíveis.
//      — Delega renderização ao useCardLiquiditySecuritiesManager.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TableLiquiditySecurities.
//   Chave no registry: 'card-liquidity-securities'

import { Liquidity } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useLiquidityProvider } from '../ChartLiquidityByPeriod/useLiquidityProvider';
import { useCardLiquiditySecuritiesManager } from './useCardLiquiditySecuritiesManager';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardLiquiditySecurities = () => {
  const { _ } = useLingui();

  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Liquidez dos ativos</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar liquidez dos ativos..." error={error} />
          )}
        >
          {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <CardLiquiditySecuritiesDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Busca os dados via contexto injetável.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const CardLiquiditySecuritiesDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchLiquidityValues } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchLiquidityValues({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  // Estado vazio: delega ao EmptyWidget o padrão visual de ausência de dados
  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <CardLiquiditySecuritiesContent data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Separada de DataRequest para instanciar useLiquidityProvider somente
// após os dados estarem disponíveis — hooks não podem ser condicionais.

const CardLiquiditySecuritiesContent = ({ data }: { data: Liquidity }) => {
  // useLiquidityProvider gerencia selectedPeriod, includeProvisions e labelData
  const liquidity = useLiquidityProvider({ liquidityValues: data });

  // Manager: encapsula filtragem, totais e renderização dos cards
  const { renderList } = useCardLiquiditySecuritiesManager({ data, liquidity });

  return renderList();
};