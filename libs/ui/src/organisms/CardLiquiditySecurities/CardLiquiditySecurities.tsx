// CardLiquiditySecurities.tsx
//
// Widget mobile para exibição dos ativos com liquidez.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (CardLiquiditySecurities)
//      — Estrutura visual estática: título, boundary de erro e loading.
//
//   2. Camada de dados (CardLiquiditySecuritiesDataRequest)
//      — Busca os dados via useRequestHooks (injetável via contexto).
//
//   3. Camada de conteúdo (CardLiquiditySecuritiesView)
//      — Estado, useMemo e JSX inline. Sem arquivo manager separado.
//
// Responsividade:
//   Destinado a viewports compactas (mobile).
//   A versão desktop equivalente é o TableLiquiditySecurities.
//   Chave no registry: 'card-liquidity-securities'

import { Liquidity } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useCurrencyFormatters, useNumberFormatters, useRequestHooks } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/react/macro';
import { Stack, Text } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { CardScrollList } from '../../molecules/CardScrollList/CardScrollList';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { PeriodButtonGroup } from '../../molecules/PeriodButtonGroup/PeriodButtonGroup';
import { PeriodSummaryRow } from '../../molecules/PeriodSummaryRow/PeriodSummaryRow';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useLiquidityProvider } from '../ChartLiquidityByPeriod/useLiquidityProvider';
import { SecurityLiquidityItem } from './SecurityLiquidityItem';

// ─── Camada de apresentação ───────────────────────────────────────────────────
// Estrutura visual estática: título, boundary de erro e skeleton de loading.
// Não conhece dados, não faz requisições.

export const CardLiquiditySecurities = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Liquidez dos ativos</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        {/* ErrorBoundary captura erros lançados pela camada de dados */}
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title={t`Erro ao carregar liquidez dos ativos...`} error={error} />
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

  return <CardLiquiditySecuritiesView data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Estado, useMemo e JSX inline — sem arquivo manager separado.
// Separada de DataRequest para instanciar useLiquidityProvider somente
// após os dados estarem disponíveis — hooks não podem ser condicionais.

const CardLiquiditySecuritiesView = ({ data }: { data: Liquidity }) => {
  const { i18n } = useLingui();
  const { currencyFormatter } = useCurrencyFormatters({ locale: i18n.locale, currency: data.currency });
  const { percentFormatter } = useNumberFormatters({ locale: i18n.locale });

  const { labelData, selectedPeriod, setSelectedPeriod, includeProvisions } = useLiquidityProvider({ liquidityValues: data });

  // Filtra ativos pelo período selecionado e pelo toggle de provisões
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

  // Totais calculados para o período selecionado
  const totalBalance = filteredData.liquiditySecurities.reduce((acc, s) => acc + s.balance, 0);
  const totalPercent = filteredData.liquiditySecurities.reduce((acc, s) => acc + s.netWorth, 0);

  return (
    <Stack gap={0}>
      {/* Seletor de período */}
      <PeriodButtonGroup
        periods={labelData ?? []}
        selectedPeriod={selectedPeriod}
        onSelect={setSelectedPeriod}
      />

      {/* Totais do período */}
      <PeriodSummaryRow
        count={filteredData.liquiditySecurities.length}
        countLabel={<Trans>Ativos</Trans>}
        currencyTotal={currencyFormatter(totalBalance, 2)}
        percentTotal={percentFormatter(totalPercent * 100, 2)}
      />

      {/* Lista de cards ou estado vazio */}
      <CardScrollList
        isEmpty={filteredData.liquiditySecurities.length === 0}
        emptyMessage={t`Você não possui ativos com liquidez no período selecionado.`}
      >
        {filteredData.liquiditySecurities.map((security, index) => (
          <SecurityLiquidityItem
            key={security.securityName + index}
            liquiditySecurity={security}
            currency={data.currency}
          />
        ))}
      </CardScrollList>
    </Stack>
  );
};
