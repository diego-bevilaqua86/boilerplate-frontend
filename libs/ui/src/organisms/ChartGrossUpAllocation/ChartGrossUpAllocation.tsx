import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { DoughnutChart } from '../../molecules/DoughnutChart/DoughnutChart';
import { useChartGrossUpAllocationManager } from './useChartGrossUpAllocationManager';

export const ChartGrossUpAllocation = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Alocação</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <ChartGrossUpAllocationDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const ChartGrossUpAllocationDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchGrossUpAllocation } = useRequestHooks();

  const { data } = useFetchGrossUpAllocation({
    groupingId: selectedGrouping,
    select: (data) => data,
  });

  const chartProps = useChartGrossUpAllocationManager({ data });

  return (
    <Box w="100%" h={320}>
      <DoughnutChart {...chartProps} />
    </Box>
  );
};