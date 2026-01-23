import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { LineChartSeries, LineChart as MLineChart } from '@mantine/charts';
import { FC, useMemo } from 'react';
import { LegendProps } from 'recharts';

export type LineChartProps = {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  seriesKeys: Array<string>;
  seriesLabels?: Array<string>;
  seriesColors?: Array<string>;
};

export const LineChart: FC<LineChartProps> = ({ data, dataKey, seriesKeys, seriesLabels, seriesColors }) => {
  const series = useMemo<Array<LineChartSeries>>(() => {
    const series = seriesKeys.map<LineChartSeries>((key) => ({
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
    iconType: 'diamond',
    layout: 'vertical',
    align: 'center',
    verticalAlign: 'bottom',
  };
  return (
    <MLineChart
      withLegend
      data={data}
      dataKey={dataKey}
      series={series}
      legendProps={legendProps}
      w={'100%'}
      h={'100%'}
    />
  );
};
