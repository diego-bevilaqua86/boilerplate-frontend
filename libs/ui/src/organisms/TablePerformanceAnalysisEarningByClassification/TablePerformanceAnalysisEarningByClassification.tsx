// import './TablePerformanceAnalysisEarningByClassification.scss';

import {
  ClassificationTableItem,
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
import { usePerformanceAnalysisEarningByClassificationTable } from './usePerformanceAnalysisEarningByClassificationTable';
import { useTablePerformanceAnalysisEarningByClassificationAdapter } from './useTablePerformanceAnalysisEarningByClassificationAdapter';

// ─── Camada de apresentação ───────────────────────────────────────────────────

export function TablePerformanceAnalysisEarningByClassification() {
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
            <TablePerformanceAnalysisEarningByClassificationDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
}

// ─── Camada de dados ──────────────────────────────────────────────────────────

export function TablePerformanceAnalysisEarningByClassificationDataRequest() {
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchAvailableFilters, useFetchGenericTableData } = useRequestHooks();

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

  const { tableData } = useTablePerformanceAnalysisEarningByClassificationAdapter({
    genericTableData: data,
    groupingSummary: selectedGroupingSummary,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return (
    <Box px="md" pb="md">
      <ScrollArea>
        <TablePerformanceAnalysisEarningByClassificationContent
          data={tableData}
          currency={selectedGroupingSummary.currency}
        />
      </ScrollArea>
    </Box>
  );
}

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

type TablePerformanceAnalysisEarningByClassificationContentProps = {
  data: Array<ClassificationTableItem>;
  currency: string;
};

function TablePerformanceAnalysisEarningByClassificationContent({
  data,
  currency,
}: TablePerformanceAnalysisEarningByClassificationContentProps) {
  const { handleOpen } = useTemplateModal();
  const { table } = usePerformanceAnalysisEarningByClassificationTable({
    data,
    currency,
    onAction: (row) => {
      handleOpen('performance-details', { classification: row.classificationOrSecurity });
    },
  });

  return <BaseTable table={table} />;
}
