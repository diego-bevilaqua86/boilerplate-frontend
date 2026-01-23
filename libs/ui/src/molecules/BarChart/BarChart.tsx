import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { BarChartSeries, BarChart as MBarChart } from '@mantine/charts';
import { FC, useMemo } from 'react';
import { LegendProps } from 'recharts';

export type BarChartProps = {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  seriesKeys: Array<string>;
  seriesLabels?: Array<string>;
  seriesColors?: Array<string>;
  isStacked?: boolean;
};

export const BarChart: FC<BarChartProps> = ({ data, dataKey, seriesKeys, seriesLabels, seriesColors, isStacked }) => {
  const series = useMemo<Array<BarChartSeries>>(() => {
    const series = seriesKeys.map<BarChartSeries>((key) => ({
      name: key,
    }));

    if (!isNullOrUndefined(seriesLabels)) {
      series.forEach((item, index) => (item.label = seriesLabels[index]));
    }

    if (!isNullOrUndefined(seriesColors)) {
      series.forEach((item, index) => (item.color = seriesColors[index]));
    }

    return series;
  }, [seriesKeys, seriesLabels, seriesColors]);

  const legendProps: LegendProps = {
    iconSize: 16,
    iconType: 'rect',
    itemSorter: () => 0,
    layout: 'vertical',
    align: 'center',
    verticalAlign: 'bottom',
  };

  return (
    <MBarChart
      data={data}
      dataKey={dataKey}
      series={series}
      withLegend
      legendProps={legendProps}
      type={isStacked ? 'stacked' : 'default'}
      w={'100%'}
      h={'100%'}
    ></MBarChart>
  );
};
