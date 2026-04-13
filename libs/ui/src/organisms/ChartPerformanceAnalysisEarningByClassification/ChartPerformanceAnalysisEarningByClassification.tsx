import {
  currencyFormatter,
  currencyFormatterToParts,
  isNullOrUndefined,
  percentFormatter,
  useContentRequest,
  useRequestHooks,
  useTemplateModal,
} from '@boilerplate-frontend/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { BarChart } from '@mantine/charts';
import { Button, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { ArrowCircleUpRightIcon } from '@phosphor-icons/react';
import { GenericTableData } from '@boilerplate-frontend/types';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseWidget } from '../../molecules/BaseWidget/BaseWidget';
import { EmptyWidget } from '../../molecules/EmptyWidget/EmptyWidget';
import { ErrorCard } from '../../molecules/ErrorCard/ErrorCard';
import { TablePlaceholder } from '../../molecules/TablePlaceholder/TablePlaceholder';
import { useChartPerformanceAnalysisEarningByClassificationAdapter } from './useChartPerformanceAnalysisEarningByClassificationAdapter';

// ─── Camada 1 — Apresentação ─────────────────────────────────────────────────

export const ChartPerformanceAnalysisEarningByClassification = () => {
  return (
    <BaseWidget>
      <BaseWidget.Header>
        <Text>
          <Trans>Rentabilidade por classificação</Trans>
        </Text>
      </BaseWidget.Header>
      <BaseWidget.Content>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <ErrorCard title="Erro ao carregar rentabilidade por classificação..." error={error} />
          )}
        >
          <Suspense fallback={<TablePlaceholder size="lg" />}>
            <ChartPerformanceAnalysisEarningByClassificationDataRequest />
          </Suspense>
        </ErrorBoundary>
      </BaseWidget.Content>
    </BaseWidget>
  );
};

// ─── Camada 2 — Dados ─────────────────────────────────────────────────────────

const ChartPerformanceAnalysisEarningByClassificationDataRequest = () => {
  const { selectedPeriod, selectedGroupingSummary } = useContentRequest();
  const { useFetchGenericTableData } = useRequestHooks();
  const { data } = useFetchGenericTableData({
    targetCurrency: selectedGroupingSummary.currency,
    period: selectedPeriod,
  });

  if (isNullOrUndefined(data)) return <EmptyWidget />;

  return (
    <ChartPerformanceAnalysisEarningByClassificationView
      data={data}
      currency={selectedGroupingSummary.currency}
    />
  );
};

// ─── Camada 3 — Conteúdo ─────────────────────────────────────────────────────
// Exceção justificada: o adapter recebe formatType que é estado local do View.
// Por isso é chamado aqui (com useMemo interno) em vez da Camada 2.

const ChartPerformanceAnalysisEarningByClassificationView = ({
  data,
  currency,
}: {
  data: GenericTableData;
  currency: string;
}) => {
  const { i18n } = useLingui();
  const { handleOpen } = useTemplateModal();
  const [formatType, setFormatType] = useState<'currency' | 'percentage'>('currency');
  const [barWidth, setBarWidth] = useState(160);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { earningsByClassificationChartData } =
    useChartPerformanceAnalysisEarningByClassificationAdapter(data, formatType);

  useEffect(() => {
    function calculateBarWidth() {
      if (!chartContainerRef.current) return;
      const containerWidth = chartContainerRef.current.getBoundingClientRect().width;
      setBarWidth(containerWidth / earningsByClassificationChartData.length);
    }

    calculateBarWidth();

    const observer = new ResizeObserver(calculateBarWidth);
    if (chartContainerRef.current) observer.observe(chartContainerRef.current);

    return () => observer.disconnect();
  }, [earningsByClassificationChartData.length]);

  function handleSelectFormateType(value: string) {
    if (value === 'currency' || value === 'percentage') setFormatType(value);
  }

  function getFormatValue(value: number, fmt: 'currency' | 'percentage') {
    if (fmt === 'currency') return currencyFormatter(value, 2, i18n.locale, currency);
    return percentFormatter(value, 2, i18n.locale);
  }

  function CustomTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
    const value = payload?.value ?? '';
    const disabled = ['Ganhos/Despesas', 'Saldo em conta', 'Total'].includes(value);
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject
          x={(-barWidth + 16) / 2}
          y={4}
          width={barWidth - 16}
          height={28}
          style={{ overflow: 'visible' }}
        >
          <Button
            variant="default"
            style={{ width: '100%' }}
            disabled={disabled}
            onClick={() => handleOpen('performance-details', { classification: value })}
            rightSection={!disabled ? <ArrowCircleUpRightIcon size={16} /> : null}
          >
            <Text size="sm" truncate="end">
              {value}
            </Text>
          </Button>
        </foreignObject>
      </g>
    );
  }

  return (
    <Stack ref={chartContainerRef}>
      <Group>
        <SegmentedControl
          value={formatType}
          onChange={handleSelectFormateType}
          data={[
            {
              label: currencyFormatterToParts(0, 0, i18n.locale, currency)[0],
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
