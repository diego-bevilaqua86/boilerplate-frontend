// useChartLiquidityByPeriodManager.tsx
import { Liquidity } from '@boilerplate-frontend/types';
import { numberFormatter, percentFormatter } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { BarChart } from '@mantine/charts';
import { Box, Button, Group } from '@mantine/core';
import { useMemo } from 'react';
import { useLiquidityProvider } from './useLiquidityProvider';

type UseChartLiquidityByPeriodManagerProps = {
  data: Liquidity;
  liquidity: ReturnType<typeof useLiquidityProvider>;
};

export const useChartLiquidityByPeriodManager = ({ data, liquidity }: UseChartLiquidityByPeriodManagerProps) => {
  const { i18n } = useLingui();
  const { selectedType, includeProvisions, labelData, selectedPeriod, setSelectedPeriod } = liquidity;

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
      { item: 'Provisões', value: provisionValue * 100, color: 'cyan.5' },
      { item: 'Total', value: total, standalone: true, color: 'teal.7' },
    ];
  }, [data.liquidityProvisionsPercents, labelData, selectedPeriod]);

  // ── Seletor de período compartilhado ─────────────────────────────────────
  const renderPeriodSelector = () => (
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
  );

  // ── Renderização ──────────────────────────────────────────────────────────
  const renderChart = () => (
    <Box px="md" pb="sm">
      {selectedType === 'currency' && !includeProvisions && (
        <BarChart
          h={200}
          data={barData}
          dataKey="period"
          series={[{ name: 'value', label: 'Liquidez', color: 'blue.6' }]}
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
            { name: 'ativos', label: 'Ativos', color: 'blue.6' },
            { name: 'provisoes', label: 'Provisões', color: 'cyan.4' },
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
          series={[{ name: 'value', label: 'Liquidez (%)', color: 'blue.6' }]}
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
          series={[{ name: 'value', label: 'Liquidez c/ Provisões (%)', color: 'blue.6' }]}
          yAxisProps={{
            tickFormatter: (v) => percentFormatter(Number(v), 0, i18n.locale),
          }}
          withXAxis={false}
          withLegend={false}
        />
      )}

      {renderPeriodSelector()}
    </Box>
  );

  return { renderChart };
};