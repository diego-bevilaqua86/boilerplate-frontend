import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Text } from '@mantine/core';
import { FC, Suspense } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { LineChart } from '../../molecules/LineChart/LineChart';
import { lineChartDataMock } from '../../molecules/LineChart/mock';

export const PerformanceOverPeriod: FC<unknown> = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Performance no período</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <PerformanceOverPeriodDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const PerformanceOverPeriodDataRequest: FC<unknown> = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchPerformanceOverPeriod } = useRequestHooks();

  const { data } = useFetchPerformanceOverPeriod({
    groupingId: selectedGrouping,
    period: '2025',
  });

  console.log(data);

  const chartProps = {
    data: lineChartDataMock,
    dataKey: 'itemLabel',
    seriesKeys: ['ItemA', 'ItemB', 'ItemC'],
    seriesLabels: ['Série A', 'Série B', 'Série C'],
    seriesColors: ['paletteA.0', 'paletteA.2', 'paletteA.4'],
  };
  return (
    <Box w={'100%'} h={320}>
      <LineChart {...chartProps} />
    </Box>
  );
};
