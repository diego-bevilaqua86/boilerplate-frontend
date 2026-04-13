import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { DoughnutChart } from '../../molecules/DoughnutChart/DoughnutChart';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useChartGroupingPositionByClassificationManager } from './useChartGroupingPositionByClassificationManager';

export const ChartGroupingPositionByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Posição por classificação</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar posição por classificação..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <ChartGroupingPositionByClassificationDataRequest />
          </Suspense>
        </ErrorBoundary>
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
