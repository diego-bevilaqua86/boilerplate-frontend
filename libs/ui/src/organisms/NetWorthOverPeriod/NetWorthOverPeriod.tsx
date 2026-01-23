import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { BarChart } from '../../molecules/BarChart/BarChart';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { useNetWorthOverPeriodManager } from './useNetWorthOverPeriodManager';

export const NetWorthOverPeriod = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>Evolução Patrimonial</Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense>
          <NetWorthOverPeriodDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const NetWorthOverPeriodDataRequest = () => {
  const { selectedClient, selectedGrouping } = useContentRequest();
  const { useFetchNetWorthOverPeriods } = useRequestHooks();

  const { data: netWorthData } = useFetchNetWorthOverPeriods({
    clientId: selectedClient,
    groupingId: selectedGrouping,
    period: '2025',
  });

  const chartProps = useNetWorthOverPeriodManager({ netWorthData });

  return (
    <Box w={'100%'} h={320}>
      <BarChart {...chartProps} isStacked />
    </Box>
  );
};
