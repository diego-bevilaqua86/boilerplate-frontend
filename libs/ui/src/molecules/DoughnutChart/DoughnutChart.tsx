import { Orientation } from '@boilerplate-frontend/types';
import { isNullOrUndefined, useCurrencyFormatters, useNumberFormatters } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react';
import { DonutChart, DonutChartCell } from '@mantine/charts';
import { FC, useCallback, useMemo } from 'react';
import { Legend, LegendProps } from 'recharts';
import { Formatter } from 'recharts/types/component/DefaultLegendContent';
import styles from './DoughnutChart.module.css';

export type DoughnutChartProps = {
  data: Array<DonutChartCell>;
  orientation?: Orientation;
  currency?: string;
  showValue?: boolean;
  showPercentage?: boolean;
};

export const DoughnutChart: FC<DoughnutChartProps> = ({
  data,
  orientation = 'horizontal',
  currency,
  showValue = false,
  showPercentage = false,
}) => {
  const {
    i18n: { locale },
  } = useLingui();
  const { currencyFormatter } = useCurrencyFormatters({ locale, currency });
  const { numberFormatter, percentFormatter } = useNumberFormatters({ locale });

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

  const legendProps: LegendProps = {
    iconSize: 16,
    iconType: 'square',
    formatter: legendFormatter,
  };

  if (orientation === 'horizontal') {
    legendProps.layout = 'vertical';
    legendProps.align = 'right';
    legendProps.verticalAlign = 'middle';
  } else {
    legendProps.layout = 'horizontal';
    legendProps.align = 'center';
    legendProps.verticalAlign = 'bottom';
  }

  return (
    <DonutChart
      withTooltip
      data={data}
      startAngle={90}
      endAngle={-270}
      thickness={24}
      valueFormatter={valueFormatter}
      tooltipDataSource={'segment'}
      h={'100%'}
      w={'100%'}
    >
      <Legend {...legendProps} />
    </DonutChart>
  );
};
