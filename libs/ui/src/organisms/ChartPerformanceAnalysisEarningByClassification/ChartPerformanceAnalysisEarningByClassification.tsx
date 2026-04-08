import {
  currencyFormatterToParts,
  isNullOrUndefined,
  useContentRequest,
  useRequestHooks,
} from '@boilerplate-frontend/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { BarChart } from '@mantine/charts';
import { Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useChartPerformanceAnalysisEarningByClassificationManager } from './useChartPerformanceAnalysisEarningByClassificationManager';
// import './ChartPerformanceAnalysisEarningByClassification.scss';

export const ChartPerformanceAnalysisEarningByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Rentabilidade por classificação</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <Suspense fallback={<TablePlaceholder size="lg" />}>
          <ChartPerformanceAnalysisEarningByClassificationDataRequest />
        </Suspense>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

const ChartPerformanceAnalysisEarningByClassificationDataRequest = () => {
  const { i18n } = useLingui();
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchGenericTableData } = useRequestHooks();
  const { data } = useFetchGenericTableData({
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
  });

  const {
    earningsByClassificationChartData,
    formatType,
    chartContainerRef,
    getFormatValue,
    handleSelectFormateType,
    CustomTick,
  } = useChartPerformanceAnalysisEarningByClassificationManager(data, selectedGroupingSummary.currency);

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return (
    <Stack ref={chartContainerRef}>
      <Group>
        <SegmentedControl
          value={formatType}
          onChange={handleSelectFormateType}
          data={[
            {
              label: currencyFormatterToParts(0, 0, i18n.locale, selectedGroupingSummary?.currency)[0],
              value: 'currency',
            },
            { label: '%', value: 'percentage' },
          ]}
        />
        <BarChart
          h={200}
          data={earningsByClassificationChartData}
          dataKey="label"
          valueFormatter={(value) => getFormatValue(value, formatType)}
          withBarValueLabel
          tooltipAnimationDuration={200}
          getBarColor={(value) => (value > 0 ? 'brand.4' : 'red.8')}
          series={[{ name: 'value', color: 'violet.6', label: 'Ganhos' }]}
          tickLine="none"
          gridAxis="none"
          withYAxis={false}
          xAxisProps={{
            tick: <CustomTick />,
            height: 52,
          }}
        />
      </Group>
    </Stack>
  );
};
