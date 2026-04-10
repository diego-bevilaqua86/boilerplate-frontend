// TableLiquiditySecurities.tsx
//
// Widget desktop para exibição da tabela de ativos com liquidez.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (TableLiquiditySecurities)
//      — Estrutura visual estática: título, boundary de erro e loading.
//
//   2. Camada de dados (TableLiquiditySecuritiesDataRequest)
//      — Busca os dados via useRequestHooks (injetável via contexto).
//
//   3. Camada de view (TableLiquiditySecuritiesView)
//      — Estado, handlers, useMemo e JSX — tudo inline.
//
// Responsividade:
//   Destinado a viewports desktop e tablet.
//   Chave no registry: 'table-liquidity-securities'

import { Liquidity } from '@boilerplate-frontend/types';
import { isEmptyArr, isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Text } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { PeriodButtonGroup } from '../../molecules/PeriodButtonGroup/PeriodButtonGroup';
import { TableScrollList } from '../../molecules/TableScrollList/TableScrollList';
import { useLiquidityProvider } from '../ChartLiquidityByPeriod/useLiquidityProvider';
import { useLiquiditySecuritiesTable } from './useLiquiditySecuritiesTable';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const TableLiquiditySecurities = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Liquidez dos ativos</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      {/* ErrorBoundary captura erros lançados pela camada de dados */}
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar liquidez dos ativos..." error={error} />}
      >
        {/* Suspense exibe o skeleton enquanto a requisição está pendente */}
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <TableLiquiditySecuritiesDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Busca os dados via contexto injetável.
// Fica separada da camada de apresentação para que o Suspense funcione
// corretamente — o componente suspende aqui, não no BaseWidget.

const TableLiquiditySecuritiesDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchLiquidityValues } = useRequestHooks();

  // A requisição suspende o componente até os dados estarem disponíveis
  const { data } = useFetchLiquidityValues({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  // Estado vazio: delega ao EmptyWidget o padrão visual de ausência de dados
  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <TableLiquiditySecuritiesView data={data} />;
};

// ─── Camada de view ───────────────────────────────────────────────────────
// Estado, handlers, useMemo e JSX — tudo inline.

const TableLiquiditySecuritiesView = ({ data }: { data: Liquidity }) => {
  const { _ } = useLingui();
  const liquidity = useLiquidityProvider({ liquidityValues: data });
  const { labelData, includeProvisions, selectedPeriod, setSelectedPeriod } = liquidity;

  // Filtra os ativos pelo período selecionado e pelo toggle de provisões
  const filteredData = useMemo(() => {
    const selectedDaysRange = selectedPeriod.match(/\d+/g);

    if (!selectedDaysRange) return { ...data, liquiditySecurities: [] };

    return {
      ...data,
      liquiditySecurities: data.liquiditySecurities.filter((s) => {
        if (!includeProvisions && s.type === 'provision') return false;
        return s.lowestLiquidityDay === Number(selectedDaysRange[0]);
      }),
    };
  }, [data, includeProvisions, selectedPeriod]);

  const { table } = useLiquiditySecuritiesTable({ data: filteredData });

  return (
    <>
      <Box px="md">
        {/* Seletor de período — sincronizado com o gráfico via useLiquidityProvider */}
        <PeriodButtonGroup
          periods={labelData ?? []}
          selectedPeriod={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
      </Box>

      <TableScrollList
        isEmpty={isEmptyArr(filteredData.liquiditySecurities)}
        emptyMessage={_(msg`Você não possui ativos com liquidez no período selecionado.`)}
      >
        <BaseTable table={table} />
      </TableScrollList>
    </>
  );
};
