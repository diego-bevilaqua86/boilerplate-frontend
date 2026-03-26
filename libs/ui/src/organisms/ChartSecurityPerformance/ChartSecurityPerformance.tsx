// ChartSecurityPerformance.tsx
//
// Widget de gráfico de performance parametrizado do ativo.
// Permite selecionar período e benchmark.
// Chave no registry: 'chart-security-performance'

import { PeriodType } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useRequestHooks, useTemplateNavigation } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Group, SegmentedControl, Select, Stack, Text } from '@mantine/core';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { LineChart } from '../../molecules/LineChart/LineChart';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

export const ChartSecurityPerformance = () => (
  <BaseWidget>
    <BaseWidget.Header>
      <Text>
        <Trans>Performance</Trans>
      </Text>
    </BaseWidget.Header>
    <BaseWidget.Content>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar performance..." error={error} />}
      >
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <ChartSecurityPerformanceDataRequest />
        </Suspense>
      </ErrorBoundary>
    </BaseWidget.Content>
  </BaseWidget>
);

// ChartSecurityPerformance.tsx — apenas a parte do conteúdo corrigida

const ChartSecurityPerformanceDataRequest = () => {
  const { currentParams } = useTemplateNavigation();
  const { useFetchSecurityPerformance } = useRequestHooks();
  const { _ } = useLingui();

  const walletId = (currentParams?.walletId as string) ?? '';
  const securityId = (currentParams?.securityId as string) ?? '';

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('month');
  const [selectedBenchmark, setSelectedBenchmark] = useState<string | null>(null);

  const { data } = useFetchSecurityPerformance({
    walletId,
    securityId,
    period: selectedPeriod,
    currency: 'BRL',
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  const filteredPerformance = data.performance.filter(
    (p) => p.itemType !== 'benchmark' || p.itemName === selectedBenchmark,
  );

  // Transforma para o formato esperado pelo LineChart:
  // [{ date: '2025-01-01', 'CRI Habitacional 2024': 0, 'CDI': 0 }, ...]
  const chartData = data.dates.map((date, index) => {
    const point: Record<string, unknown> = { date };
    filteredPerformance.forEach((p) => {
      const key = p.itemName ?? p.itemId ?? '';
      if (key) point[key] = p.values[index] ?? null;
    });
    return point;
  });

  const benchmarkOptions = [
    { value: '', label: _(msg`Sem benchmark`) },
    ...data.performance
      .filter((p) => p.itemType === 'benchmark')
      .map((p) => ({ value: p.itemName ?? '', label: p.itemName ?? '' })),
  ];

  const seriesKeys = filteredPerformance
    .map((p) => p.itemName ?? p.itemId)
    .filter((key): key is string => key !== null);

  return (
    <Stack gap="sm" px="md" pb="md">
      <Group justify="space-between">
        <SegmentedControl
          size="xs"
          value={selectedPeriod as string}
          onChange={(v) => setSelectedPeriod(v as PeriodType)}
          data={[
            { label: _(msg`Mês`), value: 'month' },
            { label: _(msg`Ano`), value: 'year' },
            { label: _(msg`12m`), value: '12m' },
            { label: _(msg`24m`), value: '24m' },
          ]}
        />
        {benchmarkOptions.length > 1 && (
          <Select
            size="xs"
            data={benchmarkOptions}
            value={selectedBenchmark ?? ''}
            onChange={setSelectedBenchmark}
            w={160}
          />
        )}
      </Group>

      <Box h={320}>
        <LineChart data={chartData} dataKey="date" seriesKeys={seriesKeys} />
      </Box>
    </Stack>
  );
};
