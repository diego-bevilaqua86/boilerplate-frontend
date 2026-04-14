import { PerformanceOverPeriods } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Text } from '@mantine/core';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { LineChart } from '../../molecules/LineChart/LineChart';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export const PerformanceOverPeriod = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Performance no período</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar performance..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <PerformanceOverPeriodDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada de dados ──────────────────────────────────────────────────────────

const PerformanceOverPeriodDataRequest = () => {
  const { selectedGrouping, selectedPeriod } = useContentRequest();
  const { useFetchPerformanceOverPeriod } = useRequestHooks();

  const { data } = useFetchPerformanceOverPeriod({
    groupingId: selectedGrouping,
    period: selectedPeriod,
  });

  if (isNullOrUndefined(data) || data.dates.length === 0) return <EmptyWidget />;

  return <PerformanceOverPeriodView data={data} />;
};

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

const PerformanceOverPeriodView = ({ data }: { data: PerformanceOverPeriods }) => {
  const chartData = useMemo(() =>
    data.dates.map((date, index) => {
      const point: Record<string, unknown> = { date };
      data.performance.forEach((p) => {
        const key = p.refersTo ?? p.securityId ?? '';
        if (key) point[key] = p.values[index] ?? null;
      });
      return point;
    }),
  [data]);

  const seriesKeys = useMemo(() =>
    data.performance
      .map((p) => p.refersTo ?? p.securityId)
      .filter((k): k is string => k !== null),
  [data]);

  return (
    <Box w="100%" h={320}>
      <LineChart data={chartData} dataKey="date" seriesKeys={seriesKeys} />
    </Box>
  );
};
