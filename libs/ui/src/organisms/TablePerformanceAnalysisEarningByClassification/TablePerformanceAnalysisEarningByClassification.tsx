// import './TablePerformanceAnalysisEarningByClassification.scss';

import {
  ClassificationTableItem,
  ParameterizedTableFiltersDTO,
  PerformanceRequestFilter,
} from '@boilerplate-frontend/types';
import { currencyFormatter, isNullOrUndefined, percentFormatter, useContentRequest, useRequestHooks, useTemplateModal } from '@boilerplate-frontend/utils';
import { msg } from '@lingui/core/macro';
import { Trans, useLingui } from '@lingui/react/macro';
import { Badge, Box, Flex, RingProgress, ScrollArea, Text } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react';
import {
  ColumnSort,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SensitiveText } from '../../atoms/SensitiveText/SensitiveText';
import TableActionButtons from '../../atoms/TableActionButtons/TableActionButtons';
import { TableSortingHeader } from '../../atoms/TableSortingHeader/TableSortingHeader';
import { BaseTable } from '../../molecules/BaseTable/BaseTable';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useTablePerformanceAnalysisEarningByClassificationAdapter } from './useTablePerformanceAnalysisEarningByClassificationAdapter';

const columnBuilder = createColumnHelper<ClassificationTableItem>();

// ─── Camada de apresentação ───────────────────────────────────────────────────

export function TablePerformanceAnalysisEarningByClassification() {
  const { t } = useLingui();
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
            <ErrorCard title={t`Erro ao carregar dados de contribuição por classe...`} error={error} />
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
        <TablePerformanceAnalysisEarningByClassificationView
          data={tableData}
          currency={selectedGroupingSummary.currency}
        />
      </ScrollArea>
    </Box>
  );
}

// ─── Camada de conteúdo ───────────────────────────────────────────────────────

type TablePerformanceAnalysisEarningByClassificationViewProps = {
  data: Array<ClassificationTableItem>;
  currency: string;
};

function TablePerformanceAnalysisEarningByClassificationView({
  data,
  currency,
}: TablePerformanceAnalysisEarningByClassificationViewProps) {
  const { _, i18n } = useLingui();
  const { handleOpen } = useTemplateModal();

  const [sorting, setSorting] = useState<Array<ColumnSort>>([]);

  const onAction = useCallback(
    (row: ClassificationTableItem) => {
      handleOpen('performance-details', { classification: row.classificationOrSecurity });
    },
    [handleOpen],
  );

  const progressData = useCallback(
    (plPercent: number | null) => {
      if (isNullOrUndefined(plPercent)) return { value: 0, color: 'brand.5' };
      const value = plPercent * 100;
      const color = value >= 0 ? 'brand.5' : 'red.5';

      return {
        value,
        color,
        tooltip: percentFormatter(plPercent, 2, i18n.locale),
      };
    },
    [i18n.locale],
  );

  const columns = useMemo(
    () => [
      columnBuilder.accessor('classificationOrSecurity', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Classes`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue, row }) => (
          <Flex align={'center'} gap={8}>
            <RingProgress
              size={40}
              thickness={4}
              roundCaps
              sections={[progressData(row.original.plPercent)]}
              transitionDuration={600}
            />
            <span className="ms-2">{getValue()}</span>
          </Flex>
        ),
        footer: () => (
          <span>
            <Trans>Total</Trans>
          </span>
        ),
      }),
      columnBuilder.accessor('balance', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Saldo`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText isHidden={false}>
            <span>{currencyFormatter(getValue(), 2, i18n.locale, currency)}</span>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.balance, 0);
          return (
            <SensitiveText isHidden={false}>
              <span>{currencyFormatter(total, 2, i18n.locale, currency)}</span>
            </SensitiveText>
          );
        },
      }),
      columnBuilder.accessor('plPercent', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`% Patrimônio`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2, i18n.locale, 1)}</span>,
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => {
            if (row.original.plPercent === null) return sum;
            return sum + row.original.plPercent;
          }, 0);
          return <span>{percentFormatter(total, 2, i18n.locale, 1)}</span>;
        },
      }),
      columnBuilder.accessor('rentability', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Rentabilidade`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => <span>{percentFormatter(getValue(), 2, i18n.locale, 1)}</span>,
        footer: () => '-',
      }),
      columnBuilder.accessor('financialEarnings', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Ganhos financeiros`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <SensitiveText isHidden={false}>
            <Badge
              // autoContrast
              color={getValue() >= 0 ? 'green.5' : 'red.5'}
              leftSection={getValue() >= 0 ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
            >
              {currencyFormatter(getValue(), 2, i18n.locale, currency)}
            </Badge>
          </SensitiveText>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.financialEarnings, 0);
          return (
            <SensitiveText isHidden={false}>
              <span>{currencyFormatter(total, 2, i18n.locale, currency)}</span>
            </SensitiveText>
          );
        },
      }),
      columnBuilder.accessor('contributionYield', {
        header: ({ column }) => (
          <TableSortingHeader
            headerText={_(msg`Contribuição`)}
            sortDirection={column.getIsSorted()}
            onToggleSorting={column.getToggleSortingHandler()}
          />
        ),
        cell: ({ getValue }) => (
          <Badge
            color={getValue() >= 0 ? 'green.5' : 'red.5'}
            leftSection={getValue() >= 0 ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
          >
            {percentFormatter(getValue(), 2, i18n.locale, 1)}
          </Badge>
        ),
        footer: ({ table: { getPrePaginationRowModel } }) => {
          const total = getPrePaginationRowModel().rows.reduce((sum, row) => sum + row.original.contributionYield, 0);
          return <span>{percentFormatter(total, 2, i18n.locale, 1)}</span>;
        },
      }),
      columnBuilder.display({
        id: 'actionsColumn',
        cell: ({ row }) =>
          row.original.classificationOrSecurity === `Provisões` ||
          row.original.classificationOrSecurity === `Total do portfólio` ||
          row.original.classificationOrSecurity === `Ganhos/Despesas` ||
          row.original.classificationOrSecurity === `Saldo em conta` ? null : (
            <TableActionButtons row={row.original} onOpenModalRow={onAction} />
          ),
      }),
    ],
    [_, i18n.locale, currency, onAction, progressData],
  );

  const table = useReactTable<ClassificationTableItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return <BaseTable table={table} />;
}
