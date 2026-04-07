import {
  ClientContributionByClassificationTableRow,
  ParameterizedTableFiltersDTO,
  PerformanceRequestFilter,
} from '@boilerplate-frontend/types';
import { isNullOrUndefined, useContentRequest, useRequestHooks, useTemplateModal } from '@boilerplate-frontend/utils';
import { Trans } from '@lingui/react/macro';
import { Box, ScrollArea, Text } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { usePerformanceAnalysisByClassificationDetailsTable } from './usePerformanceAnalysisByClassificationDetailsTable';
import { useTablePerformanceAnalysisByClassificationDetailsAdapter } from './useTablePerformanceAnalysisByClassificationDetailsAdapter';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export function TablePerformanceAnalysisByClassificationDetails() {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Contribuição por classe</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar dados de contribuição por classe..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="lg" />}>
            <TablePerformanceAnalysisByClassificationDetailsDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
}

// ─── Camada de dados ──────────────────────────────────────────────────────────

export function TablePerformanceAnalysisByClassificationDetailsDataRequest() {
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchAvailableFilters, useFetchGenericTableData } = useRequestHooks();
  const { currentParams } = useTemplateModal();
  const { data: availableFilters } = useFetchAvailableFilters({
    groupingId: selectedGroupingSummary._id,
    period: selectedPeriod,
  });
  const performanceRequestFilters = availableFilters.map<PerformanceRequestFilter>((filter) => ({
    groupingId: filter.grouping._id,
    walletId: filter.wallet._id,
    securityId: filter.security._id,
  }));

  const genericTableFilter: ParameterizedTableFiltersDTO = {
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
    initialDate: undefined,
    finalDate: undefined,
    filters: performanceRequestFilters,
    fullGroupings: true,
  };

  const { data } = useFetchGenericTableData(genericTableFilter);

  const classification = currentParams?.classification as string;

  const { adaptedData } = useTablePerformanceAnalysisByClassificationDetailsAdapter({
    genericTableData: data,
    groupingSummary: selectedGroupingSummary,
    classification,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return (
    <Box px="md" pb="md">
      <ScrollArea>
        <TablePerformanceAnalysisByClassificationDetailsContent
          data={adaptedData}
          currency={selectedGroupingSummary.currency}
        />
      </ScrollArea>
    </Box>
  );
}

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

type TablePerformanceAnalysisByClassificationDetailsContentProps = {
  data: Array<ClientContributionByClassificationTableRow>;
  currency: string;
};

function TablePerformanceAnalysisByClassificationDetailsContent({
  data,
  currency,
}: TablePerformanceAnalysisByClassificationDetailsContentProps) {
  const { table } = usePerformanceAnalysisByClassificationDetailsTable({ data, currency });

  return <BaseTable table={table} />;
}
