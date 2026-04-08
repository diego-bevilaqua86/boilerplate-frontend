import { useContentRequest, useRequestHooks, useTemplateModal } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, Group, Pill, Select, Stack, Text } from '@mantine/core';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { LineChart } from '../../molecules/LineChart/LineChart';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';

export function ChartPerformanceAnalysisByClassificationLine() {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Performance</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary fallbackRender={({ error }) => <ErrorCard title="Erro ao carregar resumo..." error={error} />}>
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <ChartPerformanceAnalysisByClassificationLineDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
}

export function ChartPerformanceAnalysisByClassificationLineDataRequest() {
  const { _ } = useLingui();
  const { currentParams } = useTemplateModal();
  const classification = currentParams?.classification as string;

  // const { currentParams } = useTemplateModal();
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchPerformanceByClassification } = useRequestHooks();

  const { data } = useFetchPerformanceByClassification({
    groupingId: selectedGroupingSummary._id,
    period: selectedPeriod,
  });

  const benchmarkOptions = useMemo(() => {
    return [
      {
        label: _(msg`Sem benchmark`),
        value: '',
      },
      ...data.performance
        .filter((perf) => perf.isBenchmark)
        .map((perf) => ({
          label: perf.refersTo,
          value: perf.refersTo,
        })),
    ];
  }, [_, data.performance]);

  const [selectedBenchmark, setSelectedBenchmark] = useState<string | null>(null);

  const filteredPerformanceByClassification = useMemo(() => {
    const performance = data.performance.filter((perf) => !perf.isBenchmark && perf.refersTo === classification);

    if (selectedBenchmark !== '') {
      const benchmark = data.performance.filter((perf) => perf.refersTo === selectedBenchmark);

      return { ...data, performance: [...performance, ...benchmark] };
    }

    return { ...data, performance };
  }, [data, selectedBenchmark, classification]);

  const handleSelectBenchmark = (value: string | null) => {
    setSelectedBenchmark(value);
  };

  const chartData = filteredPerformanceByClassification.dates.map((date, index) => {
    const point: Record<string, unknown> = { date };
    data.performance.forEach((p) => {
      const key = p.refersTo ?? p.securityId ?? '';
      if (key) point[key] = p.values[index] ?? null;
    });
    return point;
  });

  const seriesKeys = filteredPerformanceByClassification.performance
    .map((p) => p.refersTo ?? p.securityId)
    .filter((key): key is string => key !== null);

  return (
    <Stack gap="sm" px="md" pb="md">
      <Group justify="end">
        {benchmarkOptions.length > 1 && (
          <Select
            size="xs"
            data={benchmarkOptions}
            defaultValue={''}
            value={selectedBenchmark ?? ''}
            onChange={handleSelectBenchmark}
            w={160}
          />
        )}
        <Pill>{classification}</Pill>
      </Group>

      <Box h={320}>
        <LineChart data={chartData} dataKey="date" seriesKeys={seriesKeys} seriesColors={['brand', 'gray.4']} />
      </Box>
    </Stack>
  );
}
