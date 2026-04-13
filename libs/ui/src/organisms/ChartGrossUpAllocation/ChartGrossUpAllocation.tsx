import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { DoughnutChart } from '../../molecules/DoughnutChart/DoughnutChart';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useChartGrossUpAllocationManager } from './useChartGrossUpAllocationManager';

export const ChartGrossUpAllocation = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Alocação</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar alocação..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <ChartGrossUpAllocationDataRequest />
          </Suspense>
        </ErrorBoundary>
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