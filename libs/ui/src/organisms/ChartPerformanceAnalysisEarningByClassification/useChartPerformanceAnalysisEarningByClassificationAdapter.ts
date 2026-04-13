import { GenericTableData, HierarchicalData } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';

export const useChartPerformanceAnalysisEarningByClassificationAdapter = (
  data: GenericTableData,
  displayOptions: 'currency' | 'percentage',
) => {
  const { t, i18n } = useLingui();

  const earningsByClassificationChartData = useMemo(() => {
    const itemKey =
      displayOptions === 'currency' ? 'accFinancialEarningsInTargetFx' : 'percentualSampleDataInTargetFx';
    const chartData = removeProvisions(filterClassificationByFirstLevel(data)).map((item) => {
      switch (item.variable1) {
        case 'gainsExpenses':
          return {
            label: t`Ganhos/Despesas`,
            value: prepareValue(item[itemKey]),
            color: setColor(item[itemKey]),
          };
        case 'cashAccount':
          return {
            label: t`Saldo em conta`,
            value: prepareValue(item[itemKey]),
            color: setColor(item[itemKey]),
          };
        case 'provision':
          return {
            label: t`Provisões`,
            value: prepareValue(item[itemKey]),
            color: setColor(item[itemKey]),
          };
        default:
          return {
            label: item.variable1,
            value: prepareValue(item[itemKey]),
            color: setColor(item[itemKey]),
          };
      }
    });

    const total = chartData.reduce((acc, item) => {
      if (item.value) {
        return acc + item.value;
      }
      return acc;
    }, 0);
    chartData.push({
      label: t`Total`,
      value: total,
      color: 'brand.4',
    });

    return chartData;
  }, [data.hierarchicalData, displayOptions, i18n.locale]);

  return { earningsByClassificationChartData };
};

const removeProvisions = (data: Array<HierarchicalData>) => {
  return data.filter((item) => item.variable1 !== 'provision');
};

const filterClassificationByFirstLevel = (data: GenericTableData) => {
  return data.hierarchicalData.filter((item) => item.level === 'first');
};

const prepareValue = (value: number | null) => {
  if (isNullOrUndefined(value)) {
    return 0;
  }
  return value;
};

const setColor = (value: number | null) => {
  if (isNullOrUndefined(value) || value < 0) {
    return 'red.7';
  }
  return 'brand.4';
};
