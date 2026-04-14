import { useContentRequest, useRequestHooks } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BarChart } from '../../molecules/BarChart/BarChart';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useNetWorthOverPeriodManager } from './useNetWorthOverPeriodManager';

export const NetWorthOverPeriod = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text><Trans>Evolução Patrimonial</Trans></Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar evolução patrimonial..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="sm" />}>
            <NetWorthOverPeriodDataRequest />
          </Suspense>
        </ErrorBoundary>
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
