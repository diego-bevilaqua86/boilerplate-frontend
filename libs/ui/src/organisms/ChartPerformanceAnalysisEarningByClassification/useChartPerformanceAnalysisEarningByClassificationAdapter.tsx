import { GenericTableData, HierarchicalData } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';

export const useChartPerformanceAnalysisEarningByClassificationAdapter = (
  data: GenericTableData,
  displayOptions: 'currency' | 'percentage',
) => {
  const itemKey = displayOptions === 'currency' ? 'accFinancialEarningsInTargetFx' : 'percentualSampleDataInTargetFx';
  const earningsByClassificationChartData = removeProvisions(filterClassificationByFirstLevel(data)).map((item) => {
    switch (item.variable1) {
      case 'gainsExpenses':
        return {
          label: 'Ganhos/Despesas',
          value: prepareValue(item[itemKey]),
          color: setColor(item[itemKey]),
        };
      case 'cashAccount':
        return {
          label: 'Saldo em conta',
          value: prepareValue(item[itemKey]),
          color: setColor(item[itemKey]),
        };
      case 'provision':
        return {
          label: 'Provisões',
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

  const total = earningsByClassificationChartData.reduce((acc, item) => {
    if (item.value) {
      return acc + item.value;
    }
    return acc;
  }, 0);
  earningsByClassificationChartData.push({
    label: 'Total',
    value: total,
    color: 'brand.4',
  });

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
