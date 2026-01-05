import { Orientation } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useCurrencyFormatters, useNumberFormatters } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { useResizeObserver } from '@mantine/hooks';
import { FC, useCallback, useMemo } from 'react';
import { Legend, LegendProps, ResponsiveContainer, ResponsiveContainerProps } from 'recharts';
import { Formatter } from 'recharts/types/component/DefaultLegendContent';
import styles from './DoughnutChart.module.css';

export type DoughnutChartProps = {
  data: Array<DonutChartCell>;
  orientation: Orientation;
  currency?: string;
  showValue?: boolean;
  showPercentage?: boolean;
};

export const DoughnutChart: FC<DoughnutChartProps> = ({
  data,
  orientation,
  currency,
  showValue = false,
  showPercentage = false,
}) => {
  const {
    i18n: { locale },
  } = useLingui();
  const { currencyFormatter } = useCurrencyFormatters({ locale, currency });
  const { numberFormatter, percentFormatter } = useNumberFormatters({ locale });
  const [ref, rect = { width: 300, height: 300 }] = useResizeObserver<HTMLDivElement>();

  const size = useMemo<number>(() => {
    if (rect.width <= 0 || rect.height <= 0) {
      return 200;
    }
    if (rect.width < rect.height) {
      return rect.width;
    } else {
      return rect.height;
    }
  }, [rect.width, rect.height]);

  const totalValue = useMemo<number>(() => data.reduce((accum, curr) => accum + curr.value, 0), [data]);

  const valueFormatter = useCallback(
    (value: number): string => {
      if (!isNullOrUndefined(currency)) {
        return currencyFormatter(value);
      }
      return numberFormatter(value);
    },
    [currency, currencyFormatter, numberFormatter],
  );

  const legendFormatter = useCallback<Formatter>(
    (value, entry) => {
      return (
        <span className={styles['doughnut-chart__legend-text']}>
          {value}
          {showValue && (
            <>
              <br />
              {isNullOrUndefined(currency)
                ? numberFormatter(entry.payload?.value)
                : currencyFormatter(entry.payload?.value)}
            </>
          )}
          {showPercentage && (
            <>
              <br />
              {percentFormatter(entry.payload?.value / totalValue, undefined, undefined, 1)}
            </>
          )}
        </span>
      );
    },
    [currency, currencyFormatter, numberFormatter, percentFormatter, showPercentage, showValue, totalValue],
  );

  const containerProps: Omit<ResponsiveContainerProps, 'children'> = {
    aspect: orientation === 'vertical' ? 0.75 : 1.3,
  };

  const legendProps: LegendProps = {
    iconSize: 16,
    iconType: 'square',
    formatter: legendFormatter,
  };

  if (orientation === 'horizontal') {
    containerProps.width = '100%';
    legendProps.layout = 'vertical';
    legendProps.align = 'right';
    legendProps.verticalAlign = 'middle';
  } else {
    containerProps.height = '100%';
    legendProps.layout = 'horizontal';
    legendProps.align = 'center';
    legendProps.verticalAlign = 'bottom';
  }

  return (
    <ResponsiveContainer {...containerProps} ref={ref}>
      <DonutChart
        data={data}
        startAngle={90}
        endAngle={-270}
        thickness={24}
        valueFormatter={valueFormatter}
        withTooltip
        tooltipDataSource={'segment'}
        size={size}
      >
        <Legend {...legendProps} />
      </DonutChart>
    </ResponsiveContainer>
  );
};
