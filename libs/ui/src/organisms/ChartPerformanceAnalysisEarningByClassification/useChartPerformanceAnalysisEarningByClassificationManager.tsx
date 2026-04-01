import { GenericTableData } from '@boilerplate-frontend/types';
import { currencyFormatter, percentFormatter, useTemplateNavigation } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react/macro';
import { Button, Text } from '@mantine/core';
import { ArrowCircleUpRightIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useChartPerformanceAnalysisEarningByClassificationAdapter } from './useChartPerformanceAnalysisEarningByClassificationAdapter';

export const useChartPerformanceAnalysisEarningByClassificationManager = (
  data: GenericTableData,
  targetCurrency: string,
) => {
  const { i18n } = useLingui();
  const { navigateTo } = useTemplateNavigation();
  const [formatType, setFormatType] = useState<'currency' | 'percentage'>('currency');
  const { earningsByClassificationChartData } = useChartPerformanceAnalysisEarningByClassificationAdapter(
    data,
    formatType,
  );

  function handleSelectFormateType(formatType: string) {
    if (formatType === 'currency' || formatType === 'percentage') {
      setFormatType(formatType);
    }
  }

  function getFormatValue(value: number, formatType: 'currency' | 'percentage') {
    if (formatType === 'currency') return currencyFormatter(value, 2, i18n.locale, targetCurrency);
    return percentFormatter(value, 2, i18n.locale);
  }

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(160);

  useEffect(() => {
    function calculateBarWidth() {
      if (!chartContainerRef.current) return;
      const containerWidth = chartContainerRef.current.getBoundingClientRect().width;
      const totalBars = earningsByClassificationChartData.length;
      const calculatedWidth = containerWidth / totalBars;
      setBarWidth(calculatedWidth);
    }

    calculateBarWidth();

    const resizeObserver = new ResizeObserver(calculateBarWidth); // 👈 reage ao resize
    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [earningsByClassificationChartData.length]);

  function CustomTick({ x, y, payload }: any) {
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject
          x={(-barWidth + 16) / 2} // centraliza dinamicamente
          y={4}
          width={barWidth - 16} // largura calculada
          height={28}
          style={{ overflow: 'visible' }}
        >
          <Button
            variant="default"
            style={{ width: '100%' }}
            disabled={
              payload.value === 'Ganhos/Despesas' || payload.value === 'Saldo em conta' || payload.value === 'Total'
            }
            onClick={() => navigateTo('performance-details', { classification: payload.value })}
            rightSection={
              payload.value !== 'Ganhos/Despesas' && payload.value !== 'Saldo em conta' && payload.value !== 'Total' ? (
                <ArrowCircleUpRightIcon size={16} />
              ) : null
            }
          >
            <Text size="sm" truncate="end">
              {payload.value}
            </Text>
          </Button>
        </foreignObject>
      </g>
    );
  }

  return {
    chartContainerRef,
    earningsByClassificationChartData,
    formatType,
    getFormatValue,
    handleSelectFormateType,
    CustomTick,
  };
};
