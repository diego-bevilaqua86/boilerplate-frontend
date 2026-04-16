// ChartLiquidityByPeriod.tsx
//
// Widget desktop para exibição do gráfico de liquidez do patrimônio.
//
// Arquitetura em três camadas:
//   1. Camada de apresentação (ChartLiquidityByPeriod)
//      — Estrutura visual estática: título, boundary de erro e loading.
//
//   2. Camada de dados (ChartLiquidityByPeriodDataRequest)
//      — Busca os dados via useRequestHooks.
//      — Instancia useLiquidityProvider e passa estado para o View.
//
//   3. Camada de conteúdo (ChartLiquidityByPeriodView)
//      — Estado, useMemo, handlers e JSX.
//
// Nota: useLiquidityProvider é instanciado aqui e compartilhado com
// TableLiquiditySecurities via props quando ambos estão no mesmo template.
// Como são widgets independentes no react-grid-layout, cada um instancia
// seu próprio provider — o estado é duplicado mas isolado por widget.

import { Liquidity } from '@boilerplate-frontend/types';
import { isNullOrUndefined, numberFormatter, percentFormatter, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { BarChart } from '@mantine/charts';
import { ActionIcon, Box, Button, Group, SegmentedControl, Stack, Switch, Text } from '@mantine/core';
import { BarChart2 } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useLiquidityProvider } from './useLiquidityProvider';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const ChartLiquidityByPeriod = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Liquidez do patrimônio</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar liquidez..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <ChartLiquidityByPeriodDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────
// Instancia useLiquidityProvider com os dados brutos.
// Passa o estado para o View que renderiza o gráfico correto.

const ChartLiquidityByPeriodDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchLiquidityValues } = useRequestHooks();

  const { data } = useFetchLiquidityValues({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return <ChartLiquidityByPeriodView data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────
// Separada de DataRequest para poder instanciar useLiquidityProvider
// somente após os dados estarem disponíveis (hooks não podem ser condicionais).

const ChartLiquidityByPeriodView = ({ data }: { data: Liquidity }) => {
  const { _, i18n } = useLingui();

  const liquidity = useLiquidityProvider({ liquidityValues: data });
  const { selectedType, includeProvisions, labelData, selectedPeriod, setSelectedPeriod, setSelectedType, setIncludeProvisions } = liquidity;

  // ── Gráfico de barras simples (currency, sem provisões) ──────────────────
  const barData = useMemo(() =>
    data.liquidityValues.map((v, i) => ({
      period: labelData?.[i]?.label ?? `D+${v.lowestLiquidityDay}`,
      value: v.value,
      color: labelData?.[i]?.label === selectedPeriod ? 'blue.6' : 'gray.4',
    })),
  [data.liquidityValues, labelData, selectedPeriod]);

  // ── Gráfico de barras com provisões (currency, com provisões) ────────────
  const barWithProvisionsData = useMemo(() =>
    data.liquidityProvisionsValues.map((v, i) => ({
      period: labelData?.[i]?.label ?? `D+${v.lowestLiquidityDay}`,
      ativos: v.value,
      provisoes: v.provisionsValue,
    })),
  [data.liquidityProvisionsValues, labelData]);

  // ── Gráfico cascata sem provisões (percentage, sem provisões) ────────────
  const waterfallData = useMemo(() => {
    const points = data.liquidityPercents.map((p, i) => ({
      item: labelData?.[i]?.label ?? `D+${p.lowestLiquidityDay}`,
      value: p.value * 100,
      color: labelData?.[i]?.label === selectedPeriod ? 'blue.6' : 'gray.4',
    }));

    const total = data.liquidityPercents.reduce((acc, p) => acc + p.value * 100, 0);
    return [
      ...points,
      { item: 'Total', value: total, standalone: true, color: 'teal.7' },
    ];
  }, [data.liquidityPercents, labelData, selectedPeriod]);

  // ── Gráfico cascata com provisões (percentage, com provisões) ────────────
  const waterfallWithProvisionsData = useMemo(() => {
    const filtered = data.liquidityProvisionsPercents.filter(
      (p) => p.lowestLiquidityDay !== null,
    );
    const points = filtered.map((p, i) => ({
      item: labelData?.[i]?.label ?? `D+${p.lowestLiquidityDay}`,
      value: p.value * 100,
      color: labelData?.[i]?.label === selectedPeriod ? 'blue.6' : 'gray.4',
    }));

    const provisionValue = data.liquidityProvisionsPercents.find(
      (p) => p.highestLiquidityDay === null && p.lowestLiquidityDay === null,
    )?.value ?? 0;

    const total = data.liquidityProvisionsPercents.reduce((acc, p) => acc + p.value * 100, 0);

    return [
      ...points,
      { item: _(msg`Provisões`), value: provisionValue * 100, color: 'cyan.5' },
      { item: 'Total', value: total, standalone: true, color: 'teal.7' },
    ];
  }, [_, data.liquidityProvisionsPercents, labelData, selectedPeriod]);

  return (
    <Stack gap={0} h="100%">
      {/* Controles: seletor de tipo e toggle de provisões */}
      <Group px="md" py="sm" justify="space-between">
        <SegmentedControl
          size="xs"
          value={selectedType}
          onChange={(v) => setSelectedType(v as 'currency' | 'percentage')}
          data={[
            { label: <Trans>Valor</Trans>, value: 'currency' },
            { label: '%', value: 'percentage' },
          ]}
        />
        <Group gap="xs">
          <Switch
            size="xs"
            label={<Trans>Incluir provisões</Trans>}
            checked={includeProvisions}
            onChange={(e) => setIncludeProvisions(e.currentTarget.checked)}
          />
          <ActionIcon variant="default" size="sm">
            <BarChart2 />
          </ActionIcon>
        </Group>
      </Group>

      {/* Gráfico */}
      <Box px="md" pb="sm">
        {selectedType === 'currency' && !includeProvisions && (
          <BarChart
            h={200}
            data={barData}
            dataKey="period"
            series={[{ name: 'value', label: _(msg`Liquidez`), color: 'blue.6' }]}
            getBarColor={(_, series) => series.color ?? 'blue.6'}
            yAxisProps={{
              tickFormatter: (v) => numberFormatter(v, 0, i18n.locale),
            }}
            withXAxis={false}
            withLegend={false}
          />
        )}

        {selectedType === 'currency' && includeProvisions && (
          <BarChart
            h={200}
            data={barWithProvisionsData}
            dataKey="period"
            type="stacked"
            series={[
              { name: 'ativos', label: _(msg`Ativos`), color: 'blue.6' },
              { name: 'provisoes', label: _(msg`Provisões`), color: 'cyan.4' },
            ]}
            yAxisProps={{
              tickFormatter: (v) => numberFormatter(v, 0, i18n.locale),
            }}
            withXAxis={false}
            withLegend
          />
        )}

        {selectedType === 'percentage' && !includeProvisions && (
          <BarChart
            h={200}
            data={waterfallData}
            dataKey="item"
            type="waterfall"
            series={[{ name: 'value', label: _(msg`Liquidez (%)`), color: 'blue.6' }]}
            yAxisProps={{
              tickFormatter: (v) => percentFormatter(Number(v), 0, i18n.locale),
            }}
            withXAxis={false}
            withLegend={false}
          />
        )}

        {selectedType === 'percentage' && includeProvisions && (
          <BarChart
            h={200}
            data={waterfallWithProvisionsData}
            dataKey="item"
            type="waterfall"
            series={[{ name: 'value', label: _(msg`Liquidez c/ Provisões (%)`), color: 'blue.6' }]}
            yAxisProps={{
              tickFormatter: (v) => percentFormatter(Number(v), 0, i18n.locale),
            }}
            withXAxis={false}
            withLegend={false}
          />
        )}

        {/* Seletor de período */}
        <Group gap={4} py="sm" wrap="wrap">
          {labelData?.map((period) => (
            <Button
              key={period.label}
              size="xs"
              variant={period.label === selectedPeriod ? 'filled' : 'default'}
              disabled={period.disabled}
              onClick={() => setSelectedPeriod(period.label)}
            >
              {period.label}
            </Button>
          ))}
        </Group>
      </Box>
    </Stack>
  );
};
