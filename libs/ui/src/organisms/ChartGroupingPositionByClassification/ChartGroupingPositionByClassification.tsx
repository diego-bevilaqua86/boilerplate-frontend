import { Suspense } from 'react';

import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Text } from '@mantine/core';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { DoughnutChart } from '../../molecules/DoughnutChart/DoughnutChart';
import { useChartGroupingPositionByClassificationManager } from './useChartGroupingPositionByClassificationManager';

export const ChartGroupingPositionByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Posição por classificação</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <ChartGroupingPositionByClassificationDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const ChartGroupingPositionByClassificationDataRequest = () => {
  const { selectedGrouping } = useContentRequest();
  const { useFetchSecurityPositionByClass } = useRequestHooks();

  const { data: securityPositionByClassData } = useFetchSecurityPositionByClass({
    groupingId: selectedGrouping,
    select: (data) => data,
    finalDate: '02-02-2025',
  });

  const chartProps = useChartGroupingPositionByClassificationManager({ securityPositionByClassData });

  return (
    <Box w={'100%'} h={320}>
      <DoughnutChart {...chartProps} />
    </Box>
  );
};
