// useSecurityPositionByClassManager.ts
import { SecurityPositionByClass } from '@boilerplate-frontend/types';
import { isNullOrUndefined } from '@boilerplate-frontend/utils';
import { DonutChartCell } from '@mantine/charts';
import { BeehusTheme } from '../../themes';

export type UseChartGroupingPositionByClassificationManagerParams = {
  securityPositionByClassData: SecurityPositionByClass;
  themeColors?: Array<string>;
};

export type UseChartGroupingPositionByClassificationManagerFn = (
  params: UseChartGroupingPositionByClassificationManagerParams,
) => {
  data: Array<DonutChartCell>;
  currency: string;
  showValue: boolean;
  showPercentage: boolean;
  orientation: 'horizontal' | 'vertical';
};

const COLORS = [
  '#4f46e5', // Índigo
  '#10b981', // Esmeralda
  '#f59e0b', // Âmbar
  '#ef4444', // Vermelho
  '#8b5cf6', // Violeta
  '#06b6d4', // Ciano
  '#ec4899', // Rosa
];

export const useChartGroupingPositionByClassificationManager: UseChartGroupingPositionByClassificationManagerFn = ({
  securityPositionByClassData,
  themeColors,
}) => {
  const data: Array<DonutChartCell> = securityPositionByClassData.dataset.map((item, index) => {
    let color: string;

    if (!isNullOrUndefined(themeColors) && themeColors[index]) {
      color = themeColors[index];
    } else {
      const themeColorArray = BeehusTheme.colors?.brand || COLORS;
      color = themeColorArray[index % themeColorArray.length];
    }

    return {
      name: item.label,
      value: item.value,
      color,
    };
  });

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return {
    data: sortedData,
    currency: securityPositionByClassData.currency,
    showValue: true,
    showPercentage: true,
    orientation: 'horizontal',
  };
};
