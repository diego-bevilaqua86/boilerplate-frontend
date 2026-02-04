import { NetWorthOverPeriods } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { BeehusTheme } from '../../themes';

export type UseNetWorthOverPeriodManagerParams = {
  netWorthData: NetWorthOverPeriods;
  themeColors?: Array<string>;
};

export type UseNetWorthOverPeriodManagerFn = (params: UseNetWorthOverPeriodManagerParams) => {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  seriesKeys: Array<string>;
  seriesLabels: Array<string>;
  seriesColors: Array<string>;
};

export const useNetWorthOverPeriodManager: UseNetWorthOverPeriodManagerFn = ({ netWorthData, themeColors }) => {
  const data: Array<Record<string, unknown>> = [];
  const dataKey = 'itemLabel';
  const seriesKeys: Array<string> = [];
  const seriesLabels: Array<string> = [];
  const seriesColors: Array<string> = [];

  const dates = [...netWorthData.dataset[0].dates];

  dates.forEach((date, index) => {
    const dataItem: Record<string, unknown> = {
      itemLabel: date,
    };
    netWorthData.dataset.forEach((datasetItem) => {
      dataItem[datasetItem.classification] = datasetItem.values[index];
      if (!seriesKeys.includes(datasetItem.classification)) {
        seriesKeys.push(datasetItem.classification);
        // TODO: Aqui precisa traduzir quando for caixa
        seriesLabels.push(datasetItem.classification);
      }
    });
    if (!isNullOrUndefined(themeColors)) {
      seriesColors.push(themeColors[index]);
    } else {
      // @ts-expect-error Não vai ser nulo.
      seriesColors.push(BeehusTheme.colors?.brand[index]);
    }
    data.push(dataItem);
  });

  return {
    data,
    dataKey,
    seriesKeys,
    seriesLabels,
    seriesColors,
  };
};
